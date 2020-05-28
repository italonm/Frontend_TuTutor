export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Principal',
        to: 'Bienvenido',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Coordinador']
      },            
      {
        _name: 'CSidebarNavDropdown',
        name: 'Miembros',
        route: '/Miembros',
        icon: 'cil-people',
        items: [
          {
            name: 'Alumnos',
            to: 'Alumnos'
          },
          {
            name: 'Profesores',
            to: 'Tutores'
          },          
          {
            name: 'Soporte',
            to: 'Soporte'
          },
          {
            name: 'Unidades de Apoyo',
            to: 'Unidades de Apoyo'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Tipo de tutoría',
        to: '/Tipo de tutoría',
        icon: 'cil-task'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Tutorías Activas',
        to: '/Tutorías Activas',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Solicitudes',
        to: '/Solicitudes',
        icon: 'cil-pencil'
      }                            
      /* {
        _name: 'CSidebarNavItem',
        name: 'Reportes',
        to: '/Reportes',
        icon: 'cil-chartPie'
      }, */      
    ]
  }
]