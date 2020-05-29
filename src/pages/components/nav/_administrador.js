export default [
    {
      _name: 'CSidebarNav',
      _children: [
        {
          _name: 'CSidebarNavItem',
          name: 'Principal',
          to: '/TuTutor/Bienvenido',
          icon: 'cil-GlobeAlt'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Administrador']
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Datos de la institución',
          to: '/TuTutor/Configuración',
          icon: 'cil-settings'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Unidades Académicas',
          to: '/TuTutor/Unidades Académicas',
          icon: 'cil-list'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Usuarios',
          to: '/TuTutor/Usuarios',
          icon: 'cil-people'
        },  
        {
          _name: 'CSidebarNavItem',
          name: 'Coordinadores',
          to: '/TuTutor/Coordinadores',
          icon: 'cil-user'
        }, 
        /* {
          _name: 'CSidebarNavItem',
          name: 'Auditoría',
          to: '/Auditoría',
          icon: 'cil-task'
        },    */
        /* {
          _name: 'CSidebarNavItem',
          name: 'Errores',
          to: '/Errores',
          icon: 'cil-pencil'
        }, */
    ]
}]