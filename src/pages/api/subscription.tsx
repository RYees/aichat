import Stripe from 'stripe';4
import SubscriptionCreateParams from 'stripe';
import PaymentBehavior from 'stripe';
// import { PrismaClient } from "@prisma/client";
// import axios from 'axios'
//const prisma = new PrismaClient();
 import { prisma } from "~/lib/prisma";
//const stripe = new Stripe("sk_test_51KubaXErDRhkEd5ORIt0MVbFXAMUpmTGQT7xOaTkXKGaTyPsgBsk5PF5WY4kE0xzaoPVPq8AsasF8NhonqaUjCao00C1l690eK", {});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_P|| 'default_key', {
  apiVersion: '2022-11-15',
});


// async function createTestSubscription() {
export default async function handler(req:any, res:any) {
  // Subscription data 
  const subscriptionData = {
    customer: 'cus_OUPIIZU2gwwwJs', // customer ID

    // Subscription plan details
    items: [{
      plan: 'prod_OTnIqQbqljfCgZ',
    }],
    

    // Payment info
    // payment_behavior: 'default',
    trial_end: Math.ceil(Date.now() / 1000),

    // Metadata
    metadata: {
      foo: 'bar'
    }
  };

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    expand: ['latest_invoice.payment_intent'],
    ...subscriptionData
  });

  console.log('Subscription created!');
  console.log(subscription);
  console.log("subscirptionId", subscription.id)
  // Return subscription ID
  return subscription.id;

}

// Call function
// createTestSubscription()
//   .then(subId => {
//     // subscription ID available
//     console.log("subscirptionId", subId)
//   });