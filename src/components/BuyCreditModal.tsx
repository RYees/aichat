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


const BuyCreditModal = (props: any) => {
    const router = useRouter();
    const character = props.character;
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
    
    const userplan = async() => {
      if(character?.id !== undefined && user?.id !== undefined){
      const response = await axios.post(`/api/fetchsinglePlan`, {
        userId: user?.id,
        characterId: character?.id
      })

      setPlan(response.data);
      if(response.data !== null){
        setPlan(response.data);
      }
    }
    }
    if(subscription !== 0){      
    }

    // useEffect(()=>{
    //    const timer = setTimeout(() => {
    //     return userplan();
    //   }, 3000);
    //   return () => clearTimeout(timer);
    // },[userplan]);

    const handleManageClick = (e) => {
      //sessionStorage.setItem('subscription', JSON.stringify(subscription))
      router.push({
        pathname: '/account',
        query: {
          subscription: JSON.stringify(subscription)
        }
      })
    }

  
    const [selectedCredits, setSelectedCredits] = useState(100); // Default selected credits  { show = false, onClose = () => null }
  
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

    const handlePurchaseClick = async (e, priceId, planId, interval) => {
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
            const iduser = user.id;
            const userId = iduser.toString();        
            let email = user.email;
            let characterName = character.name;
            let characterId = character.id;
            const type = "subscription"
            //console.log("idsone", user.id, "chriempd", priceId);
            
            const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            //body: JSON.stringify({ amount: selectedCredits * 100 }), // Stripe requires the amount in cents
            body: JSON.stringify({ priceId, planId, interval, userId, email, characterName, characterId, type})
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
            console.log("make sure you are logged in!")
          }
        } catch (error) {
          console.log("error", error);
        }
      //}
    };
  
    const setMonthly = () =>{
        setView(true);
        setSee(false);
        setSelectedBtn(0);
    }
  
    const setYearly = () =>{
        setView(false);
        setSee(true);
        setSelectedBtn(1);
    }
  
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

                  <Dialog.Description className="mt-2 mb-10 text-center text-base text-gray-500">
                    
                  Connect with your favorite creator in a whole new way.
                  </Dialog.Description>
                 
                  <div className="flex p-3 my-3 justify-center">
                      <button 
                      onClick={setMonthly}     
                      className="border border-r-0 border-gray-300 rounded  px-10 py-3"
                      style={{ backgroundColor: selectedBtn === 0 ? 'rgb(30 58 138)' : 'white',
                      color: selectedBtn === 0 ? 'white' : 'black' }}
                      >                        
                        Monthly
                      </button>
                      <button
                       onClick={setYearly}
                       className="px-10 py-3 hover:text-white border border-l-0 border-gray-300 rounded"
                       style={{ backgroundColor: selectedBtn === 0 ? 'white' : 'rgb(30 58 138)',
                        color: selectedBtn === 0 ? 'black' : 'white' }}
                       >
                        Annual
                      </button>
                  </div> 

                  <div className="text-blue-700">
                      {message}
                  </div>
                        {isLoading?<p>Loading...</p>:null}
                  <div className="container mx-auto ">                       
                  <div> 
                  {view?
                  <div className="flex flex-row flex-wrap gap-5">
                    {plans?.map((plan)=> plan.interval === "month" ? (
                        <React.Fragment key={plan.id}>
                          
                        <div
                           className="px-3 flex self-center mt-12 border rounded-lg cursor-pointer transition duration-700 ease-in-out hover:-translate-y-3 bg-white">   

                            <div className="rounded-lg shadow-sm">                            
                              <div className="p-6 py-2 m-1 text-2xl font-medium rounded-md shadow-sm whitespace-nowrap focus:outline-none focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-3">
                                <p>{plan.name}</p> 
                              </div>
                              <div className="px-3 my-5">
                                <p className="text-gray-500">{plan.description}</p>                          
                              </div>
                              <div className="px-3 my-5 mb-5">
                                <span className="font-bold text-3xl">${plan.price}</span><span>/{plan.interval}</span>
                              </div>
                                                        
                              <div className="px-3 py-2">
                                <button 
                                //onClick={(e) => {checkSubscription(plan.id)}}
                                onClick={(e)=> {
                                    if(
                                      // plan.id === subscription[0]?.planId && 
                                      // character?.id === subscription[0]?.characterId 
                                      // &&
                                      // plan.price === subscription[0]?.plan?.price
                                      subscription.length !==0
                                      ) {
                                      handleManageClick(e);
                                    } else {
                                      handlePurchaseClick(
                                        e, 
                                        plan.priceId,
                                        plan.id, 
                                        plan.interval
                                      );
                                    }  
                                }}
                                className={`${
                                  plan.id === subscription[0]?.planId && 
                                  character?.id === subscription[0]?.characterId
                                  &&
                                  plan.price === subscription[0]?.plan?.price
                                ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500'
                                : 'bg-blue-900'
                                } 
                                mt-4 rounded bg-blue-900 px-4 w-64 py-2 text-white`}>
                                   {
                                  // plan.id === subscription[0]?.planId && 
                                  // character?.id === subscription[0]?.characterId
                                  //  &&
                                  //  plan.price === subscription[0]?.plan?.price 
                                  subscription.length !==0
                                   ?
                                          'Manage'
                                        : 'Subscribe'
                                }
                                   
                                </button>
                              </div>
                            </div>
                           
                        </div>
                        </React.Fragment> ): (<></>)
                          
                          )}
                      </div>
                      :null}


                    {see?
                    <div className="flex flex-row flex-wrap gap-5">
                      {plans?.map((plan)=> plan.interval === "year" ? (
                        <React.Fragment key={plan.id}>
                        <div className="px-3 flex self-center mt-12 border rounded-lg cursor-pointer transition duration-700 ease-in-out hover:-translate-y-3 bg-white border-blue-900">
                            <div className="rounded-lg shadow-sm">
                              <div className="p-6 py-2 m-1 text-2xl font-medium rounded-md shadow-sm whitespace-nowrap focus:outline-none  focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-3">
                                <p>{plan.name}</p> 
                              </div>
                              <div className="px-3 my-5">
                                <p className="text-gray-500">{plan.description}</p>                          
                              </div>
                              <div className="px-3 my-5 mb-5">
                                <span className="font-bold text-3xl">${plan.price}</span><span>/{plan.interval}</span>
                              </div>
                              <div className="px-3 py-2">
                                <button 
                                onClick={(e)=> {
                                    if(subscription.length !==0) {
                                      handleManageClick(e);
                                    } else {
                                      handlePurchaseClick(
                                        e, 
                                        plan.priceId,
                                        plan.id, 
                                        plan.interval
                                      );
                                    }                            
                                }}
                                className={`${
                                  plan.name === subscription[0]?.plan?.name &&
                                  character?.id === subscription[0]?.characterId &&
                                  plan.price === subscription[0]?.plan?.price
                                ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500'
                                : 'bg-blue-900'
                                } 
                                mt-4 rounded bg-blue-900 px-4 w-64 py-2 text-white`}>
                                   {
                                   subscription.length !==0 ?
                                          'Manage'
                                        : 'Subscribe'
                                  }
                                </button>
                              </div>
                            </div>
                                                                           
                        </div> </React.Fragment> ): (<></>)                              
                        )}
                    </div>:null}
                    
                    </div>
         
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
