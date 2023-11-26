import React,{useEffect} from 'react'
import axios from 'axios';
const fetch = require('node-fetch');

const get = () => {
//     const fetchVoices = async () => {
//         const result = await fetch('/api/voices');
//         const data = await result.json(); ClPjt2XNMwS7ryezfd61
//         console.log(data);
//   }   
const fetchVoices = async () => {
    const result = await axios.get("/api/elevenlabsvoices");
    const data = result.data;
    console.log("go",data);
}    

const deleteVoices = async () => {
  const result = await axios.delete("/api/deleteVoices");
  const data = result.data;
  console.log("go",data);
}  

// const txt = "Hey there! I'm Stacey, an outgoing and friendly redheaded woman with a love for music and experience in life lessons. I'm also quite the social butterfly, having more partners than most girls. I'm not big on discussing personal relationships, but I'm sure I can be of assistance if ever needed! As for the emoji symbols, I'd say they suit me perfectly - I'm playful, fun, and always up for a good laugh!";
// const key =  "21m00Tcm4TlvDq8ikWAM";
const convertToSpeech = async () => {
    const body = { text: 'you are here, bravo!', voice_id: '21m00Tcm4TlvDq8ikWAM' };
    
    const result = await axios.post('/api/convertToSpeech', body);
    
    const data = result.data;
    console.log("thinkingabout",data);
}


const cloneVoice = async () => {
  //const body = { text: 'hello rehmet, i am happy you are here!', voice_id: '21m00Tcm4TlvDq8ikWAM' };
  
  const result = await axios.post('/api/cloneVoice');
  
  const data = result.data;
  console.log("clone", result);
}


const fineTune = async () => {
  //const body = { text: 'hello rehmet, i am happy you are here!', voice_id: '21m00Tcm4TlvDq8ikWAM' };
  
  const result = await axios.get('/api/fineTune');
  
  const data = result.data;
  console.log("tune", result);
}


const generateVoice = async () => {
  //const body = { text: 'hello rehmet, i am happy you are here!', voice_id: '21m00Tcm4TlvDq8ikWAM' };
  
  const result = await axios.post('/api/addVoice');
  
  const data = result.data;
  console.log("generate", result);
}

const cloneVoic = async () => {
  const voice_id = 'my-voice-id'; // replace this with your voice's id
  const xi_api_key = 'my-api-key'; // replace this with your API key
  
  const res = await fetch('/api/cloneVoice', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
   // body: JSON.stringify({ voice_id, xi_api_key })
  });

  if (res.ok) {
    console.log('Voice cloned successfully');
  } else {
    console.error('Failed to clone voice', await res.json());
  }
};


  useEffect(()=>{
    // fetchVoices();
    // console.log("turtle", fetchVoices)
  })
  return (
    <div>
       <p className='cursor-pointer shadow-sm p-3' onClick={fetchVoices}>get</p> 
       
       <p className='cursor-pointer shadow-sm p-3' onClick={deleteVoices}>delete</p>

       <p className='cursor-pointer shadow-sm p-3' onClick={fineTune}>fineTune</p>

       <p className='cursor-pointer shadow-sm p-3' onClick={convertToSpeech}>change</p>

       <p className='cursor-pointer shadow-sm p-3' onClick={cloneVoice}>clone</p>

       <p className='cursor-pointer shadow-sm p-3' onClick={generateVoice}>generate</p>

       <button onClick={cloneVoic}>CLO</button>
    </div>
  )
}

export default get










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
// import Head from "next/head";
// import { useState, Fragment, useEffect } from "react";
// import { useSession, getSession } from "next-auth/react";
// import { BsMicMuteFill, BsMicFill } from "react-icons/bs";
// import { PrismaClient } from "@prisma/client";

// import { useRouter } from "next/router";
// import { useWhisper } from "@chengsokdara/use-whisper";
// import TypingIndicator from "../components/typing";
// import Link from "next/link";
// import Header from "~/components/Header/Header";
// import BuyCreditModal from "~/components/BuyCreditModal";
// import axios from "axios";
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import LoopIcon from '@mui/icons-material/Loop';
// import CreditNotificationModal from "~/components/CreditNotificationModal";

// export default function Chat(props) {
//   const character = props.character;
//   //const bal = props.balance;
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputText, setInputText] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [chatsdata, setChat] = useState();
//   const [aiData, setAiData] = useState([])
//   const [audioDataUrl, setaudioDataUrl] = useState();
//   const [context, setContext] = useState({});
//   //const [behavior, setbehavior] = useState(character.behavior);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [balance, setBalance] = useState(0);
//   const [userId, setId] = useState("");
//   const [view, setView] = useState(true);
  
//   const { data: session } = useSession();
//   const user = session?.user;

//   const router = useRouter();
//   //const {balanceAmount, voiceid} = router.query;
//   const [showModal, setShowModal] = useState(false);
//   // console.log("blancing", balanceAmount);
//   const closeModal = () => setShowModal(false);
//   const openModal = () => setShowModal(true);

//   const {
//     recording,
//     speaking,
//     transcribing,
//     transcript,
//     pauseRecording,
//     startRecording,
//     stopRecording,
//   } = useWhisper({
//     apiKey: "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", // YOUR_OPEN_AI_TOKEN
//   });

//   // const menus = [
//   //   { behavior: "Shy" },
//   //   { behavior: "Moderate" },
//   //   { behavior: "Aggressive" },
//   //   { behavior: "Confident" },
//   // ];
// console.log("chathistory", chatHistory);

//   const fetchCredit = async() => {
//       if(user){
//         setId(user.id)
//         const iduser = user.id;
//         const uid = iduser.toString();
//         //console.log("ids", user.id, "chrid", character.id);
//         const users = await axios.get(`/api/user?userId=${uid}&characterId=${character.id}`);
//         if(users.data !== null){      
//         //console.log("muscles", users.data.balance)
//         setBalance(users.data.balance);
//         if(users.data.balance === 0){
//           openModal();
//         }
//         } else {
//           openModal();
//         }
//       }    
//   }

//   const fetchChat = async() => {
//     if(user){
//       setId(user.id)
//       const iduser = user.id;
//       const uid = iduser.toString();
//       const chats = await axios.get(`/api/fetchHistory?userId=${uid}&characterId=${character.id}`);
//       if(chats.data !== null){      
//       console.log("chaat", chats.data)
//       setChat(chats.data);
//       //setBalance(users.data.balance);
//       }
//       console.log("likethat", chatsdata);
//     }    
// }


//   // (((((((((((())))))))))))
//   async function handleChatInput() {
//     const input = inputText;
//     const data = { sender: "user", text: input, userId: session?.user?.id };
//     const chat = { sender: "user", text: input, userId: session?.user?.id, characterId: character.id };
//     if (input !== "") {
//       const result = await axios.post('/api/addhistory', chat);
//       const dat = result.data;
//       setaudioDataUrl(dat.audioDataUrl);
//       console.log("what1",dat);

//       setContext(character.message);
//       setChatHistory((history) => [...history, data]);
//       chatWithOpenai(input);
//       setInputText("");
//       saveChat(data);
//     }
//   }

//   async function chatWithOpenai(text: string) {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: text,
//         context: JSON.stringify(context),
//         behavior: JSON.stringify(behavior),
//       }),
//     };

//     const apiUrl = "/api/chat";
//     setIsLoading(true);
//     const response = await fetch(apiUrl, requestOptions)
//       .then((res) => res.json())
//       .catch((err) => console.log(err));

//       const body = { text: response.answer.text, voice_id: '21m00Tcm4TlvDq8ikWAM' };
    
//       const result = await axios.post('/api/convertToSpeech', body);
//       const dat = result.data;
//       setaudioDataUrl(dat.audioDataUrl);
//       console.log("mother",dat.audioDataUrl);
      
//     const data = {
//       sender: "bot",
//       text: response.answer.text,
//       userId: session?.user?.id
//     };

//     const chat = {
//       sender: "bot",
//       text: response.answer.text,
//       userId: session?.user?.id,
//       characterId: character.id
//     };

//     const resut = await axios.post('/api/addhistory', chat);
//     const history = resut.data;
//     console.log("what", history);

//     setChatHistory((history) => [...history, data]);
//     saveChat(data);
//     setIsLoading(false);
//   }

//   function saveChat(data: any) {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data }),
//     };
//     fetch("/api/chat", requestOptions);
//   }
  
//   const [intervalId, setIntervalId] = useState(null)
//   const [seconds, setSeconds] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   var timer;

//   useEffect(() => {
//     timer = setInterval(() => {
//       setSeconds(seconds+1);
//       if(seconds === 59){
//         setMinutes(minutes+1);
//         setSeconds(0);
//         decrementCredit();
//       }
//     }, 1000)
//     return () => clearInterval(timer);
//   });


//   async function decrementCredit() {    
//     if(user){
//       const users = await axios.post(`/api/updatecredit?userId=${user.id}&characterId=${character.id}`);
//       setBalance(users.data.balance);
//       //console.log("coffee", users)
//     }
//   } 

//   const handler = (event) => {
//     if (event.keyCode === 13) {
//       handleChatInput();
//     }
//   };

//   useEffect(()=>{
//     fetchCredit();
//     fetchChat();
//   })

//   // useEffect(()=>{
//   //   if(balance === 0){
//   //     openModal()
//   //   }
//   // })
  

//   return (
//     <>
//       <Head>
//         <title>{`Chat with ${character.name}`}</title>
//       </Head>
//       <Header />
//       <div className="flex h-screen text-gray-800 antialiased">
//         <div className="flex h-full w-full flex-row overflow-x-hidden">
//           <div className="flex w-64 flex-shrink-0 flex-col bg-white py-8 pl-6 pr-2">
//             <Link
//               href={"/"}
//               className="flex h-12 w-full flex-row items-center justify-center"
//             >
//               <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-2 text-2xl font-bold">Inchy</div>
//             </Link>
//             <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-200 bg-indigo-100 px-4 py-6">
//               <div className="flex">
//                 {/* <div>
//                   {view? 
//                   <AutorenewIcon size={1} className="cursor-pointer transition duration-75 hover:text-gray-500" onClick={fetchCredit}/>    
//                  : <LoopIcon  className="cursor-pointer"/> }
//                 </div> */}

//                 <div className="text-sm font-semibold -mt-1">
//                       Credits: 
//                       <span className="font-bold text-2xl ml-2">{balance}</span>                    
//                 </div>
//               </div>
//               <div className="mt-2 text-sm font-semibold">
//                 {/* {user ? session.user.name : "Guest"} */}
//                 {character.name}
//               </div>
//               {user?.image ? (
//                 // <div className=" ">
//                 //   <img
//                 //     src={user?.image}
//                 //     alt={user?.name || "Avatar"}
//                 //     layout="fill"
//                 //     className=" h-full w-full rounded-full"
//                 //   />
//                 // </div>
//                 <>
//                   <div className="h-20 w-20 overflow-hidden rounded-full border">
//                     <img
//                       src={character.image}
//                       alt={user?.name || "Avatar"}
//                       layout="fill"
//                       className=" h-full w-full rounded-full"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     className=" rounded-sm  px-2 py-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                     onClick={props.openModal}
//                   >
//                     Log Out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     type="button"
//                     className=" rounded-sm  bg-[#606465] px-2 py-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                     onClick={props.openModal}
//                   >
//                     Log In
//                   </button>
//                   <button
//                     type="button"
//                     className=" rounded-sm  bg-[#2473ae] px-2 py-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   >
//                     Sign Up
//                   </button>
//                 </>
//               )}
//             </div>
//             <div className="flex justify-center my-4">
//               <h1>
//                 {minutes<10? "0"+minutes:minutes} :                 
//                <span></span> {seconds<10? "0"+seconds:seconds}
//               </h1>
//             </div>     
//             <div className="mt-8 flex flex-col">
//               {/* <div className="flex flex-row items-center justify-between text-xs">
//                 <span className="font-bold">Active Conversations</span>
//                 <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
//                   4
//                 </span>
//               </div> */}
//               <div className="-mx-2 mt-4 flex h-48 flex-col space-y-1 overflow-y-auto">
//                 {/* <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200">
//                     <img
//                       src={character.image}
//                       className="h-10 w-10 rounded-full "
//                     />
//                   </div>
//                   <div className="ml-2 text-sm font-semibold">
//                     {character.name}
//                   </div>
//                 </button>
//                 <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
//                     M
//                   </div>
//                   <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
//                   <div className="ml-auto flex h-4 w-4 items-center justify-center rounded bg-red-500 text-xs leading-none text-white">
//                     2
//                   </div>
//                 </button> */}
//               </div>
//               {/* <div className="mt-6 flex flex-row items-center justify-between text-xs">
//                 <span className="font-bold">Archivied</span>
//                 <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
//                   7
//                 </span>
//               </div> */}
//               {/* <div className="-mx-2 mt-4 flex flex-col space-y-1">
//                 <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200">
//                     H
//                   </div>
//                   <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
//                 </button>
//               </div> */}
//               <button
//                 className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground false inline-flex h-10 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
//                 type="button"
//                 aria-haspopup="dialog"
//                 aria-expanded="false"
//                 aria-controls="radix-:Rjj7ijda:"
//                 data-state="closed"
//                 onClick={openModal}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                   class="mr-2 h-4 w-4 shrink-0"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 Buy Credits
//               </button>
//             </div>
//           </div>
//           <div className="flex h-full flex-auto flex-col p-6">
//             <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
//               <div className="mb-4 flex h-full flex-col overflow-x-auto">
//                 <div className="flex h-full flex-col">
//                   <div className="grid grid-cols-12 gap-y-2">
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <img
//                           src={character.image}
//                           className="h-10 w-10 rounded-full "
//                         />
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>{character.message}</div>
//                         </div>
//                       </div>
//                     </div>
//                     {chatsdata?.map(
//                       (chat, index) =>
//                         // <div key={index} className="mt-2 flex w-full  ">
//                         chat.sender === "user" ? (
//                           <>
//                             {/* <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
//                               {user && (
//                                 <img
//                                   src={session.user.image}
//                                   className="rounded-full"
//                                 />
//                               )}
//                             </div>
//                             <div>
//                               <div className="rounded-r-lg rounded-bl-lg  p-3">
//                                 <div className="text-[15px  font-[650]">
//                                   {user ? session.user.name : "Guest"}
//                                 </div>
//                                 <p className="text-[15px] font-[400]">
//                                   {chat.text}
//                                 </p>
//                               </div>
//                             </div> */}
//                             {/* <div
//                               key={index}
//                               className="col-start-1 col-end-8 rounded-lg p-3"
//                             >
//                               <div className="flex flex-row-reverse items-center justify-start">
//                                 <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                                   A
//                                 </div>
//                                 <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                                   <div>{chat.text}</div>
//                                 </div>
//                               </div>
//                             </div> */}

//                             <div
//                               key={index}
//                               className="col-start-6 col-end-13 rounded-lg p-3"
//                             >
//                               <div className="flex flex-row-reverse items-center justify-start">
//                                 <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                                   A
//                                 </div>
//                                 <div className="relative mr-3 rounded-xl bg-[#F9F6FD] px-4 py-2 text-sm shadow">
//                                   <div>{chat.text}</div>
//                                   <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
//                                     Seen
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             {/* <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
//                               <img
//                                 src={character.image}
//                                 className="rounded-full"
//                               />
//                             </div>
//                             <div>
//                               <div className="rounded-r-lg rounded-bl-lg  p-3">
//                                 <div className="text-[15px  font-[650]">
//                                   {character.name}
//                                   <span className="h-4 w-14 rounded-sm bg-[#606465] p-[1px] text-[12px] font-[600] italic">
//                                     @{character.creator}
//                                   </span>
//                                 </div>
//                                 <p className="text-[15px] font-[400]">
//                                   {chat.text}
//                                 </p>
//                               </div>
//                             </div> */}

//                             <div className="col-start-1 col-end-8 rounded-lg p-3">
//                               <div className="flex flex-row items-center">
//                                 {/* <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div> */}
//                                 <img
//                                   src={character.image}
//                                   className="h-10 w-10 rounded-full "
//                                 />
                            
//                               {/* {index % 2 !== 0  ? ( */}
//                                   <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                                      <TypingIndicator text={chat.text} />
//                                   </div>
//                                 {/* ):( 
//                                <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                                <TypingIndicator text={chat.text} />
//                                   <div>{chat.text}</div> 
//                                 </div>  */}
//                                 <audio controls>
//                                   <source 
//                                     src={audioDataUrl}
//                                   />
//                                 </audio> 
//                                 {/* )}  */}
//                               </div>
//                             </div>
//                           </>
//                         )
//                       // </div>
//                     )}
//                     {/* <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <img
//                           src={character.image}
//                           className="h-10 w-10 rounded-full "
//                         />
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>Hey How are you today?</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>
//                             Lorem ipsum dolor sit amet, consectetur adipisicing
//                             elit. Vel ipsa commodi illum saepe numquam maxime
//                             asperiores voluptate sit, minima perspiciatis.
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-6 col-end-13 rounded-lg p-3">
//                       <div className="flex flex-row-reverse items-center justify-start">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
//                           <div>
//                             Lorem ipsum dolor sit, amet consectetur adipisicing.
//                             ?
//                           </div>
//                           <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
//                             Seen
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>
//                             Lorem ipsum dolor sit amet consectetur adipisicing
//                             elit. Perspiciatis, in.
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div className="flex flex-row items-center">
//                             <button className="flex h-8 w-10 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
//                               <svg
//                                 className="h-6 w-6 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="1.5"
//                                   d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="1.5"
//                                   d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                               </svg>
//                             </button>
//                             <div className="ml-4 flex flex-row items-center space-x-px">
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-4 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-12 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-6 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-5 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-4 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-3 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-1 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-1 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-4 w-1 rounded-lg bg-gray-500" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
//                 <div>
//                   <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
//                     <svg
//                       className="h-5 w-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="ml-4 flex-grow">
//                   <div className="relative w-full">
                
//                   {/* {balance ? */}
//                     <input
//                       className="flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none"
//                       type="text"
//                       placeholder="Type your message…"
//                       onChange={(e) => setInputText(e.target.value)}
//                       onKeyDown={(e) => handler(e)}
//                      // onInput={(event) => setTimer(event)}
//                     />
//                    {/* : <p className="text-red-600">buy credit to start chating!</p>} */}

//                        {/* <input
//                           value={recording ? transcript.text : inputText}
//                           className="  text-  flex h-10 w-full items-center rounded bg-[#242525] px-3  text-sm outline-none"
//                           type="text"
//                           placeholder="Type your message…"
//                           onChange={(e) => setInputText(e.target.value)}
//                           onKeyDown={(e) => handler(e)}
//                         /> */}

//                     <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600">
//                       {isRecording ? (
//                         <BsMicFill
//                           onClick={() => {
//                             setIsRecording(false);
//                             stopRecording();
//                           }}
//                           size={"20px"}
//                           className="mr-6 cursor-pointer fill-[#2473ae]"
//                         />
//                       ) : (
//                         <BsMicMuteFill
//                           onClick={() => {
//                             setIsRecording(true);
//                             startRecording();
//                           }}
//                           size={"20px"}
//                           className="mr-6 cursor-pointer fill-rose-500"
//                         />
//                       )}
//                       {/* <svg
//                         className="h-6 w-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg> */}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <button className="flex flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600">
//                     <span>Send</span>
//                     <span className="ml-2">
//                       <svg
//                         className="-mt-px h-4 w-4 rotate-45 transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                         />
//                       </svg>
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <BuyCreditModal balance={balance} character={character} show={showModal} onClose={closeModal} />
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const currentCharacter = context.params.character;
//   const prisma = new PrismaClient();
//   const data = await prisma.character.findFirst({
//     where: {
//       name: currentCharacter,
//     },
//   });

//   return {
//     props: {
//       character: data,
//     },
//   };
// }



//***********former */


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
// import Head from "next/head";
// import { useState, Fragment, useEffect } from "react";
// import { useSession, getSession } from "next-auth/react";
// import { BsMicMuteFill, BsMicFill } from "react-icons/bs";
// import { PrismaClient } from "@prisma/client";

// import { useRouter } from "next/router";
// import { useWhisper } from "@chengsokdara/use-whisper";
// import TypingIndicator from "../components/typing";
// import Link from "next/link";
// import Header from "~/components/Header/Header";
// import BuyCreditModal from "~/components/BuyCreditModal";
// import axios from "axios";
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import LoopIcon from '@mui/icons-material/Loop';
// import CreditNotificationModal from "~/components/CreditNotificationModal";

// export default function Chat(props) {
//   const character = props.character;
//   //const bal = props.balance;
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputText, setInputText] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [aiData, setAiData] = useState([])
//   const [audioDataUrl, setaudioDataUrl] = useState();
//   const [context, setContext] = useState({});
//   const [behavior, setbehavior] = useState(character.behavior);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [balance, setBalance] = useState(0);
//   const [userId, setId] = useState("");
//   const [view, setView] = useState(true);
  
//   const { data: session } = useSession();
//   const user = session?.user;

//   const router = useRouter();
//   //const {balanceAmount, voiceid} = router.query;
//   const [showModal, setShowModal] = useState(false);
//   // console.log("blancing", balanceAmount);
//   const closeModal = () => setShowModal(false);
//   const openModal = () => setShowModal(true);

//   const {
//     recording,
//     speaking,
//     transcribing,
//     transcript,
//     pauseRecording,
//     startRecording,
//     stopRecording,
//   } = useWhisper({
//     apiKey: "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", // YOUR_OPEN_AI_TOKEN
//   });

//   const menus = [
//     { behavior: "Shy" },
//     { behavior: "Moderate" },
//     { behavior: "Aggressive" },
//     { behavior: "Confident" },
//   ];
// console.log("chathistory", chatHistory);

//   const fetchCredit = async() => {
//       if(user){
//         setId(user.id)
//         const iduser = user.id;
//         const uid = iduser.toString();
//         //console.log("ids", user.id, "chrid", character.id);
//         const users = await axios.get(`/api/user?userId=${uid}&characterId=${character.id}`);
//         if(users.data !== null){      
//         console.log("muscles", users.data.balance)
//         setBalance(users.data.balance);
//         if(users.data.balance === 0){
//           openModal();
//         }
//         } else {
//           openModal();
//         }
//       }    
//   }

//   // (((((((((((())))))))))))
//   async function handleChatInput() {
//     const input = inputText;
//     const data = { sender: "user", text: input, userId: session?.user?.id };
//     if (input !== "") {
//       const result = await axios.post('/api/addhistory', data);
//       const dat = result.data;
//       setaudioDataUrl(dat.audioDataUrl);
//       console.log("what1",dat);

//       setContext(character.message);
//       setChatHistory((history) => [...history, data]);
//       chatWithOpenai(input);
//       setInputText("");
//       saveChat(data);
//     }
//   }

//   async function chatWithOpenai(text: string) {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: text,
//         context: JSON.stringify(context),
//         behavior: JSON.stringify(behavior),
//       }),
//     };

//     const apiUrl = "/api/chat";
//     setIsLoading(true);
//     const response = await fetch(apiUrl, requestOptions)
//       .then((res) => res.json())
//       .catch((err) => console.log(err));

//       const body = { text: response.answer.text, voice_id: '21m00Tcm4TlvDq8ikWAM' };
    
//       const result = await axios.post('/api/convertToSpeech', body);
//       const dat = result.data;
//       setaudioDataUrl(dat.audioDataUrl);
//       console.log("mother",dat.audioDataUrl);
      
//     const data = {
//       sender: "bot",
//       text: response.answer.text,
//       userId: session?.user?.id,
//     };

//     const resut = await axios.post('/api/addhistory', data);
//     const history = resut.data;
//     console.log("what", history);

//     setChatHistory((history) => [...history, data]);
//     saveChat(data);
//     setIsLoading(false);
//   }

//   function saveChat(data: any) {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data }),
//     };
//     fetch("/api/chat", requestOptions);
//   }
  
//   const [intervalId, setIntervalId] = useState(null)
//   const [seconds, setSeconds] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   var timer;

//   useEffect(() => {
//     timer = setInterval(() => {
//       setSeconds(seconds+1);
//       if(seconds === 59){
//         setMinutes(minutes+1);
//         setSeconds(0);
//         decrementCredit();
//       }
//     }, 1000)
//     return () => clearInterval(timer);
//   });


//   async function decrementCredit() {    
//     if(user){
//       const users = await axios.post(`/api/updatecredit?userId=${user.id}&characterId=${character.id}`);
//       setBalance(users.data.balance);
//       //console.log("coffee", users)
//     }
//   } 

//   const handler = (event) => {
//     if (event.keyCode === 13) {
//       handleChatInput();
//     }
//   };

//   useEffect(()=>{
//     fetchCredit()
//   })

//   // useEffect(()=>{
//   //   if(balance === 0){
//   //     openModal()
//   //   }
//   // })
  

//   return (
//     <>
//       <Head>
//         <title>{`Chat with ${character.name}`}</title>
//       </Head>
//       <Header />
//       <div className="flex h-screen text-gray-800 antialiased">
//         <div className="flex h-full w-full flex-row overflow-x-hidden">
//           <div className="flex w-64 flex-shrink-0 flex-col bg-white py-8 pl-6 pr-2">
//             <Link
//               href={"/"}
//               className="flex h-12 w-full flex-row items-center justify-center"
//             >
//               <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-2 text-2xl font-bold">Inchy</div>
//             </Link>
//             <div className="mt-4 flex w-full flex-col items-center rounded-lg border border-gray-200 bg-indigo-100 px-4 py-6">
//               <div className="flex">
//                 {/* <div>
//                   {view? 
//                   <AutorenewIcon size={1} className="cursor-pointer transition duration-75 hover:text-gray-500" onClick={fetchCredit}/>    
//                  : <LoopIcon  className="cursor-pointer"/> }
//                 </div> */}

//                 <div className="text-sm font-semibold -mt-1">
//                       Credits: 
//                       <span className="font-bold text-2xl ml-2">{balance}</span>                    
//                 </div>
//               </div>
//               <div className="mt-2 text-sm font-semibold">
//                 {/* {user ? session.user.name : "Guest"} */}
//                 {character.name}
//               </div>
//               {user?.image ? (
//                 // <div className=" ">
//                 //   <img
//                 //     src={user?.image}
//                 //     alt={user?.name || "Avatar"}
//                 //     layout="fill"
//                 //     className=" h-full w-full rounded-full"
//                 //   />
//                 // </div>
//                 <>
//                   <div className="h-20 w-20 overflow-hidden rounded-full border">
//                     <img
//                       src={character.image}
//                       alt={user?.name || "Avatar"}
//                       layout="fill"
//                       className=" h-full w-full rounded-full"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     className=" rounded-sm  px-2 py-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                     onClick={props.openModal}
//                   >
//                     Log Out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     type="button"
//                     className=" rounded-sm  bg-[#606465] px-2 py-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                     onClick={props.openModal}
//                   >
//                     Log In
//                   </button>
//                   <button
//                     type="button"
//                     className=" rounded-sm  bg-[#2473ae] px-2 py-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   >
//                     Sign Up
//                   </button>
//                 </>
//               )}
//             </div>
//             <div className="flex justify-center my-4">
//               <h1>
//                 {minutes<10? "0"+minutes:minutes} :                 
//                <span></span> {seconds<10? "0"+seconds:seconds}
//               </h1>
//             </div>     
//             <div className="mt-8 flex flex-col">
//               {/* <div className="flex flex-row items-center justify-between text-xs">
//                 <span className="font-bold">Active Conversations</span>
//                 <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
//                   4
//                 </span>
//               </div> */}
//               <div className="-mx-2 mt-4 flex h-48 flex-col space-y-1 overflow-y-auto">
//                 {/* <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200">
//                     <img
//                       src={character.image}
//                       className="h-10 w-10 rounded-full "
//                     />
//                   </div>
//                   <div className="ml-2 text-sm font-semibold">
//                     {character.name}
//                   </div>
//                 </button>
//                 <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
//                     M
//                   </div>
//                   <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
//                   <div className="ml-auto flex h-4 w-4 items-center justify-center rounded bg-red-500 text-xs leading-none text-white">
//                     2
//                   </div>
//                 </button> */}
//               </div>
//               {/* <div className="mt-6 flex flex-row items-center justify-between text-xs">
//                 <span className="font-bold">Archivied</span>
//                 <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300">
//                   7
//                 </span>
//               </div> */}
//               {/* <div className="-mx-2 mt-4 flex flex-col space-y-1">
//                 <button className="flex flex-row items-center rounded-xl p-2 hover:bg-gray-100">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200">
//                     H
//                   </div>
//                   <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
//                 </button>
//               </div> */}
//               <button
//                 className="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground false inline-flex h-10 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
//                 type="button"
//                 aria-haspopup="dialog"
//                 aria-expanded="false"
//                 aria-controls="radix-:Rjj7ijda:"
//                 data-state="closed"
//                 onClick={openModal}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                   class="mr-2 h-4 w-4 shrink-0"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 Buy Credits
//               </button>
//             </div>
//           </div>
//           <div className="flex h-full flex-auto flex-col p-6">
//             <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4">
//               <div className="mb-4 flex h-full flex-col overflow-x-auto">
//                 <div className="flex h-full flex-col">
//                   <div className="grid grid-cols-12 gap-y-2">
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <img
//                           src={character.image}
//                           className="h-10 w-10 rounded-full "
//                         />
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>{character.message}</div>
//                         </div>
//                       </div>
//                     </div>
//                     {chatHistory.map(
//                       (chat, index) =>
//                         // <div key={index} className="mt-2 flex w-full  ">
//                         chat.sender === "user" ? (
//                           <>
//                             {/* <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
//                               {user && (
//                                 <img
//                                   src={session.user.image}
//                                   className="rounded-full"
//                                 />
//                               )}
//                             </div>
//                             <div>
//                               <div className="rounded-r-lg rounded-bl-lg  p-3">
//                                 <div className="text-[15px  font-[650]">
//                                   {user ? session.user.name : "Guest"}
//                                 </div>
//                                 <p className="text-[15px] font-[400]">
//                                   {chat.text}
//                                 </p>
//                               </div>
//                             </div> */}
//                             {/* <div
//                               key={index}
//                               className="col-start-1 col-end-8 rounded-lg p-3"
//                             >
//                               <div className="flex flex-row-reverse items-center justify-start">
//                                 <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                                   A
//                                 </div>
//                                 <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                                   <div>{chat.text}</div>
//                                 </div>
//                               </div>
//                             </div> */}

//                             <div
//                               key={index}
//                               className="col-start-6 col-end-13 rounded-lg p-3"
//                             >
//                               <div className="flex flex-row-reverse items-center justify-start">
//                                 <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                                   A
//                                 </div>
//                                 <div className="relative mr-3 rounded-xl bg-[#F9F6FD] px-4 py-2 text-sm shadow">
//                                   <div>{chat.text}</div>
//                                   <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
//                                     Seen
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             {/* <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
//                               <img
//                                 src={character.image}
//                                 className="rounded-full"
//                               />
//                             </div>
//                             <div>
//                               <div className="rounded-r-lg rounded-bl-lg  p-3">
//                                 <div className="text-[15px  font-[650]">
//                                   {character.name}
//                                   <span className="h-4 w-14 rounded-sm bg-[#606465] p-[1px] text-[12px] font-[600] italic">
//                                     @{character.creator}
//                                   </span>
//                                 </div>
//                                 <p className="text-[15px] font-[400]">
//                                   {chat.text}
//                                 </p>
//                               </div>
//                             </div> */}

//                             <div className="col-start-1 col-end-8 rounded-lg p-3">
//                               <div className="flex flex-row items-center">
//                                 {/* <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div> */}
//                                 <img
//                                   src={character.image}
//                                   className="h-10 w-10 rounded-full "
//                                 />
                            
//                               {/* {index % 2 !== 0  ? ( */}
//                                   <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                                      <TypingIndicator text={chat.text} />
//                                   </div>
//                                 {/* ):( 
//                                <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                                <TypingIndicator text={chat.text} />
//                                   <div>{chat.text}</div> 
//                                 </div>  */}
//                                 <audio controls>
//                                   <source 
//                                     src={audioDataUrl}
//                                   />
//                                 </audio> 
//                                 {/* )}  */}
//                               </div>
//                             </div>
//                           </>
//                         )
//                       // </div>
//                     )}
//                     {/* <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <img
//                           src={character.image}
//                           className="h-10 w-10 rounded-full "
//                         />
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>Hey How are you today?</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>
//                             Lorem ipsum dolor sit amet, consectetur adipisicing
//                             elit. Vel ipsa commodi illum saepe numquam maxime
//                             asperiores voluptate sit, minima perspiciatis.
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-6 col-end-13 rounded-lg p-3">
//                       <div className="flex flex-row-reverse items-center justify-start">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow">
//                           <div>
//                             Lorem ipsum dolor sit, amet consectetur adipisicing.
//                             ?
//                           </div>
//                           <div className="absolute bottom-0 right-0 -mb-5 mr-2 text-xs text-gray-500">
//                             Seen
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div>
//                             Lorem ipsum dolor sit amet consectetur adipisicing
//                             elit. Perspiciatis, in.
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-start-1 col-end-8 rounded-lg p-3">
//                       <div className="flex flex-row items-center">
//                         <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
//                           A
//                         </div>
//                         <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow">
//                           <div className="flex flex-row items-center">
//                             <button className="flex h-8 w-10 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-800">
//                               <svg
//                                 className="h-6 w-6 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="1.5"
//                                   d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="1.5"
//                                   d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                               </svg>
//                             </button>
//                             <div className="ml-4 flex flex-row items-center space-x-px">
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-4 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-12 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-6 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-5 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-4 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-3 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-10 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-1 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-1 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-8 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-2 w-1 rounded-lg bg-gray-500" />
//                               <div className="h-4 w-1 rounded-lg bg-gray-500" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4">
//                 <div>
//                   <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
//                     <svg
//                       className="h-5 w-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="ml-4 flex-grow">
//                   <div className="relative w-full">
                
//                   {/* {balance ? */}
//                     <input
//                       className="flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none"
//                       type="text"
//                       placeholder="Type your message…"
//                       onChange={(e) => setInputText(e.target.value)}
//                       onKeyDown={(e) => handler(e)}
//                      // onInput={(event) => setTimer(event)}
//                     />
//                    {/* : <p className="text-red-600">buy credit to start chating!</p>} */}

//                        {/* <input
//                           value={recording ? transcript.text : inputText}
//                           className="  text-  flex h-10 w-full items-center rounded bg-[#242525] px-3  text-sm outline-none"
//                           type="text"
//                           placeholder="Type your message…"
//                           onChange={(e) => setInputText(e.target.value)}
//                           onKeyDown={(e) => handler(e)}
//                         /> */}

//                     <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600">
//                       {isRecording ? (
//                         <BsMicFill
//                           onClick={() => {
//                             setIsRecording(false);
//                             stopRecording();
//                           }}
//                           size={"20px"}
//                           className="mr-6 cursor-pointer fill-[#2473ae]"
//                         />
//                       ) : (
//                         <BsMicMuteFill
//                           onClick={() => {
//                             setIsRecording(true);
//                             startRecording();
//                           }}
//                           size={"20px"}
//                           className="mr-6 cursor-pointer fill-rose-500"
//                         />
//                       )}
//                       {/* <svg
//                         className="h-6 w-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg> */}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <button className="flex flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600">
//                     <span>Send</span>
//                     <span className="ml-2">
//                       <svg
//                         className="-mt-px h-4 w-4 rotate-45 transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                         />
//                       </svg>
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <BuyCreditModal balance={balance} character={character} show={showModal} onClose={closeModal} />
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const currentCharacter = context.params.character;
//   const prisma = new PrismaClient();
//   const data = await prisma.character.findFirst({
//     where: {
//       name: currentCharacter,
//     },
//   });

//   return {
//     props: {
//       character: data,
//     },
//   };
// }
