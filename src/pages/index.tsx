/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Header from "~/components/Header/Header";
import Sidebar from "~/components/Sidebar/Sidebar";
import Characters from "~/components/Characters/Characters";
import AuthModal from "~/components/helper/AuthModal";
import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import HomePage from "./newhome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Page(props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const character = props.character;
  const value = props.val;

  
  return (
    <>
    <HomePage/>
    </>
  );
}

export default Page;
//import { prisma } from "~/lib/prisma";
// export async function getServerSideProps(context) {
  // const data = await prisma.character.findMany();

//   return {
//     props: {
//       character: data,
//     },
//   };
// }

export async function getServerSideProps() {
  
  const val = process.versions;
  return {
    props: {
      val: val
    } 
  }
}
