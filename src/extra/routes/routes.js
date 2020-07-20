//COMPONENTES DE ADMINISTRADOR
import Configuración from "../../Usuarios/Administrador/Configuración/Configuración";
/* import Auditoría from '../../Usuarios/Administrador/Auditoría' */
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
    { path: "", redirect: "LandingPage", name:'main', meta:{requiresAuth: false}},
    { path: "/Login", component: Login, name:"login", meta:{requiresAuth: false}},
    { path: "/LandingPage", component: LandingPage, name:"landingPage", meta:{requiresAuth: false}},
    { path: "/PassSet", component: PassSet, name:'passSet', meta:{requiresAuth: false}},
    { path: "/RegPass", component: RegPass, name:'regPass', meta:{requiresAuth: false}},    
    { path: "/Reestablecer", component: Reestablecer, name:'reestablecer', meta:{requiresAuth: false}}, 
    { path: "/Registrar", component: Registrar, name:'registrar', meta:{requiresAuth: false}},      
    { path: "/ResetPass", component: ResetPass, name:'reiniciar', meta:{requiresAuth: false}},        
    {
        path: "/Administrador",
        component: MainAdmin,
        name: "administrador",
        meta:{requiresAuth: true},
        children: [
            //Administrador
            { path: "Bienvenido", component: Welcome, name:"bienvenido" }, //Luiggi
            { path: "Configuración", component: Configuración, name:"configuración" }, //Luiggi
            { path: "Unidades académicas", component: Académicas, name:"unidades" }, //italo
            { path: "Coordinadores", component: Coordinadores, name: "coordinadores" }, //italo
            { path: "Usuarios", component: Usuarios, name:"usuarios"}, //italo
            { path: "Auditoría", component: Welcome, name:"auditoría" },
            { path: "Errores", component: Errores, name:"errores" },            
        ],
    },
    {
        path: "/Coordinador",
        component: MainCoordi,
        beforeEnter(to, from, next){ 
            if(from.name==='login') next()
            else{                
                if(localStorage.getItem("EsCoordinador") === true)next()
                else {        
                    next()
                    /* localStorage.clear(); 
                    next({name:'login'}) */
                }
            }                       
        },
        children: [
            //Coordinador
            { path: "Bienvenido", component: WelcomeCoord }, //Luiggi
            { path: "/Coordinador/Miembros/Tutores", component: Tutores }, //herbert
            { path: "/Coordinador/Miembros/Alumnos", component: Alumnos }, //herbert
            { path: "Tutorías activas", component: Welcome },
            { path: "Tipos de tutoría", component: TipoTutoria }, //luiggi
            { path: "Reportes", component: Reportes },
            { path: "Solicitudes", component: Solicitudes }, //valeria
            { path: "ReporteEncuestas", component: ReporteEncuesta }, //valeria
            { path: "/Coordinador/Miembros/Unidades de apoyo", component: Apoyo }, //valeria
            { path: "/Coordinador/Miembros/Soporte", component: Soporte }, //herbert

        ],
    },
    {
        path: "/Alumno",
        component: MainAlumno,
        beforeEnter(to, from, next){ 
            if(from.name==='login') next()
            else{           
                if(localStorage.getItem("EsAlumno") === true)next()
                else {  
                    next()              
                    /* localStorage.clear(); 
                    next({name:'login'}) */
                }
            }
        },
        children: [
            //Alumno
            { path: "Bienvenido", component: Welcome }, //italo / Herbert
            { path: "Agenda", component: Agenda }, //italo / Herbert
            { path: "Mis Tutorías", component: Tutor }, //italo / Herbert
            { path: "Solicitar Tutor", component: SolicitarTutor }, //italo / Herbert
            { path: "Mis Solicitudes", component: SolicitudesAlumno }, //italo / Herbert
            { path: "Mis Reportes", component: ReportesAlumno }, //italo / Herbert
            { path: "Sesiones", component: SesionesAlumno }, //italo / Herbert
        ],
    },
    {
        path: "/Tutor",
        component: MainTutor,
        beforeEnter(to, from, next){            
            if(from.name==='login') next()
            else{                
                if(localStorage.getItem("EsTutor") === true)next()
                else {                                           
                    next()
                    /* localStorage.clear();            
                    next({name:'login'}) */
                }
            }
        },
        children: [
            //Alumno
            { path: "Bienvenido", component: WelcomeTutor }, //luiggi / valeria / melvin
            { path: "Asignaciones", component: Asignaciones }, //luiggi / valeria / melvin
            { path: "Citas", component: Citas }, //luiggi / valeria / melvin
            { path: "Sesiones", component: Sesiones }, //luiggi / valeria / melvin
            { path: "Solicitudes", component: SolicitudesTutor }, //luiggi / valeria / melvin
            { path: "Alumnos", component: AlumnosTutor }, //luiggi / valeria / melvin
        ],        
    },
];


Vue.use(Router);
const router =  new Router({
    mode: "history", // https://router.vuejs.org/api/#mode
    routes: routes,
}); 

router.beforeEach((to ,from, next)=>{    
    if(to.matched.some((record)=>record.meta.requiresAuth)){
        if (localStorage.getItem("Token")){
            next()
            return
        }
        else{
            next("/Login")
        }
    }
    else{
        next()
    }

})

export default router