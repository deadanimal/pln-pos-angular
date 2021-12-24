export class Venue {
    public id: string
    public name: string
    public location: string
    public max_capacity: number
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        location: string,
        max_capacity: number,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.location = location
        this.max_capacity = max_capacity
        this.created_date = created_date
        this.modified_date = modified_date
    }
}