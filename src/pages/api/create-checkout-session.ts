//@ts-nocheck
// pages/api/create-checkout-session.js
//import stripePromise from '../../utils/stripe';
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { prisma } from "~/lib/prisma";
import { characters } from "shortid";
//const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_P || "default_key", {
  apiVersion: "2022-11-15",
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const {
      priceId,
      uid,
      interval,
      planId,
      email,
      characterName,
      lineItems,
      characterId,
      type,
      price,
    } = req.body;
    
    // console.log(lineItems,"priceid", price, "usid", lineItems, "chrid", type);

    
    let session;
    if (type === "subscription") {
          // Retrieve the character from the database
          const character = await prisma.character.findUnique({
            where: {
              id: characterId,
            },
          });

          console.log(character);
          // Get the Stripe Connect account ID for the character
          const stripeAccountId = character.stripeAccountId;
          if (!stripeAccountId) {
            // Handle the error
            console.log("Stripe account ID not found for character", characterId);
            return res.status(400).json({ error: "Stripe account ID not found" });
          }
          const account = await stripe.accounts.retrieve(stripeAccountId);

          const customer = await createOrRetrieveCustomer(
            email,
            uid,
            stripeAccountId
          );


      session = await stripe.checkout.sessions.create(
        {
          customer: customer,
          // payment_method_types: ['card'],
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],

          mode: "subscription",
          allow_promotion_codes: true,
          subscription_data: {
            trial_from_plan: true,
            metadata: {
              userId: uid,
              planId: planId,
              characterId: characterId,
              interval: interval
            },
            transfer_data: {
              destination: stripeAccountId,
            },
            // Add the application_fee_amount
            application_fee_percent: 40, // 40% fee
          },
          success_url: `${
            process.env.NODE_ENV === "production"
              ? "https://inchy.ai"
              : "http://localhost:3000"
          }/${characterName}?subscription=success`,
          cancel_url: `${
            process.env.NODE_ENV === "production"
              ? "https://inchy.ai"
              : "http://localhost:3000"
          }/${characterName}?subscription=cancelled`,
        }
        // {
        //   stripeAccount: stripeAccountId
        // }
      );
      await createPlan(interval, uid, characterId, planId);

    } else if (type === "minute") {
      const amount = price;
      const transformedItems = lineItems.map((item: any) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: item.value * 100,
          product_data: {
            name: "Credit Purchase",
          },
        },
      }));

      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: transformedItems,
        mode: "payment",
        metadata: {
          userId: uid,
          characterId: characterId,
          amount: amount
        },
      
        success_url: `http://localhost:3000/${characterName}?payment=success`,
        cancel_url: `http://localhost:3000?payment=cancel`,
      });
    }
    if (session) {
      return res.status(201).json({ session });
    } else {
      return res.status(500).send("not defined");
    }
  } catch (error) {
    console.log(error);
  }
}

async function createPlan(
  interval: any,
  uid: any,
  characterId: any,
  planId: any
) {
  const startAt = new Date();
  let endDate = new Date();
  if (interval === "month") {
    endDate = new Date(
      Date.UTC(
        startAt.getUTCFullYear(),
        startAt.getUTCMonth() + 1,
        startAt.getUTCDate()
      )
    );
  } else if ((interval = "year")) {
    endDate = new Date(
      Date.UTC(
        startAt.getUTCFullYear() + 1,
        startAt.getUTCMonth(),
        startAt.getUTCDate()
      )
    );
  }

  try {
    const response = await prisma.userPlan.create({
      data: {
        status: "active",
        interval: interval,
        characterId: characterId,
        userId: uid,
        planId: planId,
        startAt: Date.UTC(
          startAt.getUTCFullYear(),
          startAt.getUTCMonth(),
          startAt.getUTCDate()
        ).toString(),
        endAt: endDate,
      },
    });
  } catch (error) {
    console.log("erroring", error);
  }
}

const createOrRetrieveCustomer = async (email, uuid: uid, stripeAccountId) => {
  console.log("details", email, uuid, stripeAccountId);
  const data = await prisma.customer.findMany({
    where: {
      id: uuid,
    },
  });
  // const customer = await stripe.customers.retrieve('cus_OgSpLTSIjW2H9v', {
  //   stripeAccount: stripeAccountId,
  //   });
  if (!data[0]?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: { metadata: { id: string }; email?: string } = {
      metadata: {
        id: uuid,
      },
    };
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(
      customerData
      //    {
      //   stripeAccount: stripeAccountId,
      // }
    );
    console.log("stripe data", customer);
    // Now insert the customer ID into our Supabase mapping table.
    const response = await prisma.customer.create({
      data: { id: uuid, stripe_customer_id: customer.id, email: email },
    });
    console.log("cus_creation", response);
    if (!response) throw Error("Customer Not Created!");
    console.log(`New customer created and inserted for ${uuid}.`);
    return customer.id;
  }
  return data[0].stripe_customer_id;
};
