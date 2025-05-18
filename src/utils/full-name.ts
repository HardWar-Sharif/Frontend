interface UserFullName {
  persian_first_name: string;
  persian_last_name: string;
  first_name: string;
  last_name: string;
}

export const getFullName = (
  language: "en" | "fa",
  profile: UserFullName,
  isCompleted: boolean = true
) => {
  if (language == "en")
    return isCompleted ? `${profile.first_name} ${profile.last_name}` : "???";
  else
    return isCompleted
      ? `${profile.persian_first_name} ${profile.persian_last_name}`
      : "؟؟؟";
};
