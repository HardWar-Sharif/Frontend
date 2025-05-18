export const verificationTimer = (timer: number) => {
  const minute: number = Math.floor(timer / 60);
  const second: number = timer % 60;
  return `${String(minute).padStart(2, "0")}:${String(second).padStart(
    2,
    "0"
  )}`;
};
