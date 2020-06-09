export default [
    {
      _name: 'CSidebarNav',
      _children: [
        {
          _name: 'CSidebarNavItem',
          name: 'Principal',
          to: '/Tutor/Bienvenido',
          icon: 'cil-GlobeAlt'
        },
        {
            _name: 'CSidebarNavTitle',
            _children: ['Tutor']
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Asignaciones',
          to: '/Tutor/Asignaciones',
          icon: 'cil-people'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Citas',
          to: '/Tutor/Citas',
          icon: 'cil-calendar'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Sesiones',
          to: '/Tutor/Sesiones',
          icon: 'cil-task'
        },  
        {
          _name: 'CSidebarNavItem',
          name: 'Solicitudes',
          to: '/Tutor/Solicitudes',
          icon: 'cil-pencil'
        }, 
        {
          _name: 'CSidebarNavItem',
          name: 'Alumnos',
          to: '/Tutor/Alumnos',
          icon: 'cil-user'
        },   
    ]
}]