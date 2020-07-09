var validarURL = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

export const nameRules = [(v) => !!v || "Nombre es obligatorio"];
export const emailRules = [
    (v) => !!v || "E-mail es obligatorio",
    (v) => /.+@.+\..+/.test(v) || "E-mail invalido",
];
export const codeRules = [
    (v) => !!v || "Código es obligatorio",
    (v) => !isNaN(v) || "Código debe ser numérico",
    (v) => (v && v.length == 8) || "Código debe tener la longitud 8",
];
export const phoneRules = [
    (v) => !isNaN(v) || "Teléfono debe ser numérico",
    (v) => v == "" || (v && v.length == 9) || "Teléfono debe tener la longitud 9",
];
export const webRules = [
    (v) => !!v || "La página web es obligatorio",
    (v) => validarURL.test(v) || "No es una página web",
];
export const cantRules = [
    (v) => !!v || "La cantidad es obligatorio",
    (v) => !isNaN(v) || "La cantidad debe ser numérica",
];

export const excelRules = [(v) => !!v || "Adjunte un archivo excel"];
export const pdfRules = [(v) => !!v || "Adjunte un archivo pdf"];