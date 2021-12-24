export class Asset {
    public id: string
    public name: string
    public description: string
    public asset_type: string
    public pic_id: string
    public image_url: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        description: string,
        asset_type: string,
        pic_id: string,
        image_url: string,
        created_date: string,
        modified_date: string
    ){
        this.id = id
        this.name = name
        this.description = description
        this.asset_type = asset_type
        this.pic_id = pic_id
        this.image_url = image_url
        this.created_date = created_date
        this.modified_date = modified_date
    }
}