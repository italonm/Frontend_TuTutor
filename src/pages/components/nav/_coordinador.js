export default [{
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Principal',
        to: '/Coordinador/Bienvenido',
        icon: 'cil-GlobeAlt'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Coordinador']
      },            
      {
        _name: 'CSidebarNavDropdown',
        name: 'Miembros',
        route: '/Coordinador/Miembros',
        icon: 'cil-people',
        items: [
          {
            name: 'Alumnos',
            to: '/Coordinador/Miembros/Alumnos'
          },
          {
            name: 'Profesores',
            to: '/Coordinador/Miembros/Tutores'
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
        name: 'Tipo de tutoría',
        to: '/Coordinador/Tipos de tutoría',
        icon: 'cil-list'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Tutorías Activas',
        to: '/Coordinador/Tutorías Activas',
        icon: 'cil-CheckCircle'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Solicitudes',
        to: '/Coordinador/Solicitudes',
        icon: 'cil-EnvelopeClosed'
      },                            
      {
        _name: 'CSidebarNavItem',
        name: 'Reportes',
        to: '/Coordinador/Reportes',
        icon: 'cil-chartPie'
      },      
    ]
}]