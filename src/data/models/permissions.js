const PermissionsList = [
    {
        description: "Consultar voluntario",
        key: "QV"
    },
    {
        description: "Visualizar voluntario",
        key: "VV"
    },
    {
        description: "Consultar todos los voluntarios",
        key: "QVL"
    },
    {
        description: "Crear estacion",
        key: "CS"
    },
    {
        description: "Crear departamento",
        key: "CD"
    },
    {
        description: "Crear tipo voluntario",
        key: "CVT"
    },
    {
        description: "Actualizar voluntario",
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
        description: "Restaurar elementos",
        key: "RDE"
    },
    {
        description: "Restaurar archivos",
        key: "RDF"
    },
    {
        description: "Borrar estacion",
        key: "DE"
    },
    {
        description: "Borrar departamento",
        key: "DD"
    },
    {
        description: "Borrar tipo voluntario",
        key: "DVT"
    },
    {
        description: "Actualizar departamento",
        key: "UD"
    },
    {
        description: "Actualizar tipo voluntario",
        key: "UVT"
    },
    {
        description: "Actualizar estacion",
        key: "US"
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
    }
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