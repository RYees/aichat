//@ts-nocheck
import React, { useInsertionEffect } from "react";
import Head from "next/head";
import { useState, Fragment, useEffect, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import { BsMicMuteFill, BsMicFill } from "react-icons/bs";

import { useRouter } from "next/router";
import { useWhisper } from "@chengsokdara/use-whisper";
import TypingIndicator from "../typing";
import axios from "axios";
import { useStore } from "~/store/store";
import Load from "../Load";
import * as math from "mathjs";
import Math from "mathjs";
import Loading from "../Loading";
import toast, { Toaster } from "react-hot-toast";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ChatMenu from "../Chat/ChatMenu";

const ChatBox = (props: any) => {
  const router = useRouter();

  const [chats, setChatHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { saveChat } = useStore();
  const [isChatLoading, setIsChatLoading] = useState(false);
  //setChatHistory(props.chatHistory)
  let character = props.character;
  let fetchChat = props.fetchChat;
  let isSubscriptionActive = props.isSubscriptionActive;
  const lastChatMessageRef = useRef(null);

  const [showSeen, setShowSeen] = useState(false);

  useEffect(() => {
    if (lastChatMessageRef.current) {
      lastChatMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  // below to detect chars new message

  useEffect(() => {
    const chatBox = document.getElementById("chatBox"); // Replace with the actual ID of your chat box

    if (chatBox) {
      const observer = new MutationObserver(() => {
        const lastMessage = chatBox.lastChild;

        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: "smooth" });
        }
      });

      observer.observe(chatBox, { childList: true });

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSeen(true);
    }, 2000); // Change this value to adjust the delay

    return () => clearTimeout(timer);
  }, [chats]);

  const call = async () => {
    if (
      !session ||
      JSON.stringify(chats) === JSON.stringify(await fetchChat())
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetchChat();
      if (response) {
        setLoading(false);
        // Check if the last message is from the bot
        if (chats[chats.length - 1]?.sender !== "bot") {
          setChatHistory(response);
        }
      }
      await isSubscriptionActive();
    } catch (error) {
      console.error("An error occurred while fetching chat:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      return call();
    }, 5000);

    return () => clearTimeout(timer);
  }, [call]);

  const MAX_INT = Number.MAX_SAFE_INTEGER;
  const invokeRandom = () => {
    //let random = math.floor(math.random() * MAX_INT) + 1 ;
    let random = 4;
    //setRandom(random);
    return random;
  };

  const [loadingStates, setLoadingStates] = useState(false);
  const [inputText, setInputText] = useState("");
  //const [chatHistory, setChatHistory] = useState([]);
  //const [chatsdata, setChat] = useState([]);
  const [audioDataUrl, setaudioDataUrl] = useState();
  const [behavior, setbehavior] = useState(character?.personality);
  const [context, setContext] = useState({});
  const [isRecording, setIsRecording] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

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
      // Use the transcript directly from the stopRecording function
      const finalTranscript = transcript;
      setInputText(JSON.stringify(finalTranscript));
    } catch (error) {
      console.error("An error occurred while stopping the recording:", error);
    }
  };

  const handlePauseRecording = async () => {
    try {
      await pauseRecording();
      setInputText(JSON.parse(JSON.stringify(transcript)));
    } catch (error) {
      console.error("An error occurred while pausing the recording:", error);
    }
  };

  // useEffect(() => {
  //   setInputText(JSON.parse(JSON.stringify(transcript)));
  // }, [transcript]);

  // (((((((((((())))))))))))
  async function handleChatInput() {
    const input = inputText;
    const data = { sender: "user", text: input, userId: session?.user?.id };
    const chat = {
      sender: "user",
      text: input,
      userId: session?.user?.id,
      characterId: character?.id,
    };
    if (input !== "") {
      // Immediately add the user's message to the chat history
      setChatHistory((prevChats) => [...prevChats, data]);
      // Clear the input
      setInputText("");
      setIsChatLoading(true);
      // Concatenate the chat history with the character's description
      // Concatenate the chat history with the character's description
      const latestChats =
        chats.length > 5 ? chats.slice(chats.length - 5) : chats;
      const chatHistory = latestChats
        .map((chat) => `${chat.sender}: ${chat.text}`)
        .join(", ");
      setContext(
        `${character?.description}, My hobby is ${character?.hobby} and I have experience in ${character?.story} I hate talking about ${character?.topic} and finally this ${character?.emoji} emoji symbols represent me best. Chat history: ${chatHistory}`
      );
      chatWithOpenai(input);
      setInputText("");
      const value = await saveChat(chat);
    }
  }

  async function chatWithOpenai(text: string) {
    setIsChatLoading(true);
    setLoadingStates(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: text,
        context: JSON.stringify(context),
        behavior: JSON.stringify(behavior),
        char: props.character.name, // Replace with the actual character name
        user: session?.user?.name,
      }),
    };

    const apiUrl = "/api/chat";
    try {
      const response = await fetch(apiUrl, requestOptions).then((res) =>
        res.json()
      );
      console.log(response); // Log the response
      await processChatResponse(response);
    } catch (err) {
      console.log("error", err);
    } finally {
      setIsChatLoading(false);
    }
  }

  async function processChatResponse(response) {
    if (!response || !response.answer || !response.answer.text) {
      throw new Error("Invalid response from the server");
    }

    const txt = response.answer.text;
    const VoiceId = character?.voiceid;
    const body = { text: txt, voice_id: VoiceId };

    // Check the length of the response text
    const isVoiceMessage = txt.length > 200 && txt.length < 350;
    console.log(txt.length);

    let output;
    if (isVoiceMessage) {
      const result = await axios.post("/api/convertToSpeech", body);
      console.log(result);
      output = result.data.audio;
      setaudioDataUrl(output);

      const audio = new Audio();
      audio.src = output; // Replace with the URL of your audio file

      audio.addEventListener("loadedmetadata", function () {
        const duration = audio.duration;
        // Save duration to the database
        saveDurationToDatabase(duration);
      });
    }

    // Add a typing indicator to the chat history
    const typingIndicator = {
      sender: "bot",
      text: "Typing...",
      userId: session?.user?.id,
      isLoading: true, // Add a loading state to the chat message
    };
    setChatHistory((prevChats) => [...prevChats, typingIndicator]);

    // Wait for a while to simulate typing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Replace the typing indicator with the bot's response
    const data = {
      sender: "bot",
      text: response.answer.text,
      userId: session?.user?.id,
      isLoading: false, // Remove the loading state from the chat message
      voiceMessage: isVoiceMessage ? output : null, // Add the voice message URL
    };
    console.log(output);
    const chat = {
      sender: "bot",
      text: response.answer.text,
      answeraudio: isVoiceMessage ? output : null,
      userId: session?.user?.id,
      characterId: character?.id,
    };

    await saveChat(chat);
    setChatHistory((prevChats) => {
      return prevChats.map((chat) => {
        if (chat.isLoading) {
          // Replace the typing indicator with the bot's response
          return data;
        } else {
          // Keep the existing chat message

          return chat;
        }
      });
    });
    setLoadingStates(false)
  }

  function sendChat(data: any) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    };
    fetch("/api/chat", requestOptions);
  }

  const handler = (event: any) => {
    if (!session) {
      // Show a toast message
      toast.error("You need to login to send a message.");

      // Add a pink border to the login card
      // const loginCard = document.getElementById('loginCard');
      // loginCard.style.borderColor = 'pink';

      // Remove the pink border after 1 second
      // setTimeout(() => {
      //   loginCard.style.borderColor = '';
      // }, 1000);

      return;
    }
    setLoadingStates(true);
    handleChatInput();
    setInputText(""); // Clear the input
    if (event.keyCode === 13) {
      setLoadingStates(true);
      handleChatInput();
      setInputText(""); // Clear the input
    }
  };

  async function saveDurationToDatabase(duration) {
    const response = await fetch("/api/credit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ duration, userId: user.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to save duration and update credit");
    }
  }

  return (
    <>
      {/* {isLoading?<Loading/>:null} */}

      <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
        <div className="mb-4 flex h-full flex-col md:overflow-x-auto overflow-hidden">
          <div className="flex h-full flex-col">
            <div className="" id="chatBox">
              <div className="col-start-1 col-end-8 rounded-lg p-3">
                <div className="flex flex-row items-center">
                  <img
                    src={character?.image}
                    className="h-10 w-10 rounded-full "
                  />
                  <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
                    <div>{character?.description} </div>
                  </div>
                </div>
              </div>

              <div className="">{loadingStates ? <Load /> : null}</div>
              {chats?.map((chat: any, index: any) =>
                chat.sender === "user" ? (
                  <>
                    <React.Fragment key={chat.id}>
                      <div
                        ref={
                          index === chats.length - 1 ? lastChatMessageRef : null
                        }
                        className="col-start-6 col-end-13 rounded-lg p-3"
                      >
                        <div className="flex flex-row-reverse items-center justify-start">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
                            {user?.image !== null ? (
                              <img
                                src={user?.image}
                                alt={user?.name || "Avatar"}
                                className=" h-10 w-10 rounded-full"
                                about="1"
                              />
                            ) : (
                              user?.name?.charAt(0)
                            )}
                          </div>
                          <div className="relative mr-3 rounded-xl bg-[#F9F6FD] px-4 py-2 text-sm shadow">
                            {!chat.text ? (
                              <div>
                                <p>loading....</p>
                              </div>
                            ) : (
                              <div>{chat.text}</div>
                            )}
                            <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
                              {showSeen ? "Seen" : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </>
                ) : (
                  <>
                    <React.Fragment key={chat.id}>
                      <div className="col-start-1 col-end-8 rounded-lg p-3">
                        <div className="relative mr-10 flex flex w-4/5 flex-row items-center sm:mr-0">
                          <img
                            src={character?.image}
                            className="h-10 w-10 rounded-full "
                          />
                          <div className="relative ml-3 flex items-center rounded-xl bg-white px-4 py-2 text-sm shadow">
                            {chat.isLoading ? (
                              <TypingIndicator isLoading={chat.isLoading} />
                            ) : (
                              <>
                                {chat.voiceMessage &&
                                chat.voiceMessage !== "null" ? (
                                  <AudioPlayer
                                    autoPlay
                                    src={chat.voiceMessage}
                                    onPlay={(e) => console.log("onPlay")}
                                    style={{ boxShadow: "none" }}
                                  />
                                ) : //   <audio controls>
                                //     <source src={chat.voiceMessage} type="audio/mpeg" />
                                //     Your browser does not support the audio element.
                                // </audio>

                                chat.answeraudio &&
                                  chat.answeraudio !== "null" ? (
                                  // <audio controls>
                                  //   <source src={chat.answeraudio} type="audio/mpeg" />
                                  //   Your browser does not support the audio element.
                                  // </audio>
                                  <AudioPlayer
                                    src={chat.answeraudio}
                                    onPlay={(e) => console.log("onPlay")}
                                    showJumpControls={false}
                                    showSkipControls={false}
                                    customVolumeControls={[]}
                                    style={{ boxShadow: "none" }}
                                  />
                                ) : (
                                  <div>{chat.text}</div>
                                )}
                              </>
                            )}
                          </div>
                          {/* <ChatMenu chat={chat} /> */}
                        </div>
                      </div>
                    </React.Fragment>
                  </>
                )
              )}
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handler(e);
          }}
          className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4"
        >
          <div>
            {/* <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
    </button> */}
          </div>
          <div className="ml-4 flex-grow">
            <div className="relative w-full">
              <input
                defaultValue={inputText}
                // defaultValue={recording ? transcript.text : inputText}
                className="flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none"
                type="text"
                placeholder="Type your message…"
                onChange={(e) => setInputText(e.target.value)}
              />
              {/* <button 
        className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600"
        title={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {isRecording ? (
          <BsMicFill
            onClick={() => {
              setIsRecording(false);
              stopRecording();
            }}
            size={"20px"}
            className="mr-6 cursor-pointer fill-[#2473ae]"
          />
        ) : (
          <BsMicMuteFill
            onClick={() => {
              setIsRecording(true);
              startRecording();
            }}
            size={"20px"}
            className="mr-6 cursor-pointer fill-rose-500"
          />
        )}
      </button> */}
            </div>
          </div>
          <div className="ml-4">
            <button
              type="submit"
              className="flex flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 px-4 py-1 text-white hover:bg-[#f37125]"
            >
              <span>Send</span>
              <span className="ml-2">
                <svg
                  className="-mt-px h-4 w-4 rotate-45 transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default ChatBox;
