export class VirtualLibraryESource {
  public id: string;
  public name_en: string;
  public name_ms: string;
  public link: string;
  public status: boolean;
  public virtual_library_esource_category_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name_en: string,
    name_ms: string,
    link: string,
    status: boolean,
    virtual_library_esource_category_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name_en = name_en;
    this.name_ms = name_ms;
    this.link = link;
    this.status = status;
    this.virtual_library_esource_category_id = virtual_library_esource_category_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
