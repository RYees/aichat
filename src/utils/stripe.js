// utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLICKEY || 'default_key');
export default stripePromise;