import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }, selected) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLICKEY
      );
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${process.env.NEXTAUTH_URL}/download?${selected}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
