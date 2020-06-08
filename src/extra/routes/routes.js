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
//COMPONENTES DE ALUMNO
import Agenda from "../../Usuarios/Alumno/Agenda/Agenda";
import Tutor from "../../Usuarios/Alumno/Tutor/Tutor";
import SolicitudesAlumno from "../../Usuarios/Alumno/Mis Solicitudes/Mis Solicitudes";
//COMPONENTES DE TUTOR
import WelcomeTutor from "../../Usuarios/Tutor/Bienvenido/Bienvenido"
import Asignaciones from "../../Usuarios/Tutor/Asignaciones/Asignaciones"
import Citas from "../../Usuarios/Tutor/Citas/Citas"
import Sesiones from "../../Usuarios/Tutor/Sesiones/Sesiones"
import SolicitudesTutor from "../../Usuarios/Tutor/Solicitudes/Solicitudes"
import AlumnosTutor from "../../Usuarios/Tutor/Alumnos/Alumnos"
//COMPONENTE BIENVENIDOS
import Welcome from "../../Usuarios/Welcome";
import Vue from "vue";
import Router from "vue-router";
// COMPONENTE CONTENEDOR DE ACUERDO AL ROL
import MainAdmin from "../../pages/Mains/MainAdmin";
import MainCoordi from "../../pages/Mains/MainCoordi";
import MainTutor from "../../pages/Mains/MainTutor";
import MainAlumno from "../../pages/Mains/MainAlumno";
// LOGIN
import Login from "../../pages/Login/Login.vue";

export const routes = [
    { path: "", redirect: "Login" },
    { path: "/Login", component: Login },
    {
        path: "/Administrador",
        component: MainAdmin,
        children: [
            //Administrador
            { path: "Bienvenido", component: Welcome }, //Luiggi
            { path: "Configuración", component: Configuración }, //Luiggi
            { path: "Unidades académicas", component: Académicas }, //italo
            { path: "Coordinadores", component: Coordinadores }, //italo
            { path: "Usuarios", component: Usuarios }, //italo
            { path: "Auditoría", component: Welcome },
            { path: "Errores", component: Welcome },
        ],
    },
    {
        path: "/Coordinador",
        component: MainCoordi,
        children: [
            //Coordinador
            { path: "Bienvenido", component: Welcome }, //Luiggi
            { path: "/Coordinador/Miembros/Tutores", component: Tutores }, //herbert
            { path: "/Coordinador/Miembros/Alumnos", component: Alumnos }, //herbert
            { path: "Tutorías activas", component: Welcome },
            { path: "Tipos de tutoría", component: TipoTutoria }, //luiggi
            { path: "Reportes", component: Welcome },
            { path: "Solicitudes", component: Solicitudes }, //valeria
            { path: "/Coordinador/Miembros/Unidades de apoyo", component: Apoyo }, //valeria
            { path: "/Coordinador/Miembros/Soporte", component: Soporte }, //herbert            
        ],
    },
    {
        path: "/Alumno",
        component: MainAlumno,
        children: [
            //Alumno
            { path: "Bienvenido", component: Welcome }, //italo / Herbert
            { path: "Agenda", component: Agenda }, //italo / Herbert
            { path: "Tutor", component: Tutor }, //italo / Herbert
            { path: "Mis Solicitudes", component: SolicitudesAlumno }, //italo / Herbert           
        ],
    },
    {
        path: "/Tutor",
        component: MainTutor,
        children: [
            //Alumno
            { path: "Bienvenido", component: WelcomeTutor }, //luiggi / valeria / melvin
            { path: "Asignaciones", component: Asignaciones }, //luiggi / valeria / melvin
            { path: "Citas", component: Citas }, //luiggi / valeria / melvin
            { path: "Sesiones", component: Sesiones }, //luiggi / valeria / melvin
            { path: "Solicitudes", component: SolicitudesTutor }, //luiggi / valeria / melvin
            { path: "Alumnos", component: AlumnosTutor }, //luiggi / valeria / melvin
        ],
    }
   
];

Vue.use(Router);
export default new Router({
    mode: "history", // https://router.vuejs.org/api/#mode
    routes: routes,
});
