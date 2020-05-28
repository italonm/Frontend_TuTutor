import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../../pages/Login/Login.vue";
import Main from "../../pages/Main.vue";
import Welcome from "../../Usuarios/Welcome.vue";

import Configuración from "../../Usuarios/Administrador/Configuración/Configuración.vue";
import Unidades from "../../Usuarios/Administrador/Unidades académicas/Unidades académicas.vue";
import Coordinadores from "../../Usuarios/Administrador/Coordinadores/Coordinadores.vue";
import Usuarios from "../../Usuarios/Administrador/Usuarios/Usuarios.vue";

import Tutores from "../../Usuarios/Coordinador/Tutores/Tutores.vue";
import Alumnos from "../../Usuarios/Coordinador/Alumnos/Alumnos.vue";
import Tipos from "../../Usuarios/Coordinador/Tipos de tutoría/Tipos de tutoría.vue";
import Solicitudes from "../../Usuarios/Coordinador/Solicitudes/Solicitudes.vue";
import Apoyo from "../../Usuarios/Coordinador/Unidades de apoyo/Unidades de apoyo.vue";
import Soporte from "../../Usuarios/Coordinador/Soporte/Soporte.vue";

export const routes = [
    { path: "", redirect: "/TuTutor" },
    { path: "/Login", component: Login },
    {
        path: "/TuTutor",
        component: Main,
        children: [
            //Bienvenida
            { path: "", component: Welcome },
            //Administrador
            { path: "Configuración", component: Configuración }, //Luiggi
            { path: "Unidades académicas", component: Unidades }, //italo
            { path: "Coordinadores", component: Coordinadores }, //italo
            { path: "Usuarios", component: Usuarios }, //italo
            { path: "Auditoría", component: Login },
            { path: "Errores", component: Login },
            //Coordinador
            { path: "Tutores", component: Tutores }, //herbert
            { path: "Alumnos", component: Alumnos }, //herbert
            { path: "Tutorías activas", component: Login },
            { path: "Tipos de tutoría", component: Tipos }, //luiggi
            { path: "Reportes", component: Login },
            { path: "Solicitudes", component: Solicitudes }, //valeria
            { path: "Unidades de apoyo", component: Apoyo }, //valeria
            { path: "Soporte", component: Soporte }, //herbert
            //Tutor
            { path: "Asignaciones", component: Login },
            { path: "Citas", component: Login },
            { path: "Sesiones", component: Login },
            { path: "Solicitudes", component: Login },
            { path: "Alumnos", component: Login },
            //Alumno FACI
            { path: "Agenda", component: Login },
            { path: "Tutor asignado", component: Login },
            //Alumno Generales
            { path: "Agenda", component: Login },
            { path: "Solicitar sesión", component: Login },
            //Soporte
            { path: "Agregar alumnos", component: Login },
            { path: "Generar citas", component: Login },
        ],
    },
];

Vue.use(VueRouter);
export default new VueRouter({
    routes: routes,
});