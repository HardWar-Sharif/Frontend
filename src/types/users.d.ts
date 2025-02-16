declare interface UserSignup {
  email: string;
  password: string;
  verificationCode: string;
}

declare interface UserLogin {
  email: string;
  password: string;
}

declare interface UserVerification {
  email: string;
}
