import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../../pages/Login.vue";
import Main from "../../pages/Main.vue";

// const administrador = [
//     { path: "", component: Login },
//     { path: "/Unidades académicas", component: Login },
//     { path: "/Usuarios", component: Login },
//     { path: "/Auditoría", component: Login },
//     { path: "/Errores", component: Login },
// ];
// const coordinador = [
//     { path: "", component: Login },
//     { path: "/Tutores", component: Login },
//     { path: "/Alumnos", component: Login },
//     { path: "/Tutorías activas", component: Login },
//     { path: "/Tipos de tutoria", component: Login },
//     { path: "/Reportes", component: Login },
// ];
// const tutor = [];
// const alumno = [];
// const soporte = [];
//,children: [administrador, coordinador, tutor, alumno, soporte],
export const routes = [
    { path: "", redirect: "/Principal" },
    { path: "/Login", component: Login },
    {
        path: "/Principal",
        component: Main,
    },
    { path: "*", redirect: "" },
];

Vue.use(VueRouter);
export default new VueRouter({
    routes: routes,
});