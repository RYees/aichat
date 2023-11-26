/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Header from "~/components/Header/Header";
import Sidebar from "~/components/Sidebar/Sidebar";
import Characters from "~/components/Characters/Characters";
import AuthModal from "~/components/helper/AuthModal";
import { useState, useEffect, use } from "react";
import { PrismaClient } from "@prisma/client";
import analytics from "~/utils/analytics";
import axios from "axios";
// import Loader from "./Loader";
import Load from "~/components/Load";
//import { useStore } from "~/store/useStore";
import * as math from "mathjs";
import Example from "./menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreatorFullyOnboardedSuccessModal from "~/components/CreatorFullyOnboardedSucess";
import { sendWelcomEmailCreator } from "~/utils/customerIoService";

function HomePage(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const charinfo = props.charinfo;

  const [showSuccessModal, setSucessModal] = useState(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      router.query.stripeOnboarding === "success"
    ) {
      setSucessModal(true);
      console.log(user.email, user.name);
      if (user) {
        console.log(user.email, user.name);
        sendWelcomEmailCreator(user.email, router.query.characterName);
        // Track the KYC_Ended event
        analytics.identify(user?.id, {
          email: user?.email,
        });
        // Track the KYC_Ended event
        analytics.track("KYC_Ended", {
          creator: user?.id, // or any other identifier for the creator
        });
      }
    }

    

    if (router.query.stripeOnboarding === "success") {
      // If they are, store them in session storage
      sessionStorage.setItem("stripeOnboarding", "success");
    } else {
      // If they're not, check if they're in session storage
      const stripeOnboarding = sessionStorage.getItem("stripeOnboarding");
      if (stripeOnboarding === "success") {
        // If they are, apply them to the dashboard page
        router.replace(router.pathname + "?stripeOnboarding=success");
      }
    }
  }, [router.query, status]);
console.log("jim", status)
  return (
    <>
      <div className="flex h-full w-full flex-col ">
        <div>
          <Header openModal={openModal} />
        </div>

        {/* <Load/> */}
        <div className="flex justify-center ">
          {/* <Sidebar /> */}
          <Characters charinfo={charinfo} />
        </div>
      </div>

      <CreatorFullyOnboardedSuccessModal
        show={showSuccessModal}
        onClose={() => setSucessModal(false)}
      />

      <AuthModal show={showModal} onClose={closeModal} />
    </>
  );
}

export default HomePage;
import { prisma } from "~/lib/prisma";
import { getSession } from "next-auth/react";

// export async function getServerSideProps(context) {
//   // const prisma = new PrismaClient();
//   //const data = await prisma.character.findMany();
//   const charinfo = await prisma.character.findMany();
//   return {
//     props: {
//       //character: JSON.parse(JSON.stringify(data)),
//       charinfo:  JSON.parse(JSON.stringify(charinfo))
//     },
//   };
// }

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        charinfo: [],
      },
    };
  }

  const chatHistory = await prisma.characterChat.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      characterId: true,
    },
  });

  const charinfo = await prisma.character.findMany({
    where: {
      id: {
        in: chatHistory.map((chat) => chat.characterId),
      },
    },
  });

  return {
    props: {
      charinfo: JSON.parse(JSON.stringify(charinfo)),
    },
  };
}
