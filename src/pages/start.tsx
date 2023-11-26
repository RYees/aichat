// pages/form.js
//@ts-nocheck
import { useState, useEffect } from "react";
import Head from "next/head";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import AuthModal from "../components/helper/AuthModal";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import analytics from "~/utils/analytics";
import SuccessModal from "../components/CreatorOnboardSucess";
import { Popover } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

import Image from "next/image";
import {
  sendWelcomEmailCreator,
  SendStripeKycEmail,
} from "../utils/customerIoService";
import Stripe from "stripe";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const personality = [
  { id: 1, name: "Outgoing and friendly", unavailable: false },
  { id: 2, name: "Reserved and thoughtful", unavailable: false },
  { id: 3, name: "Adventurous and daring", unavailable: false },
  { id: 4, name: "Humorous and playful", unavailable: true },
];

const hobby = [
  { id: 1, name: "Music", unavailable: false },
  { id: 2, name: "Movies", unavailable: false },
  { id: 3, name: "Cooking", unavailable: false },
  { id: 4, name: "Outdoor activities", unavailable: true },
];

const story = [
  { id: 1, name: "Life lessons", unavailable: false },
  { id: 2, name: "Travel adventures", unavailable: false },
  { id: 3, name: "Funny incidents", unavailable: false },
  { id: 4, name: "Inspirational stories", unavailable: true },
];

const topic = [
  { id: 1, name: "Personal relationships", unavailable: false },
  { id: 2, name: "Political views", unavailable: false },
  { id: 3, name: "Religious beliefs", unavailable: false },
];

const emoji = [
  { id: 1, name: "😀 😄 😁 😆 😅 😂 🤣 ", unavailable: false },
  { id: 2, name: "😊 😇 🙂 🙃 😉", unavailable: false },
  { id: 3, name: "😌 😍 🥰 😘 😚", unavailable: false },
  { id: 4, name: " 😋 😛 😝 😜 🤪", unavailable: false },
  { id: 5, name: "🥵 😈", unavailable: false },
];

import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import FormData from "form-data";
import { Switch } from "@headlessui/react";
import { PrismaClient } from "@prisma/client";

export default function FormPage() {
  const [audioData] = useState(new FormData());
  const [imageData] = useState(new FormData());
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState(people[0]);
  const [selectedPersonality, setPersonality] = useState(personality[0]);
  const [selectedHobby, setHobby] = useState(hobby[0]);
  const [selectedStory, setStory] = useState(story[0]);
  const [selectedTopic, setTopic] = useState(topic[0]);
  const [explicitContent, setExplicitContent] = useState(false);
  const [uniqueTopics, setUniqueTopics] = useState("");
  const [avoidTopics, setAvoidTopics] = useState("");
  const [selectedEmoji, setEmoji] = useState(emoji[0]);
  const [file, setFile] = useState();
  const [audio, setAudio] = useState();
  const [image, setImage] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setLoading] = useState();
  const [isLoadingAudio, setAudioLoading] = useState();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const { data: session } = useSession();
  const user = session?.user;

  async function getAccountLinkUrl() {
    const res = await axios.get("/api/character", {
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId: user?.id },
    });

    if (res.status !== 200) {
      throw new Error("Failed to get account link URL");
    }

    return res.data.character.stripeAccountLink;
  }

  const { fromStripe } = router.query;
  const { characterName } = router.query;
  const uid = user?.id;

  useEffect(() => {
    if (fromStripe === "true") {
      const redirect = async () => {
        try {
          // Fetch the existing Stripe account link URL from your database
          const response = await axios.get(`/api/character?userId=${uid}&characterName=${characterName}`, 
          // {
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   data: { userId: user?.id },
          // }
          );

          if (response.status !== 200) {
            throw new Error("Failed to get account link URL");
          }

          const accountLinkUrl = response.data.character.stripeAccountLink;
          const accountId = response.data.character.stripeAccountId;
          const accountLinkExpiresAt =
            response.data.character.stripeAccountLinkExpiresAt;

          // If the account link URL is not null or empty, redirect the user to it
          if (
            accountLinkUrl &&
            Math.floor(Date.now() / 1000) < accountLinkExpiresAt
          ) {
            window.location.href = accountLinkUrl;
          } else {
            // If the account link URL is null or empty, create a new account link
            const accountLink = await stripe.accountLinks
              .create({
                account: accountId,
                refresh_url:
                  process.env.NODE_ENV === "production"
                    ? "https://inchy.ai/start?fromStripe=true"
                    : "https://cd70-197-156-86-126.ngrok-free.app/start?fromStripe=true",
                return_url:
                  process.env.NODE_ENV === "production"
                    ? `https://inchy.ai/dashboard?stripeOnboarding=success&characterName=${encodeURIComponent(
                        characterName
                      )}`
                    : `https://cd70-197-156-86-126.ngrok-free.app/dashboard?stripeOnboarding=success&characterName=${encodeURIComponent(
                        characterName
                      )}`,
                type: "account_onboarding",
              })
              .catch((error) => {
                console.error("Error in stripe.accountLinks.create: ", error);
              });

            const res = await axios.get(`/api/character?characterName=${characterName}`
            // , {
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   params: { userId: user?.id },
            // }
            );
            // Update the Character record with the new Stripe account link URL
            const characterId = res.data.character.id; // Get the character ID from the response
            await axios.put("/api/character", {
              userId: user?.id,
              characterId: characterId, // Add this line
              stripeAccountLink: accountLink.url,
              stripeAccountLinkExpiresAt: accountLink.expiresAt,
            });

            console.log("Stripe account link:", accountLink);

            // Redirect the user to the new account link URL
            if (accountLink && accountLink.url) {
              window.location.href = accountLink.url;
            } else {
              console.error(
                "Failed to redirect to Stripe account link URL:",
                accountLink
              );
            }
          }
        } catch (error) {
          console.error("Failed to get or create account link URL:", error);
        }
      };

      redirect();
    }
  }, [fromStripe]);

  // useEffect(()=>{
  //   if(!session){
  //     router.push('/')
  //   }
  // });

  // const [nameError, setNameError] = useState(null);

  // useEffect(() => {
  //   const checkName = async () => {
  //     const res = await axios.get(`/api/checkName?name=${name}`);
  //     if (res.data.exists) {
  //       toast.error('This name is already taken. Please choose another one.');
  //     } else {
  //       setNameError(null);
  //     }
  //   };

  //   if (name) {
  //     checkName();
  //   }
  // }, [name]);

  // console.log(process.env.STRIPE_SECRET_KEY_P)
  const stripe = new Stripe(
    "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",
    {
      apiVersion: "2020-08-27",
    }
  );


  // const stripe = new Stripe(
  //   "sk_test_51NaOxNF14KBJQ45zvsYLNWmP1QJmdOzj9s1U9mxROTgYaBOH04wbxX2krBa0kRUjLHUpzlSDHE73tuo03Z1bHqM100QImgvWuE",
  //   {
  //     apiVersion: "2020-08-27",
  //   }
  // );

  useEffect(() => {
    if (session && fromStripe !== "true") {
      setStep(2); // Skip to the second step if the user is already signed in
    }
  }, [session, fromStripe]);

  useEffect(() => {
    //console.log(user, "user");
    analytics.identify(user?.id, {
      email: user?.email,
    });
    analytics.track("page_viewed", {
      flow: "onboarding",
      time: new Date(),
      stage: step,
      email: user?.email,
    });
  }, [step, user]);

  const setStepAndPersist = (newStep) => {
    console.log("Setting step to", newStep);
    setStep(newStep);
    localStorage.setItem("currentStep", newStep.toString());
  };

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    console.log("Retrieved step from localStorage:", savedStep);
    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  });

  // Add these functions to handle starting and stopping the recording
  const startRecording = async () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);

        setMediaRecorder(recorder);

        recorder.start();

        const audioChunks = [];
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        // console.log("recording", mediaRecorder);
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);

          const audio = new Audio(audioUrl);
          // Do something with the audio file here (e.g. upload it)
          uploadToS3(audioBlob);
        };

        setRecording(true);
      })
      .catch((error) => {
        console.error("Error starting recording: ", error);
      });
  };

  async function uploadToS3(audioBlob) {
    const upload = await fetch("/api/uploadRecord", {
      method: "POST", // changed from GET
      body: audioBlob,
    }).then((r) => r.json());
    //console.log("tear", upload.record)
    setAudio(upload.record);
    toast.success("Audio uploaded successfully!", { duration: 5000 });
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const CustomerApiKey = process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY;

  const signInWithGoogle = () => {
    setDisabled(true);
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
      onSuccess: () => {
        // Move to the next step of the form
        setStep(step + 1);
        // analytics.identify(user.id, {
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   email: user.email,
        //   // any other user traits
        // });
      },
    });

    // if (analytics && typeof analytics.track === 'function') {
    //   analytics.track("Logged_In", {
    //     flow: "creator",
    //   });
    // }
  };

  async function OnChangeAudioFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    try {
      setAudioLoading(true);
      const piles = event.target.files[0];
      const files = event.target.files[0];

      // Check if the file is an audio file
      if (!files.type.startsWith("audio/")) {
        toast.error("The selected file is not an audio file");
        setAudioLoading(false);
        // throw new Error('The selected file is not an audio file');
        return;
      }

      audioData.append("file", files);

      const upload = await fetch("/api/uploadAudio", {
        method: "POST", // changed from GET
        body: audioData,
      }).then((r) => r.json());
      if (upload) {
        setAudioLoading(false);
      }
      setAudio(upload.audio);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function OnChangeImageFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const piles = event.target.files[0];
      const files = event.target.files[0];

      // Check if the file is an image file
      if (!files.type.startsWith("image/")) {
        toast.error("The selected file is not an image file");
        event.preventDefault();
        return;
      }

      imageData.append("file", files);

      const upload = await fetch("/api/uploadFile", {
        method: "POST", // changed from GET
        body: imageData,
      }).then((r) => r.json());
      if (upload) {
        setLoading(false);
      }
      setImage(upload.image);
      toast.success("Image uploaded successfully!", { duration: 5000 });
    } catch (error) {
      console.log("error", error);
    }
  }

  // const SendStripeKycEmail = async () => {

  //   const data = {
  //     transactional_message_id: '4',
  //     to: user.email,
  //     identifiers: {
  //       email: user.email,
  //     },
  //     message_data: {
  //       name: user.name,
  //       // ... other data for your email ...
  //     },
  //   };
  //   try {
  //     const response = await axios.post('https://api.customer.io/v1/send/email', data, {
  //       headers: {
  //         'Authorization': `Bearer ${CustomerApiKey}`
  //       }
  //     });

  //     // Handle the response
  //     if (response.status === 200) {
  //       console.log('Email sent successfully');
  //     } else {
  //       console.log('Failed to send email');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while sending the email:', error);
  //   }
  // }

  const submitForm = async () => {
    const errors = await checkErrors();

    // If there are any errors, stop the form submission
    if (Object.keys(errors).length > 0) {
      // Show a toast message for each error
      for (let error in errors) {
        toast.error(errors[error]);
      }
      return;
    }

    toast("Submitting information...");

    try {
      const userEmail = session?.user?.email;
      const res = await axios
        .post("/api/addForm", {
          name: name,
          email: userEmail,
          description: description,
          personality: selectedPersonality?.name,
          hobby: selectedHobby?.name,
          story: selectedStory?.name,
          topic: selectedTopic?.name,
          emoji: selectedEmoji?.name,
          explicitContent: explicitContent,
          uniqueTopics: uniqueTopics,
          avoidTopics: avoidTopics,
          audio: audio,
          image: image,
          userId: user?.id,
          files: file,
        })
        .catch((error) => {
          console.error("Error in axios.post: ", error);
        });

      const characterId = res.data.id;
      setStepAndPersist(1);

      // analytics.track("page_viewed", {
      //   flow: "onboarding",
      //   time: new Date(),
      //   stage: "6",
      // });
      // Create a new Stripe Connect account for the creator
      const account = await stripe.accounts
        .create({
          type: "express",
          email: user.email,
          business_type: "individual",
          business_profile: {
            url: `https://inchy.ai/${name}`,
          },
        })
        .catch((error) => {
          console.error("Error in stripe.accounts.create: ", error);
        });

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url:
          process.env.NODE_ENV === "production"
            ? `https://inchy.ai/start?fromStripe=true&characterName=${encodeURIComponent(
                name
              )}`
            : `https://cd70-197-156-86-126.ngrok-free.app/start?fromStripe=true&characterName=${encodeURIComponent(
                name
              )}`,
        return_url:
          process.env.NODE_ENV === "production"
            ? `https://inchy.ai/dashboard?stripeOnboarding=success&characterName=${encodeURIComponent(
                name
              )}`
            : `https://cd70-197-156-86-126.ngrok-free.app/dashboard?stripeOnboarding=success&characterName=${encodeURIComponent(
                name
              )}`,
        type: "account_onboarding",
      });

      // Update the Character record with the Stripe account ID
      await axios.post("/api/character", {
        userId: user?.id,
        stripeAccountId: account.id,
        stripeAccountLink: accountLink.url,
        characterId: characterId,
      });

      const firstName = session?.user?.name.split(" ")[0];
      const accountUrl = accountLink.url;
      //send stripe kyc email(firs transactional)
      console.log(
        "About to call SendStripeKycEmail",
        user.email,
        name,
        accountLink.url
      );

      await SendStripeKycEmail(user.email, firstName, accountUrl);

      console.log(accountLink);
      if (accountLink !== null) {
        window.location.href = accountLink.url;
      }
      setShowSuccessModal(true);

      // Track the character_created event
      analytics.identify(user?.id, {
        email: user?.email,
      });
      analytics.track("character_created", {
        creator: user?.id, // or any other identifier for the creator
      });

      // sendEmail('4', userEmail, { name: name, url: accountLink.url });

      // sending email with their link for inchy
      // Schedule second email to be sent after 1 minute
      // setTimeout(() => {
      //   sendEmail('5', userEmail,  { name: name, url: accountLink.url });
      // }, 60000);

      // using node cron

      //     const cron = require('node-cron');

      // // Schedule task to run after 24 hours
      // cron.schedule('* * 24 * * *', function() {
      //   sendEmail('5', userEmail, { name: name });
      // });
    } catch (error) {
      console.log("error", error);
    }
  };

  const stepBackgrounds = [
    "https://image.lexica.art/full_jpg/314cf863-ff56-4726-9b34-f065f4ec4a5c", // Step 1
    "/formstep1.svg", // Step 2
    "/formstep2.svg", // Step 3
    "/formstep3.svg", // Step 4
    "https://image.lexica.art/full_jpg/314cf863-ff56-4726-9b34-f065f4ec4a5c", //step5
  ];

  const steps = [
    // ...(session ? [] : [
    {
      label: "Authentication",
      component: (
        <div className="-mt-56 w-96 leading-10 md:-mt-0 md:w-full">
          <h3>Welcome back!</h3>
          <p className="mb-20">Create your account or login to continue</p>
          <button
            disabled={disabled}
            onClick={() => signInWithGoogle()}
            className="my-16 flex h-[46px] justify-center space-x-2 rounded-md border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-400 hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500 md:w-[50%]"
          >
            <FcGoogle />
            <span className="text-lg">Continue with Google</span>
          </button>
        </div>
      ),
    },
    // ]),
    {
      label: "Name & Description",
      component: (
        <div className="">
          <h1 class="-mt-20 w-80 mx-6 md:mx-0 text-center text-xl font-bold tracking-tight text-gray-900 md:w-full md:p-6 md:text-2xl">
            <span class="block">
              Welcome to{" "}
              <span class="bg-gradient-to-tr from-orange-600 to-orange-300 bg-clip-text text-transparent">
                Inchy,{" "}
              </span>
              where your personality shines in a digital form! As an 18+
              platform, we create a unique experience for adult audience. Start
              by sharing general information about yourself to start engaging
              your fans like never before!
            </span>
          </h1>

          <div className="mb:mb-0 mx-5 -ml-1 mb-10 md:mx-0 md:-ml-0">
            <div className="mt-16 flex flex-col gap-5 md:flex-row">
              {/* <div className="w-3/4">
                <label htmlFor="name" className="block text-lg font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div> */}

              {/* <div>
                <form 
                //onSubmit={OnChangeFile}
                >
                  <input type="file" onChange={OnChangeFile}/>
                  <button>submit</button>
                </form>
              </div> */}

              <div className="relative z-0 mb-5 w-full ml-2 md:ml-0">
                <input
                  type="text"
                  name="name"
                  placeholder="Name "
                  value={name ? name : ""}
                  onChange={(e) => setName(e.target.value.replace(/\s/g, ""))}
                  //onChange={e => setForm({...form, name: e.target.value})}
                  className="relative h-16 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                />
                {/* <label
                  // htmlFor="name"
                  className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
                >
                  Name
                </label> */}
              </div>

              <div className="relative z-0 mb-5 w-full ml-2 md:ml-0">
                <input
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={description ? description : ""}
                  onChange={(e) => setDescription(e.target.value)}
                  //onChange={e => setForm({...form, description: e.target.value})}
                  className="relative h-16 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                />
                {/* <label
                  htmlFor="description"
                  className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
                >
                  Description
                </label> */}
              </div>
            </div>
            {/* Add illustration here */}
            {/* <Image src="https://image.lexica.art/full_jpg/2e179a5c-d2af-4a31-ae0d-6b5d6be0e206" height="300" width="400"></Image> */}
          </div>
        </div>
      ),
    },
    {
      label: "Character & Personlaity",
      component: (
        <div className="-mt-24">
          <h1 class="mb-14 w-80 mx-6 md:mx-0 text-center text-xl font-bold tracking-tight text-gray-900 sm:text-lg md:w-full md:p-6 md:text-2xl">
            <span class="block">
              Let's define your digital replica! Answer questions to create a
              persona that truly reflects you. This is your chance to shape how
              your digital twin connects with your fans.
            </span>
          </h1>

          <div className="w-96 md:-ml-0 md:flex md:w-full md:flex-col md:justify-center">
            <div className="mb-10">
              <label htmlFor="name" className="block text-lg font-semibold">
                What unique traits should your AI avatar reflect?
              </label>
              <Listbox value={personality} onChange={setPersonality}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative md:w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm shadow-md w-80 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedPersonality.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ArrowRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    // as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {personality.map((personality, personalityIdx) => (
                        <Listbox.Option
                          key={personalityIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={personality}
                        >
                          {({ selectedPersonality }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedPersonality
                                    ? "font-medium"
                                    : "font-normal"
                                }`}
                              >
                                {personality.name}
                              </span>
                              {selectedPersonality ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <ArrowRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="mb-10">
              <label htmlFor="name" className="block text-lg font-semibold">
                Any main hobby or interest your AI avatar should share?
              </label>
              <Listbox value={selectedHobby} onChange={setHobby}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative md:w-full w-80 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedHobby?.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ArrowRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    // as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute  z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {hobby.map((hobby, hobbyIdx) => (
                        <Listbox.Option
                          key={hobbyIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={hobby}
                        >
                          {({ selectedHobby }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {hobby.name}
                              </span>
                              {selectedHobby ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <ArrowRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="mb-10">
              <label htmlFor="name" className="block text-lg font-semibold">
                What stories or experiences should your AI avatar share with
                fans?
              </label>
              <Listbox value={selectedStory} onChange={setStory}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-80 md:w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedStory?.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ArrowRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    // as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute  z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {story.map((story, storyIdx) => (
                        <Listbox.Option
                          key={storyIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={story}
                        >
                          {({ selectedStory }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedStory ? "font-medium" : "font-normal"
                                }`}
                              >
                                {story.name}
                              </span>
                              {selectedStory ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <ArrowRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <label
                htmlFor="explicitContent"
                className="text-lg font-semibold"
              >
                Explicit Content
              </label>
              <span className="flex items-center">
                <Switch
                  checked={explicitContent}
                  onChange={setExplicitContent}
                  className={`${
                    explicitContent ? "bg-orange-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable explicit content</span>
                  <span
                    className={`${
                      explicitContent ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
                </Switch>
                <Popover className="relative ml-2">
                  <Popover.Button>
                    <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />
                  </Popover.Button>
                  <Popover.Panel className="absolute bottom-full z-20 mb-2 w-60 rounded bg-white p-2 text-sm text-black shadow-md">
                    Turn this on to make your replica open for explicit content
                    and chat.
                  </Popover.Panel>
                </Popover>
              </span>
            </div>

          </div>
          {/* <div className="w-3/4">
              <label htmlFor="name" className="block text-lg font-semibold">
                Which emojis or symbols represent your personality?
              </label>
              <Listbox value={selectedEmoji} onChange={setEmoji}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selectedEmoji.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ArrowRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    // as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {emoji.map((emoji, emojiIdx) => (
                        <Listbox.Option
                          key={emojiIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={emoji}
                        >
                          {({ selectedEmoji }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedEmoji ? "font-medium" : "font-normal"
                                }`}
                              >
                                {emoji.name}
                              </span>
                              {selectedEmoji ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <ArrowRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div> */}

          {/* <div className="mx-5 mb-12 flex space-x-4">
            <div className="w-3/4">
              <label htmlFor="name" className="block text-lg font-semibold">
                Are there any specific topics or types of questions that you
                would like your AI avatar to avoid?
              </label>
              <Listbox value={selectedTopic} onChange={setTopic}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedTopic?.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ArrowRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    // as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute  z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {topic.map((topic, topicIdx) => (
                        <Listbox.Option
                          key={topicIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={topic}
                        >
                          {({ selectedTopic }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedTopic ? "font-medium" : "font-normal"
                                }`}
                              >
                                {topic.name}
                              </span>
                              {selectedTopic ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <ArrowRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
           
          </div> */}
          {/* Add illustration here */}
        </div>
      ),
    },
    {
      label: "more details about replica",
      component: (
        <div className="">
          {/* second component */}

          <div className="-mt-40 md:-mt-16">
            <div className="flex justify-center">
              <div className="mt-8 md:mx-5">
                <div className="text-center">
                  <h2 className="mt-5 text-xl font-bold text-gray-900 md:text-3xl">
                    Final details
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    anything we missed?
                  </p>
                </div>
                <div className="mt-4 mx-1 md:w-full">
                  <label
                    htmlFor="uniqueTopics"
                    className="block text-lg font-semibold"
                  >
                    How would you describe the unique topics or themes that
                    you're known for, which you'd like the AI avatar to discuss
                    with your fans? (e.g., specific types of content, personal
                    interests, signature styles)
                  </label>
                  <input
                    id="uniqueTopics"
                    type="text"
                    value={uniqueTopics}
                    onChange={(e) => setUniqueTopics(e.target.value)}
                    className="relative h-16 w-80 md:w-full mt-4 md:mt-0 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    placeholder="Enter unique topics or themes"
                  />
                </div>

                <div className="mt-16 w-96 mb-10 md:w-full">
                  <label
                    htmlFor="avoidTopics"
                    className="block text-lg mb-3 mr-4 font-semibold"
                  >
                    Are there specific topics or themes you'd prefer the AI
                    avatar to avoid in conversations with fans? Please list any
                    areas of sensitivity or preference, separating each with a
                    comma. (optional)
                  </label>
                  <input
                    id="avoidTopics"
                    type="text"
                    value={avoidTopics}
                    onChange={(e) => setAvoidTopics(e.target.value)}
                    className="relative h-16 w-80 md:w-full mb-5 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-sm shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    placeholder="Enter topics to avoid"
                  />
                </div>
              </div>
              {/* <div className="z-10 w-full rounded-xl bg-white p-10 sm:max-w-lg">
                    <div className="text-center">
                      <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        Image Upload!
                      </h2>
                      <p className="mt-2 text-sm text-gray-400">
                        Image file upload for your AI.
                      </p>
                    </div>
                    <form className="mt-8 space-y-3" action="#" method="POST">
                      <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold tracking-wide text-gray-500">
                          Attach Document
                        </label>
                        <div className="flex w-[30rem] items-center justify-center">
                          <label className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center">
                            <div className="flex h-full w-full flex-col items-center justify-center text-center  ">

                              <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                                <img
                                  className="has-mask h-36 object-center"
                                  src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                  alt="freepik image"
                                />
                              </div>
                              <p className="pointer-none text-gray-500 text-sm">
                                <span className="text-sm">Drag and drop</span> files
                                here <br /> or{" "}
                                <p
                                  // href=""
                                  id=""
                                  className="text-blue-600 hover:underline"
                                >
                                  select a file
                                </p>{" "}
                                from your computer
                              </p>
                            </div>
                            <input type="file" className="hidden" onChange={OnChangeImageFile} />
                          </label>
                        </div>
                      </div>
                      {isLoading?<p className="text-sm">Loading...</p>:null}
                      <p className="text-sm text-gray-300">
                        <span>File type: doc,pdf,types of images</span>
                      </p>
                    </form>
                  </div> */}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "audio and photo",
      component: (
        <div className="-mt-40 mb-10 md:mx-0 md:-mt-0">
          <h1 className="w-96 -ml-1 text-center text-xl md:w-full md:text-2xl">
            <span>
              Your voice matters! Record a few phrases, and our advanced
              technology will craft a vocal replica that’s just like you. Give
              your fans the sensation of chatting directly with you!
            </span>
          </h1>

          {/* audio upload */}
          <div className="mx-7 flex flex-col justify-center md:flex-row">
            <div className="">
              <label htmlFor="name" className="block text-lg font-semibold">
                {/* </label>@@ -689,7 +726,7 @@ export default function FormPage() { */}

                <div className="z-10 w-full rounded-xl bg-white p-10 sm:max-w-lg ">
                  <div className="text-center">
                    <h2 className="mt-5 w-56 text-center text-3xl font-bold text-gray-900 md:w-full">
                      Upload Audio
                    </h2>
                    <p className="mt-2 w-56 text-sm text-gray-400 md:w-full">
                      We need just 1 minute of your voice
                      {/* @@ -701,18 +738,12 @@ export default function FormPage() { */}
                    </p>
                  </div>
                </div>
                <form className="mx-10 mt-1 space-y-3" action="#" method="POST">
                  <div className="grid grid-cols-1 space-y-2">
                    <div className="flex w-56 items-center justify-center md:w-full">
                      <label className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center">
                        <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                          {/*-<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>*/}
                          {/* <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                            <img
                              className="has-mask h-36 object-center"
                              src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                              alt="freepik image"
                            />
                          </div> */}
                          <p className="pointer-none text-sm text-gray-500">
                            {/* <span className="text-sm">Drag and drop</span> files
                            here <br /> or{" "} */}
                            <p
                              // href=""
                              id=""
                              className="cursor-pointer text-2xl text-blue-600 hover:underline"
                            >
                              select a file
                            </p>{" "}
                            from your computer
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            OnChangeAudioFile(e);
                            console.log(e.target.files[0]); // Add this line
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span>File type: mp3, wav</span>
                  </p>
                  {isLoadingAudio ? (
                    <p className="text-sm">Loading...</p>
                  ) : null}
                </form>
              </label>
            </div>

            {/* image upload */}
            <div className="">
              <label htmlFor="name" className="block text-lg font-semibold">
                {/* </label>@@ -689,7 +726,7 @@ export default function FormPage() { */}

                <div className="z-10 w-full rounded-xl bg-white p-10 sm:max-w-lg ">
                  <div className="text-center">
                    <h2 className="mt-5 w-56 text-center text-3xl font-bold text-gray-900 md:w-full">
                      Upload Image
                    </h2>
                    <p className="mt-2 w-56 text-sm text-gray-400 md:w-full">
                      Image is used as an avatar for chat
                      {/* @@ -701,18 +738,12 @@ export default function FormPage() { */}
                    </p>
                  </div>
                </div>
                <form className="mx-10 mt-1 space-y-3" action="#" method="POST">
                  <div className="grid grid-cols-1 space-y-2">
                    <div className="flex w-56 items-center justify-center md:w-full">
                      <label className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center">
                        <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                          {/*-<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>*/}
                          {/* <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                            <img
                              className="has-mask h-36 object-center"
                              src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                              alt="freepik image"
                            />
                          </div> */}
                          <p className="pointer-none text-sm text-gray-500">
                            {/* <span className="text-sm">Drag and drop</span> files
                            here <br /> or{" "} */}
                            <p
                              // href=""
                              id=""
                              className="cursor-pointer text-2xl text-blue-600 hover:underline"
                            >
                              select a file
                            </p>{" "}
                            from your computer
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={OnChangeImageFile}
                        />
                      </label>
                    </div>
                  </div>

                  {isLoading ? <p className="text-sm">Loading...</p> : null}
                  <p className="text-sm text-gray-300">
                    <span>File type: png,jpg,types of images</span>
                  </p>
                </form>
              </label>
            </div>
            {/* <div className="flex">
              <span className="mr-4 mt-40">or</span>
              <button
                disabled
                onClick={recording ? stopRecording : startRecording}
                className="mt-40 h-20 rounded bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-xl text-gray-300 hover:bg-orange-700 "
              >
                {recording ? "Stop Recording" : "Start Recording"}
              </button>
            </div> */}

            {/* <div className="flex w-full items-center justify-center">
                  <label className="group flex h-20 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center">
                    <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                      <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>

                      <p className="pointer-none text-gray-500 text-sm">
                        <span  className="text-sm">Drag and drop</span> files
                        here <br /> or{" "}
                        <input type="file" className="hidden" onChange={OnChangeFile} />
                      </p>
                    </div>
                  </label>
                </div> */}
          </div>
          {/* </div>  */}
        </div>
      ),
    },

    // {
    //   label: "Payment & Bank",
    //   component: (
    //     <div className="block  p-8 ">
    //       <h3 className="mb-4 text-base">Payment</h3>
    //       <div className="relative z-0 mb-5 w-full">
    //         <input
    //           type="text"
    //           name="cc"
    //           placeholder=" "
    //           className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //         />
    //         <label
    //           htmlFor="cc"
    //           className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //         >
    //           Name
    //         </label>
    //       </div>
    //       <div className="grid grid-cols-2 gap-4">
    //         <div className="relative z-0 mb-5 w-full">
    //           <input
    //             type="text"
    //             name="dd"
    //             placeholder=" "
    //             className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //           />
    //           <label
    //             htmlFor="dd"
    //             className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //           >
    //             Routing Number
    //           </label>
    //         </div>
    //         <div className="relative z-0 mb-5 w-full">
    //           <input
    //             type="text"
    //             name="mm"
    //             placeholder=" "
    //             className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //           />
    //           <label
    //             htmlFor="mm"
    //             className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //           >
    //             Account Number
    //           </label>
    //         </div>
    //       </div>
    //       <div className="relative z-0 mb-5 w-full">
    //         <input
    //           type="text"
    //           name="cvv"
    //           placeholder=" "
    //           className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //         />
    //         <label
    //           htmlFor="cvv"
    //           className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //         >
    //           Paypal, Cashapp etc..(optional)
    //         </label>
    //       </div>
    //     </div>
    //   ),
    // },

    // {
    //   label: "Payment & Bank",
    //   component: (
    //     <div className="block  p-8 ">
    //       <h3 className="mb-4 text-base">Payment</h3>
    //       <div className="relative z-0 mb-5 w-full">
    //         <input
    //           type="text"
    //           name="cc"
    //           placeholder=" "
    //           className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //         />
    //         <label
    //           htmlFor="cc"
    //           className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //         >
    //           Name
    //         </label>
    //       </div>
    //       <div className="grid grid-cols-2 gap-4">
    //         <div className="relative z-0 mb-5 w-full">
    //           <input
    //             type="text"
    //             name="dd"
    //             placeholder=" "
    //             className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //           />
    //           <label
    //             htmlFor="dd"
    //             className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //           >
    //             Routing Number
    //           </label>
    //         </div>
    //         <div className="relative z-0 mb-5 w-full">
    //           <input
    //             type="text"
    //             name="mm"
    //             placeholder=" "
    //             className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //           />
    //           <label
    //             htmlFor="mm"
    //             className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //           >
    //             Account Number
    //           </label>
    //         </div>
    //       </div>
    //       <div className="relative z-0 mb-5 w-full">
    //         <input
    //           type="text"
    //           name="cvv"
    //           placeholder=" "
    //           className="mt-0 block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 pb-2 pt-3 font-sans focus:border-indigo-600 focus:outline-none focus:ring-0"
    //         />
    //         <label
    //           htmlFor="cvv"
    //           className="-z-1 origin-0 absolute top-3 text-base text-gray-500 duration-200"
    //         >
    //           Paypal, Cashapp etc..(optional)
    //         </label>
    //       </div>
    //     </div>
    //   ),
    // },

    // Add other steps here
  ];

  const checkErrors = async () => {
    let errors = {};

    if (step === 1) {
      if (!session) {
        errors.user = "You must be logged in to continue";
      }
    } else if (step === 2) {
      if (!name) {
        errors.name = "Name is required";
      } else {
        // Check if the name already exists
        const res = await axios.get(`/api/checkName?name=${name}`);
        if (res.data.exists) {
          errors.name =
            "This name is already taken. Please choose another one.";
        }
      }
      if (!description) errors.description = "Description is required";
    } else if (step === 3) {
      if (!selectedStory) errors.story = "Story is required";
      if (!selectedTopic) errors.topic = "Topic is required";
      if (!selectedEmoji) errors.emoji = "Emoji is required";
    } else if (step === 4) {
      if (!uniqueTopics) errors.image = "Detail about topic is required";
    } else if (step === 5) {
      if (!image) errors.image = "Image is required";
      if (!audio) errors.audio = "Audio is required";
    }

    return errors;
  };

  const handleNextStep = async () => {
    const errors = await checkErrors();

    // If there are any errors, stop the form submission
    if (Object.keys(errors).length > 0) {
      // Show a toast message for each error
      for (let error in errors) {
        toast.error(errors[error]);
      }
      return;
    }

    if (step < steps.length) {
      setStep((prevStep) => prevStep + 1);
      setStepAndPersist(step + 1);
    }
  };

  // const handleNextStep = async () => {

  //   let errors = {};

  //   if (step === 1) {
  //     if (!session) {
  //       errors.user = "You must be logged in to continue";
  //     }
  //   } else if (step === 2) {
  //     if (!name) {
  //       errors.name = "Name is required";
  //     } else {
  //       // Check if the name already exists
  //       const res = await axios.get(`/api/checkName?name=${name}`);
  //       if (res.data.exists) {
  //         errors.name = 'This name is already taken. Please choose another one.';
  //       }
  //     }
  //           if (!description) errors.description = "Description is required";
  //   } else if (step === 3) {
  //     if (!selectedStory) errors.story = "Story is required";
  //     if (!selectedTopic) errors.topic = "Topic is required";
  //     if (!selectedEmoji) errors.emoji = "Emoji is required";
  //   } else if (step === 4) {
  //     if (!uniqueTopics) errors.image = "Detail about topic is required";
  //   }else if (step === 5){
  //     if (!image) errors.image = "Image is required";
  //     if (!audio || !recording) errors.audio = "Audio is required";

  //   }

  // // If there are any errors, stop the form submission
  // if (Object.keys(errors).length > 0) {
  //   // Show a toast message for each error
  //   for (let error in errors) {
  //     toast.error(errors[error]);
  //   }
  //   return;
  // }

  //   if (step < steps.length) {
  //     setStep((prevStep) => prevStep + 1);
  //   }
  // };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      setStepAndPersist(step - 1);
    }
  };

  return (
    <div>
      <Head>
        <title>Get Started with inchy</title>
      </Head>

      {/* <h1 className=" text-4xl"> Get Started with inchy</h1> */}
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 min-h-screen bg-white pl-7 font-sans font-bold text-gray-800">
          <div className="grid min-h-screen grid-flow-col grid-rows-6 items-center ">
            <div className="row-span-4 row-start-2 text-4xl">
              {steps[step - 1].component}
              <div className="mx-5 flex justify-between">
                {step > 1 && (
                  // <button
                  //   onClick={handlePreviousStep}
                  //   className="flex items-center space-x-2"
                  // >
                  //   <ArrowRightIcon className="h-5 w-5 -rotate-180 transform" />
                  //   Previous
                  // </button>

                  <div className="relative">
                    <div className="absolute -inset-5">
                      <div className="mx-auto h-full w-full max-w-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600 opacity-30 blur-lg lg:mx-0"></div>
                    </div>
                    <button
                      onClick={handlePreviousStep}
                      title=""
                      className="font-pj relative  inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent bg-gray-900 px-8 py-3 text-lg font-bold text-white transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
                      role="button"
                    >
                      Previous
                    </button>
                  </div>
                )}
                {step < steps.length && (
                  <div className="relative">
                    <div className="absolute -inset-5">
                      <div className="mx-auto h-full w-full max-w-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600 opacity-30 blur-lg lg:mx-0"></div>
                    </div>
                    <button
                      onClick={handleNextStep}
                      title=""
                      className="font-pj relative z-10 inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent bg-gray-900 px-8 py-3 text-lg font-bold text-white transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
                      role="button"
                    >
                      Next
                    </button>
                  </div>
                  // <button
                  //   onClick={handleNextStep}
                  //   className="flex items-center space-x-2"
                  // >
                  //   Next
                  //   <ArrowRightIcon className="h-5 w-5" />
                  // </button>
                )}
                {step === steps.length && (
                  // <button className="rounded bg-blue-500 px-4 py-2 text-white">
                  //   Submit
                  // </button>

                  <div className="relative mr-[2rem] md:ml-0">
                    <div className="absolute -inset-5">
                      <div className="mx-auto h-full w-full max-w-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600 opacity-30 blur-lg lg:mx-0"></div>
                    </div>
                    <button
                      // onClick={handleNextStep}
                      onClick={submitForm}
                      title=""
                      className="relative z-10 inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent bg-gray-900 px-8 py-3 text-lg font-bold text-white transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
                      role="button"
                    >
                      Submit
                    </button>
                  </div>
                )}
                <SuccessModal
                  show={showSuccessModal}
                  onClose={() => setShowSuccessModal(false)}
                />
              </div>
              {/* <div className="pr-20 pt-10">
                    <label className="font-sans text-sm font-medium">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Write your username"
                      className="hover: w-full rounded border border-gray-500 bg-black px-12 py-3 font-sans text-base shadow"
                    />
                  </div>
                  <div className="pr-20 pt-2">
                    <label className="font-sans text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Write your password"
                      className=" hover: w-full rounded border border-gray-500 bg-black px-12 py-3 font-sans text-base shadow"
                    />
                    <a
                      href=""
                      className="font-sans text-sm font-medium text-gray-600 underline"
                    >
                      Forgot password?
                    </a>
                  </div> */}
              {/* Button */}
              {/* <div className="w-full pr-20 pt-14 font-sans text-sm font-medium">
                    <button
                      type="button"
                      className="w-full rounded-md bg-blue-700 py-4 text-center text-white hover:bg-blue-400"
                    >
                      SIGN IN
                    </button>
                  </div> */}
            </div>
            {/* Text */}
            <a
              href="/"
              className="font-sans text-sm font-medium text-gray-400 underline"
            >
              Inchy Inc
            </a>
          </div>
        </div>
        {/* Second column image */}
        <div
          className="banner col-span-4 hidden border-l-2  border-gray-200  font-sans font-bold text-white lg:block"
          style={{
            backgroundImage: `url(${stepBackgrounds[step - 1]})`,
            backgroundSize: `${step - 1 == 0 ? "cover" : ""}`,
            //   backgroundRepeat: no-repeat,
            // backgroundSize: cover
          }}
        >
          {/* Aquí iría algún comentario */}
        </div>
      </div>

      {/* <div className="container mx-auto p-4">
            
            <h1 className="mb-4 text-2xl font-semibold">Step {step}</h1>
            {steps[step - 1].component}
            <div className="mt-4 flex justify-between">
              {step > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="flex items-center space-x-2"
                >
                  <ArrowRightIcon className="h-5 w-5 -rotate-180 transform" />
                  Previous
                </button>
              )}
              {step < steps.length && (
                <button
                  onClick={handleNextStep}
                  className="flex items-center space-x-2"
                >
                  Next
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              )}
              {step === steps.length && (
                <button className="rounded bg-blue-500 px-4 py-2 text-white">
                  Submit
                </button>
              )}
            </div>
          </div> */}
      <Toaster />
    </div>
  );
}
// export default FormPage;
