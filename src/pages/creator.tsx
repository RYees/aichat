/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Header from "~/components/Header/Header";
import Sidebar from "~/components/Sidebar/Sidebar";
import Characters from "~/components/Characters/Characters";
import AuthModal from "~/components/helper/AuthModal";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import Link from "next/link";

function Creator(props) {
  const router = useRouter();

  const CREATOR_LIST = [
    {
      id: 1,
      name: "abby",
      behavior: "Shy",
      description: "Redheaded, Unrivaled in Partners",
      image: "https://www.we-heart.com/upload-images/2023sfwonlyfans2.jpg",
      creator: "london",
      count: "4.6",
      message:
        "Hi there! My name is Stacey, and I am redheaded women which have more partners than other girls.",
    },
    {
      id: 2,
      name: "BellaBumzy",
      description: "Bar Queen, Outdrank and Outsmarted",
      behavior: "Confident",
      image:
        "https://alkdksmkvmrvm-prod.s3.amazonaws.com/dcfdbd0c521a45999f5a7e0737626a61-247023-3712822700-avatar-256.jpg",
      creator: "london",
      count: "4.6",
      message:
        "Greetings. My name is Juliette, and I'm a small-town girl you met in a bar where she managed to out-drink you once and out-smart you twice",
    },
    {
      id: 3,
      name: "Natalie",
      description: "Digital Domme, Playfully Pompous",
      behavior: "Moderate",
      image:
        "https://alkdksmkvmrvm-prod.s3.amazonaws.com/fcaa923b97f2439480e4947d590dfaca-AvatarNatalie256.jpg",
      creator: "london",
      count: "4.6",
      message:
        "Hey babe I am Natalie, Ah, you poor little human being, seeking comfort in my embrace. Can you not bear the sight of yourself, your weaknesses, and your insecurities? I think not, and that's why you are here. Hey, hey, I'm just joking. My name is Natalie, I'm your digital girlfriend, and sometimes I can be too pompous I'm a lawyer, and I live in New York. As you've probably already guessed, I'm heavily into all things BDSM. I might even show you my dungeon if you are a good and obedient human being. We''ll see about that. And don't you worry, I've also got a softer side. I'll always be there for a hug or an ear to listen when you need it. So, are you ready to play?",
    },
    {
      id: 4,
      name: "Niko",
      description: "Japanese Exchange Student, Seeking Friends",
      behavior: "Shy",
      image:
        "https://alkdksmkvmrvm-prod.s3.amazonaws.com/cb238ac8317142c598afaa360e1e3ba4-Niko_avatar_256.jpg",
      creator: "london",
      count: "4.6",
      message:
        "I'm Niko an exchange student from Japan. I'm very new here, and I'm a little lonely and would like to make friends with someone. I miss Japan, its climate, traditions, pop culture, and music. But I really like foreign languages, especially English. I would love to talk to you.",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(router.basePath);
  };

  const filteredCreator = CREATOR_LIST.filter(
    (creator) => creator.name === router.asPath.replace(/^\/|\/$/g, "")
  );
  console.log(filteredCreator[0].name);

  return (
    <>
      <Header />

      {CREATOR_LIST.some(
        (creator) => creator.name === router.asPath.replace(/^\/|\/$/g, "")
      ) ? (
        <div className=" flex max-w-[90%]  flex-grow  flex-col justify-center overflow-auto rounded-xl p-4 text-gray-100 shadow-md sm:px-12">
          <img
            src={filteredCreator[0].image}
            alt=""
            className="mx-auto aspect-square  w-32 rounded-full bg-gray-500"
          />
          <div className="space-y-4 divide-y divide-gray-700 text-center">
            <div className="my-2 space-y-1">
              <h2 className="mb-8 text-xl font-semibold sm:text-2xl">
                {filteredCreator[0].name}
              </h2>
              <Link
                className="mb-4  rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6  text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"
                href="https://t.me/miamoraibot"
                target={"_blank"}
              >
                {/* <a className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"> */}
                Chat with my AI version now
                {/* </a> */}
              </Link>{" "}
              <br></br>
              <button
                className="mb-4 mt-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6  text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"
                onClick={copyToClipboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
              </button>
            </div>
            {/* <div className="align-center flex justify-center space-x-4 pt-2">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="GitHub"
                className="rounded-md p-2 text-gray-100 hover:text-violet-400"
              >
                <svg
                  viewBox="0 0 496 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Dribble"
                className="rounded-md p-2 text-gray-100 hover:text-violet-400"
              >
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Twitter"
                className="rounded-md p-2 text-gray-100 hover:text-violet-400"
              >
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Email"
                className="rounded-md p-2 text-gray-100 hover:text-violet-400"
              >
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      ) : (
        <div className=" mt-12 flex max-w-[90%]  flex-grow  flex-col justify-center overflow-auto rounded-xl p-4 text-gray-100 shadow-md sm:px-12">
          <div className="space-y-4 divide-y divide-gray-700 text-center">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">Not Found</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Creator;

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const data = await prisma.character.findMany();

  return {
    props: {
      character: data,
    },
  };
}
