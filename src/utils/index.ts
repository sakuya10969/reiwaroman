export const formatY_MM_DD = (input: Date | string) => {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return { year: "", md: "" };

  const year = d.getFullYear().toString();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return { year, md: `${m}.${day}` };
};
