import stripePromise from "~/utils/stripe";

export const handlePurchase = async (selectedCredits:any) => {
    const stripe = await stripePromise;

    try {
      console.log("every minute");
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: selectedCredits * 100 }), // Stripe requires the amount in cents
      });

      const session = await response.json();
      if(stripe !== null){
      const result = await stripe.redirectToCheckout({
        sessionId: session.id

      })
    
      console.log("result", result);
      }
    } catch(error) {
      console.log("error", error);
    }
  }