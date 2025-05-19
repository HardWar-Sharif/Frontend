export const formatPrice = (num: number, lang: "fa" | "en") =>
  num
    .toLocaleString("en-US") // comma-separate the number
    .replace(/\d/g, (d) => (lang === "fa" ? "۰۱۲۳۴۵۶۷۸۹"[+d] : d));
