declare interface UserSignup {
  email: string;
  password: string;
  // verificationCode: string;
}

declare interface UserLogin {
  email: string;
  password: string;
}

declare interface UserVerification {
  email: string;
}

declare interface UserProfile {
  persian_first_name: string;
  persian_last_name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  national_code: string;
  university_name: string;
  department_name: string;
  student_id?: string;
  courses_list?: Array<string>;
  data_to_sponsor: "false" | "true";
}
