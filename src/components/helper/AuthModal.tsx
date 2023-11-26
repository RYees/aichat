/* eslint-disable @typescript-eslint/no-floating-promises */
import { Fragment, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

import { toast } from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";
import analytics from "~/utils/analytics";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
const AuthModal = ({ show = false, onClose = () => null }) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const signInWithGoogle = async () => {
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
    });
    // Get the user's session to access their email
    const session = await getSession();
    const userEmail = session?.user?.email;

    if (userEmail) {
      // User has successfully signed in
      // Send registered event to Customer.io
      analytics.identify(user?.id, {
        email: user?.email,
      });
      analytics.track("registered", {
        email: userEmail,
        time: new Date().toISOString(),
        flow: "fan",
      });
    }
    
    analytics.identify(user?.id, {
      email: user?.email,
    });
    analytics.track("Logged_In", {
      // item: "pink socks",
      // price: 20,
      flow: "fan",
    });
  };

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
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
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
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
            <div className="relative my-8 inline-block w-full max-w-md transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={closeModal}
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                {/* <XIcon className="w-5 h-5" /> */}
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <Dialog.Title
                    as="h3"
                    className="mt-6 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent  sm:text-2xl"
                  >
                    {showSignIn
                      ? "Welcome back!"
                      : "Create your account or login"}
                  </Dialog.Title>

                  {!showSignIn ? (
                    <Dialog.Description className="mt-2 text-center text-base text-gray-500">
                      {/* Please create an account to list your homes and bookmark
                      your favorite ones. */}
                    </Dialog.Description>
                  ) : null}

                  <div className="mt-10">
                    {/* Sign with Google */}
                    <button
                      disabled={disabled}
                      onClick={() => signInWithGoogle()}
                      className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-700 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                    >
                      <FcGoogle />
                      <span>
                        {/* Sign */}
                        {/* {showSignIn ? "in" : "up"}  */}
                        Continue with Google
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

AuthModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AuthModal;
