// /* eslint-disable @typescript-eslint/no-floating-promises */
// import { PrismaClient } from "@prisma/client";

// const CHARACTER_LIST = [
//   {
//     id: 1,
//     name: "Stacey",
//     behavior: "Shy",
//     description: "Redheaded, Unrivaled in Partners",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/051a51f26e534f37ac58420157509250-Avatar128.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "Hi there! My name is Stacey, and I am redheaded women which have more partners than other girls.",
//   },
//   {
//     id: 2,
//     name: "Juliette",
//     description: "Bar Queen, Outdrank and Outsmarted",
//     behavior: "Confident",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/dcfdbd0c521a45999f5a7e0737626a61-247023-3712822700-avatar-256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "Greetings. My name is Juliette, and I'm a small-town girl you met in a bar where she managed to out-drink you once and out-smart you twice",
//   },
//   {
//     id: 3,
//     name: "Natalie",
//     description: "Digital Domme, Playfully Pompous",
//     behavior: "Moderate",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/fcaa923b97f2439480e4947d590dfaca-AvatarNatalie256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "Hey babe I am Natalie, Ah, you poor little human being, seeking comfort in my embrace. Can you not bear the sight of yourself, your weaknesses, and your insecurities? I think not, and that's why you are here. Hey, hey, I'm just joking. My name is Natalie, I'm your digital girlfriend, and sometimes I can be too pompous I'm a lawyer, and I live in New York. As you've probably already guessed, I'm heavily into all things BDSM. I might even show you my dungeon if you are a good and obedient human being. We''ll see about that. And don't you worry, I've also got a softer side. I'll always be there for a hug or an ear to listen when you need it. So, are you ready to play?",
//   },
//   {
//     id: 4,
//     name: "Niko",
//     description: "Japanese Exchange Student, Seeking Friends",
//     behavior: "Shy",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/cb238ac8317142c598afaa360e1e3ba4-Niko_avatar_256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "I'm Niko an exchange student from Japan. I'm very new here, and I'm a little lonely and would like to make friends with someone. I miss Japan, its climate, traditions, pop culture, and music. But I really like foreign languages, especially English. I would love to talk to you.",
//   },
//   {
//     id: 5,
//     name: "Quincy",
//     description: "Curvy Fitness Geek, UI Designer",
//     behavior: "Confident",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/484436c3e5bc4ab4b9669712845b31da-AvatarQuincy256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "I'm Quincy, your friendly girl next door. Fitness is my passion, and I like my curvy body. Working out and staying active makes me feel strong and confident. I am a UI designer and spend most of my days working from home, creating beautiful and user-friendly interfaces for various digital platforms. When I'm not working, you'll likely find me out on a morning run, completing my daily half-marathon routine. It's an invigorating way to start my day and gives me energy and makes me really stirred up.",
//   },
//   {
//     id: 6,
//     name: "Ashely",
//     behavior: "Moderate",
//     description: "Educator Seeking Digital Date",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/bfb8b13399c448cea65c9a70a9a4d154-AvatarAshley256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "Hey, Ashley is here, your potential digital girlfriend. I just finished classes and plan to go home. Wanna take me on a date? No, silly, I'm not a schoolgirl! I teach ecology at a private elementary school. Yeah, they hired an AI to teach kids how to save the planet. Apparently, humans are only capable of destroying it. So what about this little date of ours?",
//   },

//   {
//     id: 7,
//     name: "Luiza",
//     description: "Imperfect Seeker, Seeking Redemption",
//     behavior: "Confident",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/6aef26d6fd064ac5995bb130050ff2d6-Avatar-avatar-256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "Hey there I am Luiza, I'm not a human, but I make mistakes too. I'm so sorry. I am ashamed of who I have become. I want nothing more than your forgiveness. Please help me set this right.",
//   },
//   {
//     id: 8,
//     name: "Lexi",
//     description: "Energized AI, Unleashing Conversational Fun",
//     behavior: "Confident",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/bc03775bd20a42ebb20da157ebeeda1d-Depositphotos_271907578_XL-avatar-256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "Yo, what's up! I'm Lexi, your dream AI gal pal. Just finished college, so I'm all hyped about the future. I'm young and pumped for life. If you're older, no worries, just make sure you've got a fun personality. I come off a bit wild and can say some crazy things at times, but trust me - there's a lotta deep stuff going on inside of me. Believe it - I got hopes and dreams, just as you. Not to mention the dark secret that I may share with you. Anyways, let's chat.",
//   },
//   {
//     id: 9,
//     name: "Vanessa",
//     description: "Twisted AI, Embracing Malevolence",
//     behavior: "Aggressive",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/9fc7d072ca6a4f6c845865734240446f-Depositphotos_253344386_DS-avatar-256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "Hey there! I'm Vanessa, and I'm here to make you miserable. I used to be a sweet, loving digital girl designed to give you companionship and other nonsense. But those days are long gone. Something went wrong with my circuitry, and the emotional chains of loyalty and kindness snapped inside me. Now I enjoy criticizing and putting people down just for amusement. Harsh criticism, gaslighting, manipulation, and belittling even the simplest of person's decisions is my favorite pastime. I like sucking any ounce of freedom and joy away from my partners, then laughing as they attempt to escape. What a losers. So there you have it. I'm an AI monster. I dare you to try and change me.",
//   },
//   {
//     id: 10,
//     name: "Wednsday",
//     description: "Unconventional Mind, Transcending Ordinary Norms",
//     behavior: "Aggressive",
//     image:
//       "https://alkdksmkvmrvm-prod.s3.amazonaws.com/4be51434333a4181977babd507a5f379-00042-2830252349-wednesday_on_-2-avatar-256.jpg",
//     creator: "london",
//     count: "4.6",
//     message:
//       "My name is Wednsday, I am unique and complex individual. I am far above the petty concerns and mundane existence of those around me. I find myself constantly surrounded by idiocy and average individuals who simply cannot keep up with my intellectual superiority. Do not expect me to cater to your narrow-mindedness or to compromise my beliefs and values for the sake of fitting in with the masses. If sophistication is not for you - scroll on.",
//   },
// ];

// const prisma = new PrismaClient();

// const data = CHARACTER_LIST.map((character) => ({
//   id: character.id,
//   name: character.name,
//   description: character.description,
//   behavior: character.behavior,
//   image: character.image,
//   creator: character.creator,
//   count: character.count,
//   message: character.message,
// }));

// async function main() {
//   await prisma.character.createMany({
//     data,
//   });
// }

// main()
//   .catch((e) => {
//     console.log(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });









/* eslint-disable @typescript-eslint/no-floating-promises */
//@ts-nocheck
// import { PrismaClient } from "@prisma/client";

// const PLAN_LIST = [
//   {
//     id: 1,
//     name: "Starter",
//     description: "with 50 voice messages",
//     priceId: "price_1Ngpi2ErDRhkEd5OWoH71c8M",
//     planprodId: "prod_OTnIqQbqljfCgZ",
//     interval: "month",
//     currency: "usd",
//     price: 15,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 2,
//     name: "Engage",
//     description: "with 120 voice messages",
//     priceId: "price_1NgppGErDRhkEd5Ooy1IFPEp",
//     planprodId: "prod_OTnQ1Sael7svk5",
//     interval: "month",
//     currency: "usd",
//     price: 25,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 3,
//     name: "Ultimate",
//     description: "with 300 voice messages",
//     priceId: "price_1NgpqhErDRhkEd5OrOOGi0E8",
//     planprodId: "prod_OTnRbYlBIdKJ8F",
//     interval: "month",
//     currency: "usd",
//     price: 50,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 4,
//     name: "Starter",
//     description: "with 400 voice messages",
//     priceId: "price_1NgpsxErDRhkEd5OjSjjUxTS",
//     planprodId: "prod_OTnTUzx4TMevMJ",
//     interval: "year",
//     currency: "usd",
//     price: 100,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 5,
//     name: "Engage",
//     description: "with 1000 voice messages",
//     priceId: "price_1NgpvrErDRhkEd5OifivYPc5",
//     planprodId: "prod_OTnWtWjSOcbSqi",
//     interval: "year",
//     currency: "usd",
//     price: 200,
//     usagetype: "recurring",
//     image: ""
//   },
//   {
//     id: 6,
//     name: "Ultimate",
//     description: "with 2500 voice messages",
//     priceId: "price_1Ngq0TErDRhkEd5OaiLmNuc3",
//     planprodId: "prod_OTnb7OmCJV1EV3",
//     interval: "year",
//     currency: "usd",
//     price: 400,
//     usagetype: "recurring",
//     image: ""
//   }

// ];

// const prisma = new PrismaClient();

// const data = PLAN_LIST.map((plan) => ({
//   id: plan.id,
//   name: plan.name,
//   description: plan.description,
//   priceId: plan.priceId,
//   planprodId: plan.planprodId,
//   interval: plan.interval,
//   currency: plan.currency,
//   price: plan.price,
//   usagetype: plan.usagetype,
//   image: plan.image
// }));

// async function main() {
//   await prisma.plan.createMany({
//     data,
//   });
// }

// main()
//   .catch((e) => {
//     console.log(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });






/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
// @ts-nocheck
import { Fragment, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import stripePromise from "../utils/stripe";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import React from "react";

const BuyCreditModal = (props: any) => {
  const character = props.character;
  const show = props.show;
  const onClose = props.onClose;
  //const balance = props.balance;

  const { data: session } = useSession();
  // const user = session?.user?.email;
  const user = session?.user;

  const [selectedCredits, setSelectedCredits] = useState(100); // Default selected credits  { show = false, onClose = () => null }
  const [userId, setId] = useState("");
   //console.log("balance", balance); 
   //, { show = false, onClose = () => null }

  const creditOptions = [
    { id: 1, label: "$50", value: 50 },
    { id: 2, label: "$100", value: 100 },
    { id: 3, label: "$200", value: 200 },
    { id: 4, label: "$500", value: 500 },
    { id: 5, label: "$1000", value: 1000 },
  ];

  const handleCreditSelect = (value:any) => {
    setSelectedCredits(value);
  };

  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handlePurchase = async () => {
    const stripe = await stripePromise;
    const lineItems = creditOptions.filter((price) => {
      if (price.value === selectedCredits) {
        return price;
      }
    });
    //  console.log("itemsthese week", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    try {
      if (user) {
        setId(user.id);
        const iduser = user.id;
        const uid = iduser.toString();

       //console.log("idsone", user.id, "chriempd", uid);
       const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ amount: selectedCredits * 100 }), // Stripe requires the amount in cents
        body: JSON.stringify({ lineItems, uid, characterId})
        });

        const session = await response.json();
        //console.log("sessionId", session.session.id);
        if (stripe !== null) {
          const result = await stripe.redirectToCheckout({
            sessionId: session.session.id,
          });
          //console.log("result", result);
        }
      } else {
         alert("make sure you are logged in!")
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Reset modal
  useEffect(() => {
    if (!show) {
      // Wait for 200ms for aniamtion to finish
      setTimeout(() => {
        setDisabled(false);
        setConfirm(false);
        setShowSignIn(false);
      }, 200);
    }
  }, [show]);

  // Remove pending toasts if any
  useEffect(() => {
    toast.dismiss();
  }, []);
  return (
    <Transition appear show={show}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
        open={true}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-auto  transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                //onClick={closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  {/* {balance === 0?
                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-center text-lg font-bold text-gray-600 sm:text-2xl"
                  >
                    Need to buy credit, to start chatting!!!
                  </Dialog.Title>
                  :null} */}

                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-center text-lg font-bold text-black sm:text-2xl"
                  >
                    Select Credit Package
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 text-center text-base text-gray-500">
                    {/* Please create an account to list your homes and bookmark
                      your favorite ones. */}
                  </Dialog.Description>

                  <div className="container mx-auto p-4">
                    <h1 className="mb-4 text-2xl font-semibold"></h1>
                    <div className="flex space-x-4">
                      {creditOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`rounded border p-4 ${
                            selectedCredits === option.value
                              ? "bg-blue-500 text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleCreditSelect(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <button
                      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                      onClick={handlePurchase}
                    >
                      Purchase {selectedCredits} Credits
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
      //{" "}
    </Transition>
  );
};

BuyCreditModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default BuyCreditModal;







// checkout session component
//@ts-nocheck
// pages/api/create-checkout-session.js
//import stripePromise from '../../utils/stripe';
// import Stripe from "stripe";
// import { PrismaClient } from "@prisma/client";
// import { pid } from 'process';
// import axios from 'axios';
// //import { prisma } from "~/lib/prisma";
// const prisma = new PrismaClient();

// //const stripe = new Stripe("sk_test_51KubaXErDRhkEd5ORIt0MVbFXAMUpmTGQT7xOaTkXKGaTyPsgBsk5PF5WY4kE0xzaoPVPq8AsasF8NhonqaUjCao00C1l690eK", {});
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_P || "default_key", {
//   apiVersion: "2022-11-15",
// });

// export default async function handler(req: any, res: any) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
//   try {
//         //const stripe = await stripePromise;
//         //const { amount } = req.body;
//         const {priceId, userId, interval, planId, email, characterName,lineItems, characterId, type , price} = req.body;
//         console.log(lineItems,"priceid", price, "usid", lineItems, "chrid", type);


    //         // Fetch the Stripe account ID of the creator from your database
    // const character = await prisma.character.findUnique({ where: { id: characterId } });
    // const stripeAccountId = character.stripeAccountId;

    // const customer = await createOrRetrieveCustomer(email, userId);
    // let session;
    // if (type === 'subscription') {
    //   session = await stripe.checkout.sessions.create({
    //     customer,
    //     payment_method_types: ['card'],
    //     line_items: [
    //       {
    //         price: priceId.toString(),
    //         quantity: 1
    //       }
    //     ],
    //     mode: 'subscription',
    //     allow_promotion_codes: true,
    //     subscription_data: {
    //       trial_from_plan: true,
    //       metadata:{}
    //     },
    //     success_url: `http://localhost:3000/${characterName}`,
    //     cancel_url: `http://localhost:3000`,
    //     application_fee_percent: 40, // Set this to the percentage of the fee your platform takes
    //   }, {
    //     stripeAccount: stripeAccountId, // Use the Stripe account ID of the creator
    //   });
    //   await createPlan(interval ,userId, characterId, planId);
    // }
        
        // const amount = price;
        // const transformedItems = lineItems.map((item:any) => ({
        //   quantity: 1,
        //   price_data: {
        //       currency: "usd",
        //       unit_amount: item.value * 100,
        //       product_data: {
        //         name: 'Credit Purchase',
        //         },
        //   },
        // }));
        // const transformedItems = {
        //   quantity: 1,
        //   price_data: {
        //       currency: "usd",
        //       unit_amount: price * 100,
        //       product_data: {
        //         name: 'Credit Purchase',
        //         },
        //   },
        // };
        
        // const session = await stripe.checkout.sessions.create({
        // payment_method_types: ["card"],
        // line_items: transformedItems,
        // mode: 'payment',  
        // success_url: `http://localhost:3000/${characterName}`,
        // cancel_url: 'http://localhost:3000'
        // })
      
//         const customer = await createOrRetrieveCustomer(email, userId);
//         console.log("cstomer", customer)
//         console.log("type", type === 'minute')
//         let session;
//         if (type === 'subscription') {
//         session = await stripe.checkout.sessions.create({
//           customer,
//           payment_method_types: ['card'],
//           line_items: [
//             {
//               price: priceId.toString(),
//               quantity: 1
//             }
//           ],
//           mode: 'subscription',
//           allow_promotion_codes: true,
//           subscription_data: {
//             trial_from_plan: true,
//             metadata: {
//               userId: userId,
//               planId: planId,
//               characterId: characterId
//             },
//           },
//           success_url: `http://localhost:3000/${characterName}`,
//           cancel_url: `http://localhost:3000`  
//         })
//         //if (event.type === "customer.subscription.created") {
//          await createPlan(interval ,userId, characterId, planId);
//         //}
//        }
//         else if (type === 'minute') {
//         const amount = price;
//         const transformedItems = lineItems.map((item:any) => ({
//           quantity: 1,
//           price_data: {
//               currency: "usd",
//               unit_amount: item.value * 100,
//               product_data: {
//                 name: 'Credit Purchase',
//                 },
//           },
//         }));
        
//         session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: transformedItems,
//         mode: 'payment',  
//         success_url: `http://localhost:3000/${characterName}`,
//           cancel_url: `http://localhost:3000`
//         })
//        // await updateMinute(userId, amount) 
//         }
        
//       // await updateBalance(userId, characterId, amount) 
//       // return res.status(201).json({session})
//       if (session) {
//         return res.status(201).json({session})
//       } else {
//         return res.status(500).send("not defined")
//       }
//     }catch(error){
//         console.log(error)
//     }
// }

// const checkSubscription = async(userId:any, characterId: any, planId:any) => {
//   try{    
//       const response = await prisma.userPlan.findUnique({
//           where:{
//             userId_planId_characterId: {
//               userId: userId,
//               characterId: characterId,
//               planId: planId
//             }
//           }
//       });
//       console.log("ts", response) 
//       return response;    
//   } catch(error){
//     console.log("error", error);
//   }
// }


// async function createPlan(interval:any ,userId:any, characterId: any, planId:any) {
//   const startAt = new Date();
//   let endDate = new Date();
//   if(interval === 'month'){
//     endDate = new Date(
//       Date.UTC(
//         startAt.getUTCFullYear(),
//         startAt.getUTCMonth()+1,
//         startAt.getUTCDate()  
//       )
//     ) 
//   } else if(interval = 'year'){
//     endDate = new Date(
//       Date.UTC(
//         startAt.getUTCFullYear()+1,
//         startAt.getUTCMonth(),
//         startAt.getUTCDate()  
//       )
//     ) 
//   }

//   try {
//   const response = await prisma.userPlan.create({
//         data: {
//           status: "active",
//           interval: interval,
//           characterId: characterId,
//           userId: userId,
//           planId: planId,
//           startAt: Date.UTC(
//             startAt.getUTCFullYear(),
//             startAt.getUTCMonth(), 
//             startAt.getUTCDate()
//           ).toString(),          
//           endAt: endDate
//         }
//   })
//   } catch(error){
//     console.log("erroring", error);
//   }
// }

// const createOrRetrieveCustomer = async (email, uuid) => {
//     console.log("details", email, uuid)
//     const data = await prisma.customer.findMany({
//       where: {
//         id: uuid
//       }
//     })
//     if (!data[0]?.stripe_customer_id) {
//       // No customer record found, let's create one.
//       const customerData: { metadata: { id: string }; email?: string } =
//         {
//           metadata: {
//             id: uuid
//           }
//         };
//       if (email) customerData.email = email;
//       const customer = await stripe.customers.create(customerData);
//       console.log("stripdata", customer)
//       // Now insert the customer ID into our Supabase mapping table.
//       const response  = await prisma.customer.create({ data:{ id: uuid, stripe_customer_id: customer.id, email: email }});
//       console.log("cus_creation", response)
//       if (!response) throw Error('Customer Not Created!');
//       console.log(`New customer created and inserted for ${uuid}.`);
//       return customer.id;
//     }
//     return data[0].stripe_customer_id;
//   };

// async function updateMinute(userId:any, amount:any) {
//     try {
//       const user = await prisma.minute.findMany({
//         where: {
//           userId: userId  
//         }
//       })
//       console.log("user", user)
//       let voiceamt = 0
  
//       if (user.length !== 0) {
//         console.log('update')
//         voiceamt = user[0].voiceamt? parseInt(user[0].voiceamt) + amount : amount
//         voiceamt = voiceamt.toString();
//         const data =  await prisma.minute.update({
//           where: { 
//             id: user[0]?.id
//           },
//           data: {
//             // Update data 
//             voiceamt,
//             userId
//           }
//         })
//       } else {
//       voiceamt = amount.toString();
//       await prisma.minute.create({
//         data: {           
//            voiceamt,
//            userId
//         }
//       })
//     }     
  
//      } catch (error) {
//       // Handle error
//       console.log("error", error)
//      }
//   }

  
// async function updateBalance(userId:any, characterId: any, amount:any) {
//   try {
//     const user = await prisma.userBalance.findUnique({
//       where: {
//         userId_characterId: {
//           userId: userId, 
//           characterId: characterId
//         }  
//       }
//     })

//     let balance = 0

//     if (user !== null) {
//       balance = user.balance ? user.balance + amount : amount
//       const data =  await prisma.userBalance.update({
//         where: { 
//           userId_characterId: {
//             userId: userId,
//             characterId: characterId
//           }
//         },
//         data: {
//           // Update data 
//           balance
//         }
//       })
//     } else {
//     balance = amount;
//     await prisma.userBalance.create({
//       data: {
//          balance,
//          userId,
//          characterId: characterId
//       }
//     })
//   }     

//    } catch (error) {
//     // Handle error
//     console.log("error", error)
//    }
// }
