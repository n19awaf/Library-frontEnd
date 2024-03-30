class PaymentInfoRequest {
    amount: number;
    currency: string;
    receipyEmail: string | undefined;

    constructor(amount: number, currency: string, receipyEmail: string | undefined) {
        this.amount = amount;
        this.currency = currency;
        this.receipyEmail = receipyEmail;
    }

}