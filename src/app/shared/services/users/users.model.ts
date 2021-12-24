export class User {
  public id: string;
  public full_name: string;
  public nric: string;
  public nric_picture;
  public email: string;
  public phone: string;
  public birth_date: string;
  public age: number;
  public address_1: string;
  public address_2: string;
  public address_3: string;
  public postcode: string;
  public city: string;
  public state: string;
  public country: string;
  public user_type: string;
  public gender_type: string;
  public race_type: string;
  public is_active: boolean;
  public date_joined: string;

  constructor(
    id: string,
    full_name: string,
    nric: string,
    nric_picture: string,
    email: string,
    phone: string,
    birth_date: string,
    age: number,
    address_1: string,
    address_2: string,
    address_3: string,
    postcode: string,
    city: string,
    state: string,
    country: string,
    user_type: string,
    gender_type: string,
    race_type: string,
    is_active: boolean,
    date_joined: string
  ) {
    this.id = id;
    this.full_name = full_name;
    this.nric = nric;
    this.nric_picture = nric_picture;
    this.email = email;
    this.phone = phone;
    this.birth_date = birth_date;
    this.age = age;
    this.address_1 = address_1;
    this.address_2 = address_2;
    this.address_3 = address_3;
    this.postcode = postcode;
    this.city = city;
    this.state = state;
    this.country = country;
    this.user_type = user_type;
    this.gender_type = gender_type;
    this.race_type = race_type;
    this.is_active = is_active;
    this.date_joined = date_joined;
  }
}
