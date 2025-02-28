export const validateVerificationCode = (value: string) => {
  return value.length === 5;
};

export const validateConfirmPassword = (value: string, password: string) => {
  return value === password;
};

export const validatePhoneNumber = (value: string) => {
  return /^[\d]{11}$/.test(value) && value[0] == "0";
};

export const validateNationalCode = (value: string) => {
  let nationalCode = parseInt(value);
  const control = nationalCode % 10;
  nationalCode = Math.floor(nationalCode / 10);

  let sum = 0;
  for (let i = 2; i <= 10; i++) {
    const digit = nationalCode % 10;
    sum += digit * i;
    nationalCode = Math.floor(nationalCode / 10);
  }

  const remainder = sum % 11;
  const newControl = remainder < 2 ? remainder : 11 - remainder;

  return newControl === control && value.length === 10;
};

export const validateAcceptTerms = (value: string) => {
  return value === "true";
};

export const validateStudentId = (value: string, isCeSut: boolean) => {
  return !isCeSut || value.length === 9 || value.length === 8;
};
