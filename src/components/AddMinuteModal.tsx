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

const AddMinuteModal = (props: any) => {
  const character = props.character;
  const show = props.show;
  const onClose = props.onClose;
  const balance = props.balance;
  const { data: session } = useSession();
  // const user = session?.user?.email;
  const user = session?.user;

  const [selectedCredits, setSelectedCredits] = useState(10); // Default selected credits  { show = false, onClose = () => null }
  const [userId, setId] = useState("");
   //console.log("balance", balance); 
   //, { show = false, onClose = () => null }

  const creditOptions = [
    { id: 1, label: "$10", value: 10,  text: 'for an extra 10 minutes' },
    { id: 2, label: "$25", value: 25, text: 'for an extra 25 minutes' },
    { id: 3, label: "$50", value: 50, text: 'for an extra 50 minutes' },
  ];

  const handleCreditSelect = (value:any) => {
    setSelectedCredits(value);
  };

  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [isLoading, setLoading] = useState();

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handlePurchase = async () => {    
    setLoading(true);
    const stripe = await stripePromise;
    const lineItems = creditOptions.filter((price) => {
      if (price.value === selectedCredits) {
        return price;
      }
    });
    try {
      if (user) {
        const iduser = user.id;
        const uid = iduser.toString();
        const email = user?.email;
        const type = "minute"
        const price = selectedCredits;
        const characterName = character?.name;
        const characterId = character?.id;
        //console.log("turn these off", lineItems,price, uid, email, characterName, type)
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lineItems, price, uid, email, characterId, characterName, type})
        });
        setLoading(false);
        const session = await response.json();
        if (stripe !== null) {
          const result = await stripe.redirectToCheckout({
            sessionId: session.session.id,
          });
        }
          
      } else {
        console.log("make sure you are logged in!")
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  
  const setMonthly = () =>{
    // setView(true);
    // setSee(false);
    setSelectedBtn(0);
}

const setYearly = () =>{
    // setView(false);
    // setSee(true);
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
                  >
                    Oops! 🕰 Time's Up...But the Conversation Isn't!
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 mb-10 text-center text-base text-gray-500">
                    
                  Looks like you've used up all your voice minutes. But don't worry, full eperience doesn't have to end here!
                  </Dialog.Description>

                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-center text-lg font-bold text-black sm:text-2xl"
                  >
                    Boost Your Voice Time Now!
                  </Dialog.Title>

                  <div className="flex p-3 my-3 justify-center gap-6">
                      <button 
                      onClick={setMonthly}     
                      className="border border-r-0 border-gray-300 rounded  px-10 py-3"
                      style={{ backgroundColor: selectedBtn === 0 ? '#e28b49' : 'white',
                      color: selectedBtn === 0 ? 'white' : 'black' }}
                      >                        
                        Later
                      </button>
                      <button
                       onClick={setYearly}
                       className="px-10 py-3 hover:text-white border border-l-0 border-gray-300 rounded"
                       style={{ backgroundColor: selectedBtn === 0 ? 'white' : '#e28b49',
                        color: selectedBtn === 0 ? 'black' : 'white' }}
                       >
                        Get More Minutes
                      </button>
                  </div> 
                  {isLoading?<p className="mb-10">Loading...</p>:null}
                  <div className="container mx-auto p-4 flex flex-col justify-center">
                    <div className="flex space-x-4">
                      {creditOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`rounded border p-4 ${
                            selectedCredits === option.value
                              ? "bg-gradient-to-tr from-orange-300 via-orange-100 to-purple-100"
                              : "bg-white"
                          }`}
                          onClick={() => handleCreditSelect(option.value)}
                        >
                         
                          <p className="text-5xl font-bold mb-4">{option.label}</p>
                          <p className="text-black hover:text-black">{option.text}</p>
                        </button>
                      ))}
                    </div>
                    <button
                      className="mt-12 rounded bg-orange-400 px-4 py-2 text-white"
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

AddMinuteModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddMinuteModal;
