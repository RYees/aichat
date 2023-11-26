/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { BsSearch } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import MenuModal from "./MenuModal";
import Example from "~/pages/menu";
import { FcGoogle } from "react-icons/fc";

import { prisma } from "~/lib/prisma";

function NavBar(props:any) {
  const router = useRouter();
  const [menuModal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const { data: session, status } = useSession();
  const user = session?.user;

  const [character, setCharacter] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchCharacterAndPlan = async () => {
      const currentCharacter = router.query.character;
      if (currentCharacter) {
        const res = await fetch(`/api/character?character=${currentCharacter}`);
        const data = await res.json();

        setCharacter(data.character);
        setPlan(data.plan);
      }
    };

    fetchCharacterAndPlan();
  }, [router.query.character]);

  useEffect(() => {
    //console.log("MenuModal rendered with navbar:", character);
  }, [character]);

  return (
    <>
      <nav className="  ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div> */}
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0">
                <h1 className=" text-[40px] font-bold text-gray-500">
                   <Link href="/">
                    <Image
                      src="/logo.svg"
                      height="80"
                      width="150"
                      className="mt-4"
                    ></Image>
                  </Link> 
                </h1>
                {/* <button className="text-black cursor-pointer" 
                 onClick={sus}
                >
                  click
                </button> */}
              </div>
            </div>

            <div className="flex-2 absolute inset-y-0 right-0 md:mr-20 flex items-center gap-3 pr-2 text-[0.7rem] text-gray-700 sm:static sm:inset-auto sm:ml-6  sm:justify-start sm:pr-0">
              {/* <button
                type="button"
                className=" rounded-sm  bg-transparent px-2 py-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <FaRegQuestionCircle size={"25px"} />
              </button>

              <select name="cars" id="cars" className="bg-transparent">
                <option className="bg-[#242525] " value="english">
                  English
                </option>
                <option className="bg-[#242525] " value="espanol">
                  Espanol
                </option>
                <option className="bg-[#242525] " value="french">
                  French
                </option>
                <option className="bg-[#242525]  " value="italiano">
                  Italinao
                </option>
              </select> */}

              {/* <div>
                {user ? (
                  <p
                    className="transform cursor-pointer underline"
                    //onClick={upd}
                    onClick={() => signOutFromGoogle()}
                  >
                    logout
                  </p>
                ) : null}
              </div> */}

              {user?.image ? (
                <div className="-mt-14 mr-20">
                  {/* <img
                    src={user?.image}
                    alt={user?.name || "Avatar"}
                    layout="fill"
                    className=" h-10 w-10 rounded-full"
                   about="1"
                  /> */}
                  <MenuModal character={character} plan={plan} />
                </div>
              ) : (
                <>
                    <button
                      onClick={props.openModal}
                      className="my-16 ml-36 flex h-[46px] justify-center space-x-2 rounded-md border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-gray-100 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                    >
                      <FcGoogle className="-mt-1" size={40}/>
                      <span className="text-sm mt-1">Login with Google</span>
                    </button>              
                </>
              )}
              {/* <MenuModal show={menuModal} onClose={closeModal}/> */}
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu"></div>
      </nav>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const currentCharacter = context.params.character;
//   const data = await prisma.character?.findFirst({
//     where: {
//       name: currentCharacter,
//     },
//   });

//   const plan = await prisma.plan?.findMany();

//   return {
//     props: {
//       character: JSON.parse(JSON.stringify(data)),
//       plan: JSON.parse(JSON.stringify(plan))
//     },
//   };
// }

export default NavBar;
