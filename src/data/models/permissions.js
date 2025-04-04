const PermissionsList = [
    {
        description: "Consultar miembro",
        key: "QV"
    },
    {
        description: "Visualizar miembro",
        key: "VV"
    },
    {
        description: "Consultar todos los miembros",
        key: "QVL"
    },
    {
        description: "Actualizar miembro",
        key: "UV"
    },
    {
        description: "Permitir acceso",
        key: "AA"
    },
    {
        description: "Asignar permisos",
        key: "GP"
    },
    {
        description: "Quitar permisos",
        key: "RP"
    },
    {
        description: "Agregar contacto emergencia",
        key: "AEC"
    },
    {
        description: "Agregar informacion academica",
        key: "AAI"
    },
    {
        description: "Borrar contacto emergencia",
        key: "DEC"
    },
    {
        description: "Borrar informacion academica",
        key: "DAI"
    },
    {
        description: "Consultar Informacion Borrada",
        key: "QDI"
    },
    {
        description: "Restaurar archivos",
        key: "RDF"
    },
    /* {
        description: "Consultar grados",
        key: "QD" NO SE REQUIERE PORQUE ES UNA CONSULTA ABIERTA
    }, */
    {
        description: "Crear grado",
        key: "CD"
    },
    {
        description: "Borrar grado",
        key: "DD"
    },
    {
        description: "Actualizar grado",
        key: "UD"
    },
    {
        description: "Restaurar grado",
        key: "RD"
    },
    {
        description: "Visualizar grados",
        key: "VD"
    },
    /* {
        description: "Consultar tipo miembro",
        key: "QVT" NO SE REQUIERE PORQUE ES UNA CONSULTA ABIERTA
    }, */
    {
        description: "Crear tipo miembro",
        key: "CVT"
    },
    {
        description: "Borrar tipo miembro",
        key: "DVT"
    },
    {
        description: "Actualizar tipo miembro",
        key: "UVT"
    },
    {
        description: "Restaurar tipo miembro",
        key: "RVT"
    },
    {
        description: "Visualizar tipo miembros",
        key: "VVT"
    },
/*     {
        description: "Consultar escuelas",
        key: "QS" NO SE REQUIERE PORQUE ES UNA CONSULTA ABIERTA
    }, */
    {
        description: "Crear escuela",
        key: "CS"
    },
    {
        description: "Actualizar escuela",
        key: "US"
    },
    {
        description: "Borrar escuela",
        key: "DE"
    },
    {
        description: "Restaurar escuela",
        key: "RE"
    },
    {
        description: "Visualizar escuelas",
        key: "VE"
    },
    {
        description: "Consultar archivos",
        key: "QF"
    },
    {
        description: "Consultar archivo borrado",
        key: "QDF"
    },
    {
        description: "Agregar archivos",
        key: "AF"
    },
    {
        description: "Borrar archivos",
        key: "EF"
    },
    {
        description: "Actualizar archivo",
        key: "UF"
    },
    {
        description: "Descargar archivo",
        key: "DF"
    },
    {
        description: "Visualizar registro sin confirmar",
        key: "VNC"
    },
    {
        description: "Resturar usuarios",
        key: "RDU"
    },
    {
        description: "Confirmar informacion de usuarios",
        key: "CUI"
    },
    {
        description: "Borrar usuarios",
        key: "DU"
    },
    {
        description: "Crear highlight",
        key: "CH"
    },
    {
        description: "Borrar highlight",
        key: "DH"
    },
    {
        description: "Actualizar highlight",
        key: "UH"
    },
    {
        description: "Restaurar highlight",
        key: "RDH"
    },
    {
        description: "Consultar highlights",
        key: "QH"
    },
    {
        description: "Crear horario de práctica",
        key: "CPS"
    },
    {
        description: "Borrar horario de práctica",
        key: "DPS"
    },
    {
        description: "Actualizar horario de práctica",
        key: "UPS"
    },
    {
        description: "Restaurar horario de práctica",
        key: "RPS"
    },
    {
        description: "Consultar horario de práctica",
        key: "QPS"
    },
    {
        description: "Crear práctica",
        key: "CPR"
    },
    {
        description: "Consultar prácticas",
        key: "QPR"
    },
    {
        description: "Restaurar prácticas",
        key: "RPR"
    },
    {
        description: "Borrar prácticas",
        key: "DPR"
    },
    {
        description: "Actualizar prácticas",
        key: "UPR"
    },
    {
        description: "Generar formulario de miembro",
        key: "PMF"
    },
    {
        description: "Generar listado de miembros",
        key: "PML"
    },
]

function validatePermission(requiredKeys) {
    return (req, res, next) => {
        let userHas = req.user.permissions?.filter((p) => requiredKeys.includes(p));
        
        if (!arraysAreEqual(userHas, requiredKeys)) {
            let userNotHas = requiredKeys.filter((p) => !req.user.permissions?.includes(p));

            let requiredPermissionsText = "";
            let requiredPermissions = PermissionsList.filter((pe) => userNotHas.includes(pe.key));
            requiredPermissions.map((p, i) => requiredPermissionsText += `\t(${i+1}) - ${p.description}.\n`);

            return res.status(403).send({ code: 403, message: `Permiso(s) requerido(s):\n ${requiredPermissionsText}` });
        }

        next();
    }
}

function isAllowedToPermission(requiredKeys, permissions) {
    let userHas = permissions?.filter((p) => requiredKeys.includes(p));
    if (!arraysAreEqual(userHas, requiredKeys)) return false;
    return true;
}

const arraysAreEqual = (arr1, arr2) =>
    arr1?.length === arr2?.length &&
    [...arr1 ?? []].sort().every((val, index) => val === [...arr2 ?? []].sort()[index]);

module.exports = {
    PermissionsList,
    validatePermission,
    isAllowedToPermission
}