"use client";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ManageSubscriptionButton() {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id;
  const email = user?.email;

  const redirectToCustomerPortal = async () => {
    try {
      const response = await axios.post("/api/create-portal-link", {
        user,
        userId,
        email,
      });

      const { url } = response.data || {};
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
      <button
        className="mb-2 rounded bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4 text-xl text-white"
        onClick={redirectToCustomerPortal}
      >
        Open customer portal
      </button>
    </div>
  );
}
