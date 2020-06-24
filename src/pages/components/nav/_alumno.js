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
          name: 'Mis Tutorías',
          to: '/Alumno/Mis Tutorías',
          icon: 'cil-user'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Agenda',
          to: '/Alumno/Agenda',
          icon: 'cil-calendar'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Mis Solicitudes',
          to: '/Alumno/Mis Solicitudes',
          icon: 'cil-pencil'
        }, 
        {
          _name: 'CSidebarNavItem',
          name: 'Mis Reportes',
          to: '/Alumno/Mis Reportes',
          icon: 'cil-chartPie'
        }   
    ]
}]