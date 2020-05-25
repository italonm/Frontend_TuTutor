export const nameRules = [(v) => !!v || "Nombre es obligatorio"];
export const emailRules = [
    (v) => !!v || "E-mail es obligatorio",
    (v) => /.+@.+\..+/.test(v) || "E-mail invalido",
];
export const codeRules = [
    (v) => !!v || "Código es obligatorio",
    (v) => !isNaN(v) || "Código debe ser numérico",
    (v) => (v && v.length == 8) || "Codigo debe tener la longitud 8",
];
export const phoneRules = [
    (v) => !isNaN(v) || "Teléfono debe ser numérico",
    (v) => v == "" || (v && v.length == 9) || "Teléfono debe tener la longitud 9",
];