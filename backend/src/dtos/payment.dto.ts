export interface CreateCheckoutDTO {
    packageId: string;
}

export interface CreateSubscriptionCheckoutDTO {
    planId: string;
}

export interface CheckoutResponseDTO {
    paymentId: string;
    sessionId: string;
    checkoutUrl: string;
}