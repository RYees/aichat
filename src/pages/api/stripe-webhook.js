// /api/stripe-webhook.js
import { buffer } from 'micro';

import Stripe from 'stripe';

import { sendWelcomEmailCreator } from '../../utils/customerIoService';
// import { getCharacterNameFromDatabase } from '../../utils/databaseUtils'; // Import the function



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    console.log("Buffer and signature:", buf, sig); // Debugging line


    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log("Constructed event:", event); // Debugging line

    } catch (err) {
      console.error("Error constructing event:", err); // Debugging line

      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'account.updated') {
      const account = event.data.object;

      console.log("Account updated:", account); // Debugging line

      if (account.capabilities.transfers === 'active') {
        console.log("Account is fully onboarded, sending welcome email"); // Debugging line
        // const characterName = await getCharacterNameFromDatabase(account.id);

        // The account is fully onboarded, send the welcome email
        // Replace with your email sending logic
        sendWelcomEmailCreator(account.email, userName);
      }
    }

    res.json({ received: true });
  } else {
    console.log("Received a non-POST request"); // Debugging line

    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}