export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'Principal',
            to: '/Bienvenido',
            icon: 'cil-speedometer'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Administrador']
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Datos de la institución',
            to: '/Configuración',
            icon: 'cil-speedometer'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Unidades Académicas',
            to: '/Unidades Académicas',
            icon: 'cil-task'
        },
        {
            _name: 'CSidebarNavItem',
            name: 'Usuarios',
            to: '/Usuarios',
            icon: 'cil-task'
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