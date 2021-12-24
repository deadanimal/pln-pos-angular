export class Publication {
  public id: string;
  public title_en: string;
  public title_ms: string;
  public description_en: string;
  public description_ms: string;
  public call_number: string;
  public abstract_en: string;
  public abstract_ms: string;
  public author_name: string;
  public editor_name: string;
  public publisher_name: string;
  public published_date: string;
  public isbn: string;
  public issn: string;
  public poster_link: string;
  public pdf_link: string;
  public year: string;
  public edition: string;
  public publication_category_id: string;
  public status: boolean;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    title_en: string,
    title_ms: string,
    description_en: string,
    description_ms: string,
    call_number: string,
    abstract_en: string,
    abstract_ms: string,
    author_name: string,
    editor_name: string,
    publisher_name: string,
    published_date: string,
    isbn: string,
    issn: string,
    poster_link: string,
    pdf_link: string,
    year: string,
    edition: string,
    publication_category_id: string,
    status: boolean,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.title_en = title_en;
    this.title_ms = title_ms;
    this.description_en = description_en;
    this.description_ms = description_ms;
    this.call_number = call_number;
    this.abstract_en = abstract_en;
    this.abstract_ms = abstract_ms;
    this.author_name = author_name;
    this.editor_name = editor_name;
    this.publisher_name = publisher_name;
    this.published_date = published_date;
    this.isbn = isbn;
    this.issn = issn;
    this.poster_link = poster_link;
    this.pdf_link = pdf_link;
    this.year = year;
    this.edition = edition;
    this.publication_category_id = publication_category_id;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
