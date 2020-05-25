export default [{
    _name: "CSidebarNav",
    _children: [{
            _name: "CSidebarNavItem",
            name: "Principal",
            to: "/dashboard",
            icon: "cil-task",
        },
        {
            _name: "CSidebarNavTitle",
            _children: ["Administrador"],
        },
        {
            _name: "CSidebarNavItem",
            name: "Unidades Académicas",
            to: "/Administrador/Unidades Académicas",
            icon: "cil-task",
        },
        {
            _name: "CSidebarNavItem",
            name: "Usuarios",
            to: "/Administrador/Usuarios",
            icon: "cil-task",
        },
        {
            _name: "CSidebarNavItem",
            name: "Auditoría",
            to: "/Administrador/Auditoría",
            icon: "cil-task",
        },
        {
            _name: "CSidebarNavItem",
            name: "Errores",
            to: "/Administrador/Errores",
            icon: "cil-pencil",
        },
    ],
}, ];