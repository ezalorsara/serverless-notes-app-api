import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const { storage, source, cardDetail } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Brand: "+cardDetail.brand+", Card Holders Name: "+cardDetail.cardHoldersName;
  // Load our secret key from the environment variables
  const stripe = stripePackage(process.env.StripeSecretKey);
  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (e) {
    return failure({ message: e.message });
  }
}