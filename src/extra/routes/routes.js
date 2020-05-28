//COMPONENTES DE ADMINISTRADOR
import Configuración from "../../Usuarios/Administrador/Configuración/Configuración";
/* import Auditoría from '../../Usuarios/Administrador/Auditoría' */
/* import Errores from '../../Usuarios/Administrador/Errores' */
import Académicas from "../../Usuarios/Administrador/Unidades académicas/Unidades académicas";
import Usuarios from "../../Usuarios/Administrador/Usuarios/Usuarios";
import Coordinadores from "../../Usuarios/Administrador/Coordinadores/Coordinadores.vue";
//COMPONENTES DE COORDINADOR
import Alumnos from "../../Usuarios/Coordinador/Alumnos/Alumnos";
import Tutores from "../../Usuarios/Coordinador/Tutores/Tutores";
import TipoTutoria from "../../Usuarios/Coordinador/Tipos de tutoría/TipoTutoria";
/* import Tutorías from '../../Usuarios/Coordinador/Tutorías/Tutorías' */
import Solicitudes from "../../Usuarios/Coordinador/Solicitudes/Solicitudes";
import Soporte from "../../Usuarios/Coordinador/Soporte/Soporte";
import Apoyo from "../../Usuarios/Coordinador/Unidades de apoyo/Unidades de apoyo";
//POR IMPLEMENTAR EN EL SIGUIENTE SPRINT
/* import Reportes from '../Coordinador/Reportes' */
/* import Programas from '../../Usuarios/Coordinador/Alumnos/Alumnos' */
//COMPONENTE BIENVENIDOS
import Welcome from "../../Usuarios/Welcome";
import Vue from "vue";
import Router from "vue-router";
// COMPONENTE CONTENEDOR
import Main from "../../pages/Main";
// LOGIN
import Login from "../../pages/Login/Login.vue";

export const routes = [
    { path: "", redirect: "/Login" },
    { path: "/Login", component: Login },
    {
        path: "/TuTutor",
        component: Main,
        children: [
            //Bienvenida
            { path: "", component: Welcome },
            //Administrador
            { path: "Bienvenido", component: Welcome }, //Luiggi
            { path: "Configuración", component: Configuración }, //Luiggi
            { path: "Unidades académicas", component: Académicas }, //italo
            { path: "Coordinadores", component: Coordinadores }, //italo
            { path: "Usuarios", component: Usuarios }, //italo
            { path: "Auditoría", component: Welcome },
            { path: "Errores", component: Welcome },
            //Coordinador
            { path: "/TuTutor/Miembros/Tutores", component: Tutores }, //herbert
            { path: "/TuTutor/Miembros/Alumnos", component: Alumnos }, //herbert
            { path: "Tutorías activas", component: Welcome },
            { path: "Tipos de tutoría", component: TipoTutoria }, //luiggi
            { path: "Reportes", component: Welcome },
            { path: "Solicitudes", component: Solicitudes }, //valeria
            { path: "/TuTutor/Miembros/Unidades de apoyo", component: Apoyo }, //valeria
            { path: "/TuTutor/Miembros/Soporte", component: Soporte }, //herbert
            //Tutor
            { path: "Asignaciones", component: Welcome },
            { path: "Citas", component: Welcome },
            { path: "Sesiones", component: Welcome },
            { path: "Solicitudes", component: Welcome },
            { path: "Alumnos", component: Welcome },
            //Alumno FACI
            { path: "Agenda", component: Welcome },
            { path: "Tutor asignado", component: Welcome },
            //Alumno Generales
            { path: "Agenda", component: Welcome },
            { path: "Solicitar sesión", component: Welcome },
            //Soporte
            { path: "Agregar alumnos", component: Welcome },
            { path: "Generar citas", component: Welcome },
        ],
    },
];

Vue.use(Router);
export default new Router({
    mode: "history", // https://router.vuejs.org/api/#mode
    routes: routes,
});