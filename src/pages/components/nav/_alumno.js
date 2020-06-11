export default [
    {
      _name: 'CSidebarNav',
      _children: [
        {
          _name: 'CSidebarNavItem',
          name: 'Principal',
          to: '/Alumno/Bienvenido',
          icon: 'cil-GlobeAlt'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Alumno']
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Agenda',
          to: '/Alumno/Agenda',
          icon: 'cil-calendar'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Tutor',
          to: '/Alumno/Tutor',
          icon: 'cil-user'
        },  
        {
          _name: 'CSidebarNavItem',
          name: 'Historial de Sesiones',
          to: '/Alumno/Historial de Sesiones',
          icon: 'cil-MagnifyingGlass'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Mis Solicitudes',
          to: '/Alumno/Mis Solicitudes',
          icon: 'cil-pencil'
        },    
    ]
}]