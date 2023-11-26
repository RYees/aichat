//@ts-nocheck

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ManageCreatorButton(props: any) {
  console.log(props, "props");
  const { stripeAccountId, name } = props.data;
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;
  const email = user?.email;

  const redirectToCreatorPortal = async () => {
    try {
      const response = await axios.post("/api/create-connect-login-link", {
        stripeAccountId,
      });
      const { url } = response.data;
      window.open(url, "_blank");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (
          error.response.data.error.includes(
            "Cannot create a login link for an account that has not completed onboarding."
          )
        ) {
          toast.error("Please complete onboarding first");
        } else {
          toast.error((error as Error).message);
        }
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">
        Manage {name}'s stripe connect express dashboard
      </p>
      <button
        className="mb-2 rounded bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 p-4 text-xl text-white"
        onClick={redirectToCreatorPortal}
      >
        Open {name}'s creator portal
      </button>
      <Toaster />
    </div>
  );
}
