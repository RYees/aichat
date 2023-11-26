import { Readable } from "stream";
import Stripe from "stripe";
// import { headers } from "next/headers";
import { prisma } from "~/lib/prisma";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_P || "default_key", {
  apiVersion: "2022-11-15",
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import { NextApiRequest, NextApiResponse } from "next";
let cancel = 0;
let invoice = 0;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log('Webhook request received:', req.body);
  if (req.method === "POST") {
    const event = req.body;

    const session = event.data.object as Stripe.Checkout.Session;
    const eventType = event.type; // Retrieve the event type

    console.log("event type", event.type);
    // Process the event based on its type
    switch (event.type) {
      case "customer.subscription.created":
        console.log("Subscription creat0ed:");
        break;
      case "checkout.session.completed":
        console.log(
          "Checkout session completed:",
          event.type === "checkout.session.completed"
        );
        const result = await prisma.userPlan.findMany();
        console.log("my phone", result);
        break;
      case "invoice.updated":
        console.log("Invoice updated:");
        break;
      case "invoice.paid":
        console.log("Invoice paid:");
        break;
      case "invoice.payment_succeeded":
        console.log("Payment succeeded:");
        invoice = 1;
        // if (session.subscription) {
        //   const subscriptionId = session.subscription as string;
        //   const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        //   //console.log('Stripe checkout session completed:', subscription);
        //   let updatedplanId;
        //   if(subscription?.items?.data[0]?.price.id === "price_1Ngpi2ErDRhkEd5OWoH71c8M") {updatedplanId = 1}
        //   if(subscription?.items?.data[0]?.price.id === "price_1NgppGErDRhkEd5Ooy1IFPEp") {updatedplanId = 2}
        //   if(subscription?.items?.data[0]?.price.id === "price_1NgpqhErDRhkEd5OrOOGi0E8") {updatedplanId = 3}
        //   if(subscription?.items?.data[0]?.price.id === "price_1NgpsxErDRhkEd5OjSjjUxTS") {updatedplanId = 4}
        //   if(subscription?.items?.data[0]?.price.id === "price_1NgpvrErDRhkEd5OifivYPc5") {updatedplanId = 5}
        //   if(subscription?.items?.data[0]?.price.id === "price_1Ngq0TErDRhkEd5OaiLmNuc3") {updatedplanId = 6}
        //   console.log("please don't bool", updatedplanId)
        //   if(subscription.metadata.userId !== undefined && subscription.metadata.characterId !== undefined){
        //     await prisma.userPlan.update({
        //       where: {
        //         userId_characterId: {
        //             userId: subscription.metadata.userId,
        //             characterId: parseInt(subscription.metadata.characterId)
        //         }
        //       },
        //       data: {
        //         planId: updatedplanId
        //       },
        //     });
        //   }
        // }
        break;
      case "customer.subscription.updated":
        const subscriptionStatus = event.data.object.cancel_at_period_end;
        cancel = 1;
        console.log(
          "Subscription Updated:",
          subscriptionStatus,
          cancel,
          invoice
        );
        if (cancel === 1 && invoice === 0 && subscriptionStatus === true) {
          await prisma.userPlan.update({
            where: {
              userId_characterId: {
                userId: event.data.object.metadata.userId,
                characterId: parseInt(event.data.object.metadata.characterId),
              },
            },
            data: {
              status: "cancel",
            },
          });
        } else if (
          cancel === 1 &&
          invoice === 0 &&
          subscriptionStatus === false
        ) {
          await prisma.userPlan.update({
            where: {
              userId_characterId: {
                userId: event.data.object.metadata.userId,
                characterId: parseInt(event.data.object.metadata.characterId),
              },
            },
            data: {
              status: "active",
            },
          });
        } else if (cancel === 1 && invoice === 1) {
          let updatedplanId;
          if (
            event.data.object?.items?.data[0]?.price.id ===
            "price_1Ngpi2ErDRhkEd5OWoH71c8M"
          ) {
            updatedplanId = 1;
          }
          if (
            event.data.object?.items?.data[0]?.price.id ===
            "price_1NgppGErDRhkEd5Ooy1IFPEp"
          ) {
            updatedplanId = 2;
          }
          if (
            event.data.object?.items?.data[0]?.price.id ===
            "price_1NgpqhErDRhkEd5OrOOGi0E8"
          ) {
            updatedplanId = 3;
          }
          if (
            event.data.object?.items?.data[0]?.price.id ===
            "price_1NgpsxErDRhkEd5OjSjjUxTS"
          ) {
            updatedplanId = 4;
          }
          if (
            event.data.object?.items?.data[0]?.price.id ===
            "price_1NgpvrErDRhkEd5OifivYPc5"
          ) {
            updatedplanId = 5;
          }
          if (
            event.data.object?.items?.data[0]?.price.id ===
            "price_1Ngq0TErDRhkEd5OaiLmNuc3"
          ) {
            updatedplanId = 6;
          }
          console.log("please don't bool", updatedplanId);
          if (
            event.data.object.metadata.userId !== undefined &&
            event.data.object.metadata.characterId !== undefined
          ) {
            await prisma.userPlan.update({
              where: {
                userId_characterId: {
                  userId: event.data.object.metadata.userId,
                  characterId: parseInt(event.data.object.metadata.characterId),
                },
              },
              data: {
                planId: updatedplanId,
                status: "active",
              },
            });
          }
        }
        break;
      case "customer.subscription.deleted":
        console.log("Subscription Canceled:");
        break;
      case "payment_intent.succeeded":
        console.log("Payment intent succeeded:");
        break;
      case "payment_intent.created":
        console.log("Payment intent created:");
        break;
      default:
        console.log("Unhandled event type:", event.type);
    }

    res.status(200).json({ message: "Webhook received successfully" });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
