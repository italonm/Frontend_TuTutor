//COMPONENTES DE ADMINISTRADOR
import Configuración from "../../Usuarios/Administrador/Configuración/Configuración";
import Errores from '../../Usuarios/Administrador/Errores/Errores'
import Académicas from "../../Usuarios/Administrador/Unidades académicas/Unidades académicas";
import Usuarios from "../../Usuarios/Administrador/Usuarios/Usuarios";
import Coordinadores from "../../Usuarios/Administrador/Coordinadores/Coordinadores.vue";
//COMPONENTES DE COORDINADOR
import Alumnos from "../../Usuarios/Coordinador/Alumnos/Alumnos";
import Tutores from "../../Usuarios/Coordinador/Tutores/Tutores";
import TipoTutoria from "../../Usuarios/Coordinador/Tipos de tutoría/TipoTutoria";
import Reportes from "../../Usuarios/Coordinador/Reportes/Reportes";
import ReporteEncuesta from "../../Usuarios/Coordinador/Reportes/ReporteEncuestas";
import WelcomeCoord from "../../Usuarios/Coordinador/Reportes/Reportes"
/* import Tutorías from '../../Usuarios/Coordinador/Tutorías/Tutorías' */
import Solicitudes from "../../Usuarios/Coordinador/Solicitudes/Solicitudes";
import Soporte from "../../Usuarios/Coordinador/Soporte/Soporte";
import Apoyo from "../../Usuarios/Coordinador/Unidades de apoyo/Unidades de apoyo";
//COMPONENTES DE ALUMNO
import Agenda from "../../Usuarios/Alumno/Agenda/Agenda";
import Tutor from "../../Usuarios/Alumno/Tutor/Tutor";
import SolicitudesAlumno from "../../Usuarios/Alumno/Mis Solicitudes/Mis Solicitudes";
import SolicitarTutor from "../../Usuarios/Alumno/Tutor/AsignarTutor/Solicitar Tutor";
import ReportesAlumno from "../../Usuarios/Alumno/Reportes/Reportes";
import SesionesAlumno from "../../Usuarios/Alumno/Tutor/Sesiones.vue";
//COMPONENTES DE TUTOR
import WelcomeTutor from "../../Usuarios/Tutor/Bienvenido/Bienvenido";
import Asignaciones from "../../Usuarios/Tutor/Asignaciones/Asignaciones";
import Citas from "../../Usuarios/Tutor/Citas/Citas";
import Sesiones from "../../Usuarios/Tutor/Sesiones/Sesiones";
import SolicitudesTutor from "../../Usuarios/Tutor/Solicitudes/Solicitudes";
import AlumnosTutor from "../../Usuarios/Tutor/Alumnos/Alumnos";
//COMPONENTE BIENVENIDOS
import Welcome from "../../pages/Welcome/Welcome";
import Vue from "vue";
import Router from "vue-router";
// COMPONENTE CONTENEDOR DE ACUERDO AL ROL
import MainAdmin from "../../pages/Mains/MainAdmin";
import MainCoordi from "../../pages/Mains/MainCoordi";
import MainTutor from "../../pages/Mains/MainTutor";
import MainAlumno from "../../pages/Mains/MainAlumno";
// LOGIN
import Login from "../../pages/Login/Login.vue";
import PassSet from "../../pages/Login/PasswordSet.vue";
import RegPass from "../../pages/Login/RegistrarContraseña.vue";
import Reestablecer from "../../pages/Login/Reestablecer.vue";
import Registrar from "../../pages/Login/Registro.vue";
import ResetPass from "../../pages/Login/ResetPass.vue"
import LandingPage from "../../pages/LandingPage/LadingPage.vue"

export const routes = [
    { path: "", redirect: "LandingPage", name: 'main', meta: { requiresAuth: false } },
    { path: "/Login", component: Login, name: "login", meta: { requiresAuth: false } },
    { path: "/LandingPage", component: LandingPage, name: "landingPage", meta: { requiresAuth: false } },
    { path: "/PassSet", component: PassSet, name: 'passSet', meta: { requiresAuth: false } },
    { path: "/RegPass", component: RegPass, name: 'regPass', meta: { requiresAuth: false } },
    { path: "/Reestablecer", component: Reestablecer, name: 'reestablecer', meta: { requiresAuth: false } },
    { path: "/Registrar", component: Registrar, name: 'registrar', meta: { requiresAuth: false } },
    { path: "/ResetPass", component: ResetPass, name: 'reiniciar', meta: { requiresAuth: false } },
    {
        path: "/Administrador",
        component: MainAdmin,
        name: "administrador",
        meta: { requiresAuth: true, isAdmin: true },
        children: [
            //Administrador
            { path: "Bienvenido", component: Configuración, name: "bienvenido" },
            { path: "Configuración", component: Configuración, name: "configuración" },
            { path: "Unidades académicas", component: Académicas, name: "unidades" },
            { path: "Coordinadores", component: Coordinadores, name: "coordinadores" },
            { path: "Usuarios", component: Usuarios, name: "usuarios" },
            { path: "Unidades de Apoyo", component: Apoyo, name: "apoyo" },
            { path: "Errores", component: Errores, name: "errores" },
        ],
    },
    {
        path: "/Coordinador",
        component: MainCoordi,
        name: "coordinador",
        meta: { requiresAuth: true, isCoordi: true },
        children: [
            //Coordinador
            { path: "Bienvenido", component: WelcomeCoord },
            { path: "/Coordinador/Miembros/Tutores", component: Tutores },
            { path: "/Coordinador/Miembros/Alumnos", component: Alumnos },
            { path: "Tutorías activas", component: Welcome },
            { path: "Tipos de tutoría", component: TipoTutoria },
            { path: "Reportes", component: Reportes },
            { path: "Solicitudes", component: Solicitudes },
            { path: "ReporteEncuestas", component: ReporteEncuesta },
            { path: "/Coordinador/Miembros/Unidades de apoyo", component: Apoyo },
            { path: "/Coordinador/Miembros/Soporte", component: Soporte },

        ],
    },
    {
        path: "/Alumno",
        component: MainAlumno,
        name: "alumno",
        meta: { requiresAuth: true, isStudent: true },
        children: [
            //Alumno
            { path: "Bienvenido", component: Welcome },
            { path: "Agenda", component: Agenda },
            { path: "Mis Tutorías", component: Tutor },
            { path: "Solicitar Tutor", component: SolicitarTutor },
            { path: "Mis Solicitudes", component: SolicitudesAlumno },
            { path: "Mis Reportes", component: ReportesAlumno },
            { path: "Sesiones", component: SesionesAlumno },
        ],
    },
    {
        path: "/Tutor",
        component: MainTutor,
        name: "tutor",
        meta: { requiresAuth: true, isTutor: true },
        children: [
            //Alumno
            { path: "Bienvenido", component: WelcomeTutor },
            { path: "Asignaciones", component: Asignaciones },
            { path: "Citas", component: Citas },
            { path: "Sesiones", component: Sesiones },
            { path: "Solicitudes", component: SolicitudesTutor },
            { path: "Alumnos", component: AlumnosTutor },
        ],
    },
];


Vue.use(Router);
const router = new Router({
    mode: "history",
    routes: routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem("Token") !== null) {
            if (to.matched.some((record) => record.meta.isTutor)) {
                if (localStorage.getItem("EsTutor") === "true") {
                    next()
                    return
                } else next("/Login");


            } else if (to.matched.some((record) => record.meta.isAdmin)) {
                if (localStorage.getItem("EsAdministrador") === "true") {
                    next()
                    return
                } else next("/Login");


            } else if (to.matched.some((record) => record.meta.isCoordi)) {
                if (localStorage.getItem("EsCoordinador") === "true") {
                    next()
                    return
                } else next("/Login");

            } else if (to.matched.some((record) => record.meta.isStudent)) {
                if (localStorage.getItem("EsAlumno") === "true") {
                    next()
                    return
                } else next("/Login");

            } else next("/Login")
        } else {
            next("/Login")
        }
    } else {
        next()
    }

})

export default router