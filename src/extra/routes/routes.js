//COMPONENTES DE ADMINISTRADOR
import Configuración from '../../Usuarios/Administrador/Configuración/Configuración'
/* import Auditoría from '../../Usuarios/Administrador/Auditoría' */
/* import Errores from '../../Usuarios/Administrador/Errores' */
import Académicas from '../../Usuarios/Administrador/Unidades académicas/Unidades académicas'
import Usuarios from '../../Usuarios/Administrador/Usuarios/Usuarios'
import Coordinadores from '../../Usuarios/Administrador/Coordinadores/Coordinadores.vue'
//COMPONENTES DE COORDINADOR
import Alumnos from '../../Usuarios/Coordinador/Alumnos/Alumnos'
import Tutores from '../../Usuarios/Coordinador/Tutores/Tutores'
import TipoTutoria from '../../Usuarios/Coordinador/Tipos de tutoría/TipoTutoria'
import Tutorías from '../../Usuarios/Coordinador/Tutorías/Tutorías'
import Solicitudes from '../../Usuarios/Coordinador/Solicitudes/Solicitudes'
import Soporte from '../../Usuarios/Coordinador/Soporte/Soporte'
import Apoyo from '../../Usuarios/Coordinador/Unidades de apoyo/Unidades de apoyo'
//POR IMPLEMENTAR EN EL SIGUIENTE SPRINT
/* import Reportes from '../Coordinador/Reportes' */
/* import Programas from '../../Usuarios/Coordinador/Alumnos/Alumnos' */
//COMPONENTE BIENVENIDOS
import Bienvenido from '../../Usuarios/Welcome'

export const rutitas = {
    admin: [{
            path: 'Bienvenido',
            name: 'Bienvenido',
            component: Bienvenido
        },
        {
            path: 'Configuración',
            name: 'Configuración',
            component: Configuración
        },
        {
            path: 'Unidades Académicas',
            name: 'Unidades Académicas',
            component: Académicas
        },
        {
            path: 'Usuarios',
            name: 'Usuarios',
            component: Usuarios
        },
        {
            path: 'Coordinadores',
            name: 'Coordinadores',
            component: Coordinadores
        },
        /* ,
        {
          path: 'Auditoría',
          name: 'Auditoría',
          component: Auditoría
        },
        {
          path: 'Errores',
          name: 'Errores',
          component: Errores
        } */
    ],
    coordi: [{
            path: 'Bienvenido',
            name: 'Bienvenido',
            component: Bienvenido
        },
        {
            path: 'Miembros',
            name: 'Miembros',
            component: {
                render(c) { return c('router-view') }
            },
            children: [{
                    path: 'Alumnos',
                    name: 'Alumnos',
                    component: Alumnos
                },
                {
                    path: 'Tutores',
                    name: 'Tutores',
                    component: Tutores
                },
                {
                    path: 'Soporte',
                    name: 'Soporte',
                    component: Soporte
                },
                {
                    path: 'Unidades de apoyo',
                    name: 'Unidades de apoyo',
                    component: Apoyo
                }
            ]
        },
        {
            path: 'Tipo de tutoría',
            name: 'Tipo de tutoría',
            component: TipoTutoria
        },
        {
            path: 'Tutorías Activas',
            name: 'Tutorías Activas',
            component: Tutorías
        },
        /*{
          path: 'Reportes',
          name: 'Reportes',
          component: Reportes
        }, */
        {
            path: 'Solicitudes',
            name: 'Solicitudes',
            component: Solicitudes
        }
    ]
}

import Vue from 'vue'
import Router from 'vue-router'

// LOGIN
import Login from '../../pages/Login/Login.vue'

Vue.use(Router)
export const RutaLogin = [{
        name: 'Inicio',
        path: '',
        redirect: '/TuTutor?#',
    },
    {
        name: 'Login',
        path: '/TuTutor?#',
        component: Login
    }
]

export default new Router({
    mode: 'history', // https://router.vuejs.org/api/#mode
    routes: RutaLogin,
})