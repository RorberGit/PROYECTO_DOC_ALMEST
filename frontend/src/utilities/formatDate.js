const opciones = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "America/Havana",
};

export const FormatDate = (fecha) => {
  const date = new Date(fecha);

  return date.toLocaleDateString("es-ES", opciones);
};
