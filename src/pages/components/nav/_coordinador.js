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
            name: 'Tutores',
            to: '/Coordinador/Miembros/Tutores'
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
      {
        _name: 'CSidebarNavItem',
        name: 'Encuestas',
        to: '/Coordinador/ReporteEncuestas',
        icon: 'cil-chartPie'
      }      
    ]
}]