export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Principal',
        to: '/dashboard',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Coordinador']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Programas',
        to: '/Coordinador/Programas',
        icon: 'cil-task'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Miembros',/*Modificacion */
        route: '/TuTutor/Alumnos',
        icon: 'cil-people',
        items: [
          {
            name: 'Alumnos',
            to: '/Tututor/Alumnos'
          },
          {
            name: 'Profesores',
            to: '/Tututor/Tutores'
          },          
          {
            name: 'Soporte',
            to: '/Coordinador/Miembros/Soporte'
          },
          {
            name: 'Unidades de Apoyo',
            to: '/Coordinador/Miembros/Unidades de Apoyo'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Solicitudes',
        to: '/Coordinador/Solicitudes',
        icon: 'cil-pencil'
      },      
      {
        _name: 'CSidebarNavItem',
        name: 'Tutorías Activas',
        to: '/Coordinador/Tutorías Activas',
        icon: 'cil-pencil'
      },    
        
      {
        _name: 'CSidebarNavItem',
        name: 'Reportes',
        to: '/Coordinador/Reportes',
        icon: 'cil-chartPie'
      },      
    ]
  }
]