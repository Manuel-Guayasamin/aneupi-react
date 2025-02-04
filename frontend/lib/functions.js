export function formatDate(dateStr) {
  const daysOfWeek = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const monthsOfYear = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${monthName} ${dayOfMonth}, ${dayOfWeek}`;
}
