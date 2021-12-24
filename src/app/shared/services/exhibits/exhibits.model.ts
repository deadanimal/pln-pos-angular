export class Exhibit {
    public id: string
    public title: string
    public description: string
    public start_datetime: string
    public end_datetime: string
    public poster_link: string
    public pic_id: string
    public venue_id: string
    public asset_id: string
    public status: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        title: string,
        description: string,
        start_datetime: string,
        end_datetime: string,
        poster_link: string,
        pic_id: string,
        venue_id: string,
        asset_id: string,
        status: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.start_datetime = start_datetime
        this.end_datetime = end_datetime
        this.poster_link = poster_link
        this.pic_id = pic_id
        this.venue_id = venue_id
        this.asset_id = asset_id
        this.status = status
        this.created_date = created_date
        this.modified_date = modified_date
    }
}