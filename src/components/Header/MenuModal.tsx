//@ts-nocheck
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SubscribeModal from "../SubscribeModal";
import Image from "next/image";
import favicon from "../../../public/favicon.png";
import AddMinuteModal from "../AddMinuteModal";
import { signOut } from "next-auth/react";
//import { signOut } from "next-auth/react";

interface MenuModalProps {
  character: any; // Replace 'any' with the actual type of 'character'
  plan: any; // Replace 'any' with the actual type of 'plan'
}

export default function MenuModal({ character, plan }: MenuModalProps) {
  // console.log(character, plan)
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showAddMinuteModal, setShowAddMinuteModal] = useState(false);

  // const signOutFromGoogle = () => {
  //   signOut("google", {
  //     callbackUrl: window.location.href,
  //   });
  //   router.push("/");
  // };

  const changeRoute = () => {
    router.push("/account");
  };

  useEffect(() => {
    console.log("MenuModal rendered with character:", character);
  }, [character]);

  return (
    <div className="fixed z-10 w-56">
      <Menu as="div" className="relative z-10 inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {user?.image !== null ? (
              <img
                src={user?.image}
                alt={user?.name || "Avatar"}
                className=" h-10 w-10 rounded-full"
                about="1"
              />
            ) : null}
            {/* <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={changeRoute}
                  className={`${
                    active
                      ? "bg-black bg-opacity-30 text-black"
                      : "text-gray-800"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  Account
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setShowSubscribeModal(true)}
                  className={`${
                    active
                      ? "bg-black bg-opacity-30 text-black"
                      : "text-gray-800"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  Subscription
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setShowAddMinuteModal(true)}
                  className={`${
                    active
                      ? "bg-black bg-opacity-30 text-black"
                      : "text-gray-800"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Buy More Minutes
                </button>
              )}
            </Menu.Item>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active
                        ? "bg-black bg-opacity-30 text-black"
                        : "text-gray-800"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <SubscribeModal
        plans={plan}
        character={character}
        show={showSubscribeModal}
        onClose={() => setShowSubscribeModal(false)}
      />
      <AddMinuteModal
        show={showAddMinuteModal}
        onClose={() => setShowAddMinuteModal(false)}
      />
    </div>
  );
}

function DuplicateInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}
