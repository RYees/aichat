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
import axios from "axios";
import React from "react";
import Loader from "./Load";
import { useRouter } from "next/router";

const SubscribeModal = (props: any) => {
  const router = useRouter();
  const character = props.character;
  //console.log("from subscribe modal", character);
  const {subscriptions} = router.query;
  const plans = props.plans;
  const { data: session } = useSession();
  const user = session?.user;

  const show = props.show;
  const onClose = props.onClose;
  const [view, setView] = useState(true);
  const [see, setSee] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [isLoading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [subscription, setPlan] = useState([]);
  const [subarray, setArray] = useState([]);
  const [isstatus, setStatus] = useState();

  // console.log(subscription, "sunscription");
  const userplan = async () => {
    if (
      character?.id !== undefined &&
      character?.id !== null &&
      user?.id !== undefined &&
      user?.id !== null
    ) {
      const response = await axios.post(`/api/fetchsinglePlan`, {
        userId: user?.id,
        characterId: character?.id,
      });

      //  console.log("allboyts", response)
      setPlan(response.data);
      if (response.data !== null) {
        setPlan(response.data);
      }
    }
  };

  useEffect(() => {
    if (user && character) {
      userplan();
    }
  }, [user, character]);

  useEffect(() => {
    //console.log("SubscribeModal rendered with character:", character);
  }, [character]);

  // useEffect(()=>{
  //    const timer = setTimeout(() => {
  //     return userplan();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // },[userplan]);

  const handleManageClick = (e) => {
    // sessionStorage.setItem('subscription', JSON.stringify(subscription))
    //router.push(`/account?userId=${user?.id}&characterId=${character?.id}&subscription=${subscription}`);
    router.push({
      pathname: "/account",
      query: {
        characterId: character.id,
        userId: user?.id,
        subscription: JSON.stringify(subscription),
      },
    });
  };

  // const { data: session } = useSession();
  // // const user = session?.user?.email;
  // const user = session?.user;

  const [selectedCredits, setSelectedCredits] = useState(100); // Default selected credits  { show = false, onClose = () => null }
  const [userId, setId] = useState("");

  const creditOptions = [
    { id: 1, label: "$50", value: 50 },
    { id: 2, label: "$100", value: 100 },
    { id: 3, label: "$200", value: 200 },
    { id: 4, label: "$500", value: 500 },
    { id: 5, label: "$1000", value: 1000 },
  ];

  const handleCreditSelect = (value: any) => {
    setSelectedCredits(value);
  };

  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const closeModal = () => {
    if(subscriptions !== undefined){
      if (subscriptions === 'success' && typeof onClose === "function") {
        onClose();
      }
    } else if(isstatus?.length === 0){
      if (subscriptions === 'success' && typeof onClose === "function") {
        onClose();
      }
    }    
    else if(isstatus?.length !== 0 && isstatus !== undefined) {
      if (typeof onClose === "function") {
        onClose();
      }
    }
  };

  useEffect(()=>{
    isSubscriptionActive()
  },[isstatus]);

  const checkSubscription = async (planId: any) => {
    try {
      if (user) {
        let uid = user.id.toString();
        //console.log("laot", uid, character?.id, planId);
        const response = await axios.post("/api/checkSubscription", {
          userId: uid,
          characterId: character?.id,
          //planId: planId
        });
        //console.log("twins", response.data);
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const isSubscriptionActive = async () => {
    if (user) {
      let uid = user.id.toString();
      const response = await axios.post("/api/isSubscriptionActive", {
        userId: uid,
        characterId: character?.id,
      });
      // console.log("rehm", response.data.length);
      setStatus(response.data.length);
      //await checkSubscription();
    }
  };

  const handlePurchaseClick = async (e, price, priceId, planId, interval) => {
    e.preventDefault();

    const stripe = await stripePromise;
    setLoading(true);
    //const result = await checkSubscription(planId);
    // if(result !== null){
    //   const now = new Date();
    //   console.log("power", result.endAt, now);
    //   let endDate = result.endAt;
    //   const date1 = new Date(endDate).getTime();
    //   const date2 = new Date(now).getTime();
    //   let msg;
    //   if(date1 > date2) {
    //     msg = 'subscription is not due yet';
    //     setLoading(false);
    //     setMessage(msg);
    //     setTimeout(()=>{
    //       setMessage('');
    //     },10000);
    //     return true;
    //   } else {
    //     msg = "date error";
    //   }
    // }
    // else{
    try {
      if (user) {
        // setId(user.id);
        // const iduser = user.id;
        const uid = user.id;
        let email = user.email;
        let characterName = character.name;
        let characterId = character.id;
        const type = "subscription";
       // console.log("idsone", user.id, "chriempd", characterName);

        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify({ amount: selectedCredits * 100 }), // Stripe requires the amount in cents
          body: JSON.stringify({
            price,
            priceId,
            planId,
            interval,
            uid,
            email,
            characterName,
            characterId,
            type,
          }),
        });
        setLoading(false);

        const session = await response.json();
        if (stripe !== null) {
          const result = await stripe.redirectToCheckout({
            sessionId: session.session.id,
          });
          //console.log("result", result);
        }
      } else {
        console.log("make sure you are logged in!");
      }
    } catch (error) {
      console.log("error", error);
    }
    //}
  };

  const setMonthly = () => {
    setView(true);
    setSee(false);
    setSelectedBtn(0);
  };

  const setYearly = () => {
    setView(false);
    setSee(true);
    setSelectedBtn(1);
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
                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-center text-lg font-bold text-black sm:text-2xl"
                    onClick={userplan}
                  >
                    Discover the Perfect Plan for You! 🌟
                  </Dialog.Title>

                  <Dialog.Description className="mb-10 mt-2 text-center text-base text-gray-500">
                    Connect with your favorite creator in a whole new way.
                  </Dialog.Description>

                  <div className="my-3 flex justify-center p-3">
                    <button
                      onClick={setMonthly}
                      className="rounded border border-r-0 border-gray-300  px-10 py-3"
                      style={{
                        backgroundColor:
                          selectedBtn === 0 ? "#ffab2d" : "white",
                        color: selectedBtn === 0 ? "white" : "black",
                      }}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={setYearly}
                      className="rounded border border-l-0 border-gray-300 px-10 py-3 hover:text-white"
                      style={{
                        backgroundColor:
                          selectedBtn === 0 ? "white" : "#ffab2d",
                        color: selectedBtn === 0 ? "black" : "white",
                      }}
                    >
                      <div className="relative">
                        <div className="mono absolute -top-12 rounded bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 px-2 py-0.5 text-sm font-bold tracking-wider text-zinc-100">
                          Save 30%
                        </div>
                        Annual
                      </div>
                    </button>
                  </div>

                  <div className="text-orange-700">{message}</div>
                  {isLoading ? <p>Loading...</p> : null}
                  <div className="container mx-auto ">
                    <div>
                      {view ? (
                        <div className="flex flex-row flex-wrap justify-center gap-5">
                          {plans?.map((plan) =>
                            plan.interval === "month" ? (
                              <React.Fragment key={plan.id}>
                                <div
                                  className={`mt-12 flex -translate-y-3 cursor-pointer self-center px-3 transition duration-700 ease-in-out ${
                                    plan.name === "Engage"
                                      ? "relative max-w-sm rounded-lg border-8 border-orange-200 bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 shadow-lg"
                                      : "rounded-lg border bg-white"
                                  }`}
                                >
                                  {plan.name === "Engage" && (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="absolute -left-11 -top-11 h-20 w-20 fill-red-400"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                                          clip-rule="evenodd"
                                        ></path>
                                      </svg>
                                      <p className="mono absolute -top-4 rounded bg-red-400 px-2 py-0.5 text-sm font-bold tracking-wider text-zinc-100">
                                        POPULAR
                                      </p>
                                    </>
                                  )}
                                  <div className="rounded-lg shadow-sm">
                                    <div className="m-1 whitespace-nowrap rounded-md p-6 py-2 text-2xl font-medium shadow-sm focus:z-10 focus:outline-none focus:ring-opacity-50 sm:w-auto sm:px-3">
                                      <p>{plan.name}</p>
                                    </div>
                                    <div className="my-5 px-3">
                                      <p className="text-gray-500">
                                        {plan.description}
                                      </p>
                                    </div>
                                    <div className="my-5 mb-5 px-3">
                                      <span className="text-3xl font-bold">
                                        ${plan.price}
                                      </span>
                                      <span>/{plan.interval}</span>
                                    </div>

                                    <div className="px-3 py-2">
                                      <button
                                        //onClick={(e) => {checkSubscription(plan.id)}}
                                        onClick={(e) => {
                                          if (
                                            // plan.id === subscription[0]?.planId &&
                                            // character?.id === subscription[0]?.characterId
                                            // &&
                                            // plan.price === subscription[0]?.plan?.price
                                            subscription.length !== 0
                                          ) {
                                            handleManageClick(e);
                                          } else {
                                            handlePurchaseClick(
                                              e,
                                              plan.price,
                                              plan.priceId,
                                              plan.id,
                                              plan.interval
                                            );
                                          }
                                        }}
                                        className={`${
                                          plan.id === subscription[0]?.planId &&
                                          character?.id ===
                                            subscription[0]?.characterId &&
                                          plan.price ===
                                            subscription[0]?.plan?.price
                                            ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                                            : "bg-orange-400"
                                        } 
                                mt-4 w-64 rounded bg-blue-900 px-4 py-2 text-white`}
                                      >
                                        {
                                          // plan.id === subscription[0]?.planId &&
                                          // character?.id === subscription[0]?.characterId
                                          //  &&
                                          //  plan.price === subscription[0]?.plan?.price
                                          subscription.length !== 0
                                            ? "Manage"
                                            : "Subscribe"
                                        }
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : (
                              <></>
                            )
                          )}
                        </div>
                      ) : null}

                      {see ? (
                        <div className="flex flex-row flex-wrap gap-5">
                          {plans?.map((plan) =>
                            plan.interval === "year" ? (
                              <React.Fragment key={plan.id}>
                                <div
                                  className={`mt-12 flex -translate-y-3 cursor-pointer self-center px-3 transition duration-700 ease-in-out ${
                                    plan.name === "Engage"
                                      ? "relative max-w-sm rounded-lg border-8 border-orange-200 bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 shadow-lg"
                                      : "rounded-lg border bg-white"
                                  }`}
                                >
                                  {plan.name === "Engage" && (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="absolute -left-11 -top-11 h-20 w-20 fill-red-400"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                                          clip-rule="evenodd"
                                        ></path>
                                      </svg>
                                      <p className="mono absolute -top-4 rounded bg-red-400 px-2 py-0.5 text-sm font-bold tracking-wider text-zinc-100">
                                        POPULAR
                                      </p>
                                    </>
                                  )}
                                  <div className="rounded-lg shadow-sm">
                                    <div className="m-1 whitespace-nowrap rounded-md p-6 py-2 text-2xl font-medium shadow-sm focus:z-10  focus:outline-none focus:ring-opacity-50 sm:w-auto sm:px-3">
                                      <p>{plan.name}</p>
                                    </div>
                                    <div className="my-5 px-3">
                                      <p className="text-gray-500">
                                        {plan.description}
                                      </p>
                                    </div>
                                    <div className="my-5 mb-5 px-3">
                                      <span className="text-3xl font-bold">
                                        ${plan.price}
                                      </span>
                                      <span>/{plan.interval}</span>
                                    </div>
                                    <div className="px-3 py-2">
                                      <button
                                        onClick={(e) => {
                                          if (subscription.length !== 0) {
                                            handleManageClick(e);
                                          } else {
                                            handlePurchaseClick(
                                              e,
                                              plan.price,
                                              plan.priceId,
                                              plan.id,
                                              plan.interval
                                            );
                                          }
                                        }}
                                        className={`${
                                          plan.name ===
                                            subscription[0]?.plan?.name &&
                                          character?.id ===
                                            subscription[0]?.characterId &&
                                          plan.price ===
                                            subscription[0]?.plan?.price
                                            ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                                            : "bg-orange-400"
                                        } 
                                mt-4 w-64 rounded bg-blue-900 px-4 py-2 text-white`}
                                      >
                                        {subscription.length !== 0
                                          ? "Manage"
                                          : "Subscribe"}
                                      </button>
                                    </div>
                                  </div>
                                </div>{" "}
                              </React.Fragment>
                            ) : (
                              <></>
                            )
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
      {/* {" "} */}
    </Transition>
  );
};

SubscribeModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SubscribeModal;
