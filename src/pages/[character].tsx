/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import Head from "next/head";
import { useState, Fragment, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useWhisper } from "@chengsokdara/use-whisper";
import Link from "next/link";
import Header from "~/components/Header/Header";
import BuyCreditModal from "~/components/BuyCreditModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import ChatBox from "~/components/Characters/ChatBox";
import WelcomeModal from "../components/WelcomeModal";
import SubscribeModal from "~/components/SubscribeModal";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import analytics from "~/utils/analytics";
import AddMinuteModal from "~/components/AddMinuteModal";
import AuthModal from "~/components/helper/AuthModal";

export default function Chat(props) {
  const character = props.character;
  console.log(character, "char from char page");

  const plans = props.plans;
  const charinfo = props.charinfo;
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const [balance, setBalance] = useState(0);
  const [isstatus, setStatus] = useState();
  const [isactive, setActive] = useState(null);

  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const [showSubscriptionModal, setSubscriptionShowModal] = useState(false);
  const closeSubscriptionModal = () => setSubscriptionShowModal(false);
  const openSubscriptionModal = () => setSubscriptionShowModal(true);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const [subscribeModal, setSubscribeModal] = useState(false);
  const [addminuteModal, setAddMinModal] = useState(false);
  const closeSubscribeModal = () => setSubscribeModal(false);
  const openSubscribeModal = () => setSubscribeModal(true);
  const closeAddMinuteModal = () => setAddMinModal(false);
  const openAddMinuteModal = () => setAddMinModal(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Add these states to your component
  const [messageCount, setMessageCount] = useState(0);
  const [currentPlan, setCurrentPlan] = useState(null);

  // Fetch the user's current plan and message count when the component mounts
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/user', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userId: user.id }),
  //     });

  //     const userData = await response.json();

  //     setMessageCount(userData.messageCount);
  //     setCurrentPlan(userData.plan);
  //   }

  //   fetchData();
  // }, [user]);

  // Check if the user's message count has reached the limit of their current plan
  useEffect(() => {
    if (currentPlan && messageCount >= currentPlan.voiceMessageLimit) {
      setSubscribeModal(true);
    }
  }, [messageCount, currentPlan]);
  // useEffect(() => {
  //   if (!session) {
  //     // Wait for 2 seconds before redirecting
  //     setTimeout(() => {
  //       router.push('/');
  //     }, 10000);
  //   }
  // }, [session, router]);

  const signInWithGoogle = () => {
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
      // callback: (user) => {
      //   console.log("Signed in with Google"); // Log when the callback function is called
      //   // Track the "Fan Registered" event
      //   analytics
      //     .track("Fan_Registered", {
      //       character: character?.name,
      //     })
      //     .catch((error) => {
      //       console.error("Failed to track event:", error); // Log if the analytics.track call fails
      //     });
      // },
    });
    analytics.identify(user?.id, {
      email: user?.email,
    });
    analytics
      .track("Fan_Registered", {
        character: character?.name,
      })
      .catch((error) => {
        console.error("Failed to track event:", error); // Log if the analytics.track call fails
      });
  };

  useEffect(() => {
    // Check if the welcome modal has been shown for this character
    const hasShownWelcomeModal = localStorage.getItem(
      `hasShownWelcomeModal-${character?.name}`
    );

    if (!hasShownWelcomeModal) {
      // If the welcome modal has not been shown, show it and set the flag in local storage
      setShowWelcomeModal(true);
      localStorage.setItem(`hasShownWelcomeModal-${character?.name}`, "true");
    }
  }, [character?.name]);

  useEffect(() => {
    analytics.identify(user?.id, {
      email: user?.email,
    });
    analytics.track("Character_Viewed", {
      character: character?.name,
      userId: session?.user?.id,
    });
  }, [character]);

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: "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", // YOUR_OPEN_AI_TOKEN
  });

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error) {
      console.error("An error occurred while starting the recording:", error);
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopRecording();
    } catch (error) {
      console.error("An error occurred while stopping the recording:", error);
    }
  };

  const handlePauseRecording = async () => {
    try {
      await pauseRecording();
      setInputText(transcript);
    } catch (error) {
      console.error("An error occurred while pausing the recording:", error);
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
      await checkSubscription();
    }
  };

  const checkSubscription = async () => {
    try {
      if (user) {
        let userId = user.id.toString();
        const response = await axios.post("/api/subscriptionCheck", {
          userId: userId,
          characterId: character?.id,
        });

        let value = response.data;
        if (value !== null) {
          for (let i in value) {
            setActive(value[i].status);
            const now = new Date();
            let endDate = value[i].endAt;
            const date1 = new Date(endDate).getTime();
            const date2 = new Date(now).getTime();
            if (date1 > date2) {
              const act = await axios.post("/api/updateSubscription", {
                userId: userId,
                characterId: character?.id,
                planId: value[i].planId,
                status: "active",
              });
            } else {
              const exp = await axios.post("/api/updateSubscription", {
                userId: uid,
                characterId: character?.id,
                planId: value[i].planId,
                status: "expired",
              });
            }
          }
        }
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchChat = async () => {
    if (user) {
      const iduser = user?.id;
      const userId = iduser.toString();
      const chats = await axios.get(
        `/api/fetchHistory?userId=${userId}&characterId=${character?.id}`
      );
      //console.log("lengthchange", chats.data?.length, isstatus)
      if (chats.data !== null) {
        setChatHistory(chats.data);
        //await isSubscriptionActive();
        if (chats.data?.length === 8 && isstatus === 0) {
          openSubscriptionModal();
        } else if (isstatus !== 0) {
          closeSubscriptionModal();
        } else if (isstatus === 0 && chats.data?.length > 8) {
          openSubscriptionModal();
        }
      } else {
        closeSubscriptionModal();
      }
      return chats.data;
    }
  };

  async function decrementCredit() {
    if (user) {
      const users = await axios.post(
        `/api/updatecredit?userId=${user.id}&characterId=${character?.id}`
      );
      setBalance(users.data.balance);
    }
  }

  return (
    <>
      <Head>
        <title>{`Chat with ${character?.name}`}</title>
      </Head>
      <Header openModal={openModal} />
      <div className="flex h-screen text-gray-800 antialiased">
        <div className="flex h-full w-full flex-row overflow-x-hidden">
          <div className="sidebar flex hidden w-72 flex-shrink-0 flex-col bg-white py-8 pl-6 pr-2 md:block">
            <Link
              href={"/"}
              className="flex h-12 w-full flex-row items-center justify-center"
            >
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div> */}
              {/* <div className="ml-2 text-2xl font-bold">Inchy</div> */}
              {/* <Image src="/logo.svg" height="100" width="200"></Image> */}
            </Link>
            <div className="relative mt-4 flex w-full max-w-sm flex-col items-center rounded-lg border border-gray-200 bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 px-4 py-6 shadow-lg sm:border-none">
              <div className="flex">
                {/* <div>
                  {view? 
                  <AutorenewIcon size={1} className="cursor-pointer transition duration-75 hover:text-gray-500" onClick={fetchCredit}/>    
                 : <LoopIcon  className="cursor-pointer"/> }
                </div> */}

                <div className="-mt-1 text-sm font-semibold"></div>
              </div>
              <div className="mt-2 text-sm font-semibold">
                {character?.name}
              </div>
              {user?.image ? (
                <>
                  <div className="h-60 w-40 overflow-hidden rounded-md border">
                    <img
                      src={character?.image}
                      alt={user?.name || "Avatar"}
                      layout="fill"
                      className="  w-full rounded-md"
                    />
                  </div>

                  <div></div>
                  {/* <button
                    type="button"
                    className=" rounded-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={props.openModal}
                  >
                    Log Out
                  </button> */}

                  <div className="ChatBotList mb-5 flex flex-col items-center">
                    {/* <div className="flex items-center p-4 md:pt-10 w-full">
    <h2 className="flex-grow text-[20px] leading-[30px] font-[400] flex items-center">
      Chat
    </h2>
  </div> */}
                  </div>

                  <div
                    id="chat_list"
                    className="w-[90%] flex-grow overflow-y-auto  px-4"
                  >
                    <ul className="BotList m-0 p-0">
                      <hr
                        aria-orientation="horizontal"
                        className="chakra-divider css-1gev3sr"
                      />

                      {charinfo.map((chatCharacter) => (
                        <li
                          key={chatCharacter.id}
                          className={`false mb-2 h-[76px] cursor-pointer rounded-xl bg-[#FFF] hover:bg-[#ccc] ${
                            chatCharacter.id === character.id ? "bg-[#ccc]" : ""
                          }`}
                        >
                          <Link
                            className="relative flex h-full w-full items-center justify-between px-3 text-white"
                            href={`/${chatCharacter.name}`}
                            target="_blank"
                          >
                            <div className="flex w-full items-center space-x-4">
                              <div className="relative">
                                <span
                                  className="chakra-avatar css-10f51bz overflow-hidden rounded-3xl bg-[#a0aec0]"
                                  data-loaded=""
                                >
                                  <img
                                    // width={76}
                                    // height={56}
                                    src={chatCharacter.image}
                                    className="chakra-avatar__img  h-10 w-10 overflow-hidden rounded-full border"
                                  />
                                </span>
                                <div className="w-[10px] shrink-0" />
                              </div>
                              <div className="css-1cjuxfl flex grow flex-col space-y-1.5 text-left">
                                <div className="flex items-center justify-between space-x-2">
                                  <span className="false flex items-center space-x-[4px] overflow-hidden text-[16px] font-bold text-[#202223]">
                                    <p className="chakra-text css-0 line-clamp-1 break-all">
                                      {chatCharacter.name}
                                    </p>
                                    <div className="css-ozv6cb">
                                      <span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          className="h-[16px] w-[16px] fill-[#3E5CFA]"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                  </span>
                                  <span className="false inline-flex flex-shrink-0 space-x-[16px] text-xs leading-[14px] text-[#6D7175]" />
                                </div>
                                <span className="false relative flex max-h-[28px] truncate text-sm leading-[16px] text-[#6D7175]">
                                  <p className="chakra-text css-0 flex-grow truncate" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <button
                    disabled={disabled}
                    onClick={() => signInWithGoogle()}
                    className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border bg-[#yourBackgroundColor] p-2 text-[#yourTextColor] transition-colors hover:border-[#yourHoverBorderColor] hover:bg-[#yourHoverBackgroundColor] hover:text-[#yourHoverTextColor] focus:outline-none focus:ring-4 focus:ring-[#yourFocusRingColor] focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#yourDisabledHoverBorderColor] disabled:hover:bg-transparent disabled:hover:text-[#yourDisabledHoverTextColor]"
                  >
                    <FcGoogle />
                    <span>Continue with Google</span>
                  </button>
                </>
              )}
            </div>
            {/* <div className="flex justify-center my-4">
              <h1>
                {minutes < 10 ? "0" + minutes : minutes} :<span></span>{" "}
                {seconds < 10 ? "0" + seconds : seconds}
              </h1>
            </div>      */}
            <div className="mt-8 flex flex-col">
              {/* <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
                  4
                </span>
              </div> */}
              <div className="-mx-2 mt-4 flex h-48 flex-col space-y-1 overflow-y-auto">
                {/* <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200">
                    <img
                      src={character?.image}
                      className="h-10 w-10 rounded-full "
                    />
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {character?.name}
                  </div>
                </button>
                <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    M
                  </div>
                  <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
                  <div className="ml-auto flex h-4 w-4 items-center justify-center rounded bg-red-500 text-xs leading-none text-white">
                    2
                  </div>
                </button> */}
              </div>
              {/* <div className="mt-6 flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Archivied</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
                  7
                </span>
              </div> */}
              {/* <div className="-mx-2 mt-4 flex flex-col space-y-1">
                <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                </button>
              </div> */}

              {/* <button
                className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground false inline-flex h-10 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:Rjj7ijda:"
                data-state="closed"
                onClick={openAddMinuteModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="mr-2 h-4 w-4 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Add Minute
              </button> */}
            </div>
          </div>

          <div className="flex h-full flex-auto flex-col p-6">
            <ChatBox
              isSubscriptionActive={isSubscriptionActive}
              fetchChat={fetchChat}
              character={character}
            />
          </div>
        </div>
      </div>
      {/* <AddMinuteModal character={character} show={addminuteModal} onClose={closeAddMinuteModal}/> */}
      <SubscribeModal
        plans={plans}
        character={character}
        show={showSubscriptionModal}
        onClose={closeSubscriptionModal}
      />
      <AuthModal show={showModal} onClose={closeModal} />
      {/* <BuyCreditModal
        plans={plans}
        balance={balance}
        character={character}
        show={showModal}
        onClose={closeModal}
      /> */}
      <WelcomeModal
        show={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        characterName={character?.name}
        characterImage={character?.image}
        voiceId={character?.voiceid}
      />
    </>
  );
}
import { prisma } from "~/lib/prisma";
// import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const currentCharacter = context.params.character;

  // if (!session) {
  //   return {
  //     props: {
  //       charinfo: [],
  //       character: null,
  //       plans: [],
  //     },
  //   };
  // }

  const chatHistory = session
    ? await prisma.characterChat.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          characterId: true,
        },
      })
    : [];

  const charinfo = session
    ? await prisma.character.findMany({
        where: {
          id: {
            in: chatHistory.map((chat) => chat.characterId),
          },
        },
      })
    : [];

  const characterData = await prisma.character.findFirst({
    where: {
      name: currentCharacter,
    },
  });
  console.log("Fetched character data:", characterData);

  const plans = await prisma.plan.findMany();

  return {
    props: {
      charinfo: JSON.parse(JSON.stringify(charinfo)),
      character: JSON.parse(JSON.stringify(characterData)),
      plans: JSON.parse(JSON.stringify(plans)),
    },
  };
}
