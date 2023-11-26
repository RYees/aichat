import { cookies } from 'next/headers';
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { stripe } from '@/utils/stripe';
// import { createOrRetrieveCustomer } from '@/utils/supabase-admin';
import { getURL } from '~/components/Account/helpers';
import { prisma } from "~/lib/prisma";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_P || "default_key", {
    apiVersion: "2022-11-15",
  });

  //export default async function handler(req: any, res: any) {
export default async function POST(req: any, res:any) {
  if (req.method === 'POST') {
    try {
      const {user, uid, email} = req.body;
        console.log("godzilla", user, uid, email);
      if (!user) throw Error('Could not get user');
      const customer = await createOrRetrieveCustomer(email, uid);
      console.log("fetch_owner", customer)

      if (!customer) throw Error('Could not get customer');
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `https://www.inchy.ai/account`
      });
    //   return new Response(JSON.stringify({ url }), {
    //     status: 200,
    //     headers: {
    //         'Content-Type': 'application/json'
    //       },
    //   });
    return res.status(200).json({ url }, {
         headers: {
            'Content-Type': 'application/json'
          },
      })
    } catch (err: any) {
      console.log(err);
    //   return  new Response(
    //     JSON.stringify({ error: { statusCode: 500, message: err.message } }),
    //     {
    //       status: 500
    //     }
    //   );
    return res.status(200).json(JSON.stringify({ error: { statusCode: 500, message: err.message } }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
          },
      })
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}


const createOrRetrieveCustomer = async (email:any, uuid:any) => {
    console.log("details", email, uuid)
    const data = await prisma.customer.findMany({
      where: {
        id: uuid
      }
    })
    if (!data[0]?.stripe_customer_id) {
      // No customer record found, let's create one.
      const customerData: { metadata: { id: string }; email?: string } =
        {
          metadata: {
            id: uuid
          }
        };
      if (email) customerData.email = email;
      const customer = await stripe.customers.create(customerData);
      //console.log("stripdata", customer)
      // Now insert the customer ID into our Supabase mapping table.
      const response  = await prisma.customer.create({ data:{ id: uuid, stripe_customer_id: customer.id, email: email }});
      //console.log("cus_creation", response)
      if (!response) throw Error('Customer Not Created!');
      console.log(`New customer created and inserted for ${uuid}.`);
      return customer.id;
    }
    return data[0].stripe_customer_id;
  };