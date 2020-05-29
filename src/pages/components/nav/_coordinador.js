export default [{
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Principal',
        to: '/TuTutor/Bienvenido',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Coordinador']
      },            
      {
        _name: 'CSidebarNavDropdown',
        name: 'Miembros',
        route: '/TuTutor/Miembros',
        icon: 'cil-people',
        items: [
          {
            name: 'Alumnos',
            to: '/TuTutor/Miembros/Alumnos'
          },
          {
            name: 'Profesores',
            to: '/TuTutor/Miembros/Tutores'
          },          
          {
            name: 'Soporte',
            to: '/TuTutor/Miembros/Soporte'
          },
          {
            name: 'Unidades de Apoyo',
            to: '/TuTutor/Miembros/Unidades de Apoyo'
          }
        ]
      },      
      {
        _name: 'CSidebarNavItem',
        name: 'Coordinadores',
        to: '/TuTutor/Coordinadores',
        icon: 'cil-task'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Tipo de tutoría',
        to: '/TuTutor/Tipos de tutoría',
        icon: 'cil-task'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Tutorías Activas',
        to: '/TuTutor/Tutorías Activas',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Solicitudes',
        to: '/TuTutor/Solicitudes',
        icon: 'cil-pencil'
      }                            
      /* {
        _name: 'CSidebarNavItem',
        name: 'Reportes',
        to: '/Reportes',
        icon: 'cil-chartPie'
      }, */      
    ]
}]