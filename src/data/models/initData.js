const { createDepartamento, createTipoVoluntario, createEstacion } = require("../methods.js");

const Departments = {
    "socorro": {
        name: "Socorro y Gestión del Riesgo",
        description: "description goes here"
    },
    "juventud": {
        name: "Juventud",
        description: "description goes here"
    },
    "salud": {
        name: "Salud Comunitaria",
        description: "description goes here"
    },
    "doctrina": {
        name: "Doctrina y Protección",
        description: "description goes here"
    }
}
async function InsertDepartments() {
    for(let prop in Departments) {
        await createDepartamento({
            departamento: Departments[prop].name,
            descripcion: Departments[prop].description
        });
    }
}

const MemberType = {
    "activo": {
        name: "Activo",
        description: "description goes here"
    },
    "pasivo": {
        name: "Pasivo",
        description: "description goes here"
    },
    "suscriptor": {
        name: "Suscriptor",
        description: "description goes here"
    },
}
async function InsertTypes() {
    for(let prop in MemberType) {
        await createTipoVoluntario({
            tipo: MemberType[prop].name,
            descripcion: MemberType[prop].description
        });
    }
}

const Stations = {
    "40": {
        numero: 40,
        provincia: "Distrito Nacional",
        municipio: "Santo Domingo Este"
    },
    "82": {
        numero: 82,
        provincia: "Distrito Nacional",
        municipio: "Santo Domingo Este"
    }
}
async function InsertStations() {
    for(let prop in Stations) {
        await createEstacion(Stations[prop]);
    }
}

module.exports = {
    InsertDepartments,
    InsertTypes,
    InsertStations
}