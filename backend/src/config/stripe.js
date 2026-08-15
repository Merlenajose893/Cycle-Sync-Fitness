import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-07-29.dahlia"
});
export default stripe;
//# sourceMappingURL=stripe.js.map