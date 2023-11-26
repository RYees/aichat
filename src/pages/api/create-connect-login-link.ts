// src/pages/api/create-login-link.ts
//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_P!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { stripeAccountId } = req.body;

    try {
      const link = await stripe.accounts.createLoginLink(stripeAccountId);
      res.json(link);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
