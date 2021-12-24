export class ShowTicket {
    public id: string
    public ticket_price: number
    public category: string
    public ticket_type: string
    public customer_id: string
    public showtime_id: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        ticket_price: number,
        category: string,
        ticket_type: string,
        customer_id: string,
        showtime_id: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.ticket_price = ticket_price
        this.category = category
        this.ticket_type = ticket_type
        this.customer_id = customer_id
        this.showtime_id = showtime_id
        this.created_date = created_date
        this.modified_date = modified_date
    }
}