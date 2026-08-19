export interface StripePriceResult{
    stripeProductId:string;
    stripePriceId:string;
}
export interface IStripeBillingGateway{
    createProductAndPrice(name:string,amount:number,currency:string,interval:"month"|"year"):Promise<StripePriceResult>;
}