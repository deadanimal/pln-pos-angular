export class PaymentTicket {
    public id: string
    public payment_method: string
    public amount_paid: number
    public customer_id: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        payment_method: string,
        amount_paid: number,
        customer_id: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.payment_method = payment_method
        this.amount_paid = amount_paid
        this.customer_id = customer_id
        this.created_date = created_date
        this.modified_date = modified_date
    }
}