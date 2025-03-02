const { createDepartamento, createTipoVoluntario, createEstacion } = require("../methods/creators.js");

const Departments = {
    "socorro": {
        name: "Socorro y Gestión del Riesgo",
        description: "Liderar los esfuerzos para construir familias y comunidades capaces de reducir el impacto de los desastres, así como, planificar, organizar y llevar a cabo los planes de respuesta para la atención humanitaria de la población afectada por los desastres en su municipio."
    },
    "juventud": {
        name: "Juventud",
        description: "La unidad de Juventud lidera las acciones que movilizan la juventud (8 a 28 años) la filial, como agentes de cambio orientados hacia el logro de una cultura de paz, solidaridad, participación, respeto del medioambiente y vida saludable."
    },
    "salud": {
        name: "Salud Comunitaria",
        description: "Liderar el accionar de salud comunitaria y atención directa en salud de la filial, hacia la población meta, mediante la promoción, prevención, recuperación y rehabilitación de la salud de las personas, familias y comunidades."
    },
    "doctrina": {
        name: "Doctrina y Protección",
        description: "Liderar el accionar encaminado a preservar la dignidad, el acceso, la participación y la seguridad de las personas, a través de acciones de protección y doctrina del área misional."
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
        description: "Miembro que participa activamente en las actividades"
    },
    "pasivo": {
        name: "Pasivo",
        description: "Miembro que participa ocasionalmente en las actividades"
    },
    "suscriptor": {
        name: "Suscriptor",
        description: "Persona que apoya las actividades sin participar en estas"
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
        provincia: 102,
        municipio: 102
    },
    "82": {
        numero: 82,
        provincia: 102,
        municipio: 102
    }
}
async function InsertStations() {
    for(let prop in Stations) {
        await createEstacion(Stations[prop]);
    }
}

/* WARNING: Only run commented lines if you're willing to lose all the data in the database */
/* InsertTypes()
InsertStations()
InsertDepartments() */

module.exports = {
    InsertTypes,
    InsertStations,
    InsertDepartments
}

