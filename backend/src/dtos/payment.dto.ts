export interface CreateCheckoutDTO {
    packageId: string;
}


export interface CheckoutResponseDTO {
    paymentId: string;
    sessionId: string;
    checkoutUrl: string;
}