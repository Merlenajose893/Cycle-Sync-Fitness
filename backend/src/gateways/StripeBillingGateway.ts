import { injectable } from "tsyringe";
import type { IStripeBillingGateway, StripePriceResult } from "../interfaces/gateways/IStripeBillingGateway.ts";
import Stripe from "stripe";
import { NotFoundError } from "../errors/index.ts";
@injectable()
export class StripeBillingGateway implements IStripeBillingGateway{
    private readonly stripe:Stripe
constructor()
{
const secretKey=process.env.STRIPE_SECRET_KEY;
if(!secretKey)
{
    throw new NotFoundError("Stripe secret key not found");
}
this.stripe=new Stripe(secretKey);
}

async createProductAndPrice(name: string, amount: number, currency: string, interval: "month" | "year"): Promise<StripePriceResult> {
    const product=await this.stripe.products.create({name});
    const price=await this.stripe.prices.create({
        product:product.id,
        unit_amount:Math.round(amount*100),
        currency:currency.toLowerCase(),
        recurring:{
            interval,
        }
    });
    return {
        stripeProductId:product.id,
        stripePriceId:price.id,
    }
}
}