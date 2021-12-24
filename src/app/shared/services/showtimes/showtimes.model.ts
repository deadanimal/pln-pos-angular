export class Showtime {
    public id: string
    public show_date: string
    public show_time: string
    public showing_id: string
    public venue_id: string
    public created_date: string
    public modified_date: string
    public available_ticket: number 
    public show_time_status: string

    constructor(
        id: string,
        show_date: string,
        show_time: string,
        showing_id: string,
        venue_id: string,
        created_date: string,
        modified_date: string,
        available_ticket: number,
        show_time_status: string,

    ) {
        this.id = id
        this.show_date = show_date
        this.show_time = show_time
        this.showing_id = showing_id
        this.venue_id = venue_id
        this.created_date = created_date
        this.modified_date = modified_date
        this.available_ticket = available_ticket
        this.show_time_status = show_time_status
    }
}
