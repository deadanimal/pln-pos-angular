export class EducationalProgramForm {
  public id: string;
  public educational_program_id: string;
  public customer_id: string;
  public teacher_name: string;
  public teacher_school_name: string;
  public teacher_school_address: string;
  public teacher_school_postcode: string;
  public teacher_school_division: string;
  public teacher_school_state: string;
  public teacher_tel: string;
  public teacher_hp: string;
  public teacher_email: string;
  public teacher_fax: string;
  public teacher_dob: string;
  public teacher_age: number;
  public teacher_religion: string;
  public teacher_gender: string;
  public teacher_citizenship: string;
  public teacher_nric_passportno: string;
  public teacher_maritalstatus: string;
  public teacher_tshirt_size: string;
  public teacher_contactperson_name: string;
  public teacher_contactperson_tel: string;
  public teacher_anysickness: string;
  public teacher_anyallergies: string;
  public teacher_vegetarian: boolean;
  public student_1_name: string;
  public student_1_dob: string;
  public student_1_age: number;
  public student_1_year: string;
  public student_1_religion: string;
  public student_1_gender: string;
  public student_1_citizenship: string;
  public student_1_nric_passportno: string;
  public student_1_tshirt_size: string;
  public student_1_contactperson_name: string;
  public student_1_contactperson_tel: string;
  public student_1_anysickness: string;
  public student_1_anyallergies: string;
  public student_1_vegetarian: boolean;
  public student_2_name: string;
  public student_2_dob: string;
  public student_2_age: number;
  public student_2_year: string;
  public student_2_religion: string;
  public student_2_gender: string;
  public student_2_citizenship: string;
  public student_2_nric_passportno: string;
  public student_2_tshirt_size: string;
  public student_2_contactperson_name: string;
  public student_2_contactperson_tel: string;
  public student_2_anysickness: string;
  public student_2_anyallergies: string;
  public student_2_vegetarian: boolean;
  public status: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    educational_program_id: string,
    customer_id: string,
    teacher_name: string,
    teacher_school_name: string,
    teacher_school_address: string,
    teacher_school_postcode: string,
    teacher_school_division: string,
    teacher_school_state: string,
    teacher_tel: string,
    teacher_hp: string,
    teacher_email: string,
    teacher_fax: string,
    teacher_dob: string,
    teacher_age: number,
    teacher_religion: string,
    teacher_gender: string,
    teacher_citizenship: string,
    teacher_nric_passportno: string,
    teacher_maritalstatus: string,
    teacher_tshirt_size: string,
    teacher_contactperson_name: string,
    teacher_contactperson_tel: string,
    teacher_anysickness: string,
    teacher_anyallergies: string,
    teacher_vegetarian: boolean,
    student_1_name: string,
    student_1_dob: string,
    student_1_age: number,
    student_1_year: string,
    student_1_religion: string,
    student_1_gender: string,
    student_1_citizenship: string,
    student_1_nric_passportno: string,
    student_1_tshirt_size: string,
    student_1_contactperson_name: string,
    student_1_contactperson_tel: string,
    student_1_anysickness: string,
    student_1_anyallergies: string,
    student_1_vegetarian: boolean,
    student_2_name: string,
    student_2_dob: string,
    student_2_age: number,
    student_2_year: string,
    student_2_religion: string,
    student_2_gender: string,
    student_2_citizenship: string,
    student_2_nric_passportno: string,
    student_2_tshirt_size: string,
    student_2_contactperson_name: string,
    student_2_contactperson_tel: string,
    student_2_anysickness: string,
    student_2_anyallergies: string,
    student_2_vegetarian: boolean,
    status: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.educational_program_id = educational_program_id;
    this.customer_id = customer_id;
    this.teacher_name = teacher_name;
    this.teacher_school_name = teacher_school_name;
    this.teacher_school_address = teacher_school_address;
    this.teacher_school_postcode = teacher_school_postcode;
    this.teacher_school_division = teacher_school_division;
    this.teacher_school_state = teacher_school_state;
    this.teacher_tel = teacher_tel;
    this.teacher_hp = teacher_hp;
    this.teacher_email = teacher_email;
    this.teacher_fax = teacher_fax;
    this.teacher_dob = teacher_dob;
    this.teacher_age = teacher_age;
    this.teacher_religion = teacher_religion;
    this.teacher_gender = teacher_gender;
    this.teacher_citizenship = teacher_citizenship;
    this.teacher_nric_passportno = teacher_nric_passportno;
    this.teacher_maritalstatus = teacher_maritalstatus;
    this.teacher_tshirt_size = teacher_tshirt_size;
    this.teacher_contactperson_name = teacher_contactperson_name;
    this.teacher_contactperson_tel = teacher_contactperson_tel;
    this.teacher_anysickness = teacher_anysickness;
    this.teacher_anyallergies = teacher_anyallergies;
    this.teacher_vegetarian = teacher_vegetarian;
    this.student_1_name = student_1_name;
    this.student_1_dob = student_1_dob;
    this.student_1_age = student_1_age;
    this.student_1_year = student_1_year;
    this.student_1_religion = student_1_religion;
    this.student_1_gender = student_1_gender;
    this.student_1_citizenship = student_1_citizenship;
    this.student_1_nric_passportno = student_1_nric_passportno;
    this.student_1_tshirt_size = student_1_tshirt_size;
    this.student_1_contactperson_name = student_1_contactperson_name;
    this.student_1_contactperson_tel = student_1_contactperson_tel;
    this.student_1_anysickness = student_1_anysickness;
    this.student_1_anyallergies = student_1_anyallergies;
    this.student_1_vegetarian = student_1_vegetarian;
    this.student_2_name = student_2_name;
    this.student_2_dob = student_2_dob;
    this.student_2_age = student_2_age;
    this.student_2_year = student_2_year;
    this.student_2_religion = student_2_religion;
    this.student_2_gender = student_2_gender;
    this.student_2_citizenship = student_2_citizenship;
    this.student_2_nric_passportno = student_2_nric_passportno;
    this.student_2_tshirt_size = student_2_tshirt_size;
    this.student_2_contactperson_name = student_2_contactperson_name;
    this.student_2_contactperson_tel = student_2_contactperson_tel;
    this.student_2_anysickness = student_2_anysickness;
    this.student_2_anyallergies = student_2_anyallergies;
    this.student_2_vegetarian = student_2_vegetarian;
    this.status = status;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
