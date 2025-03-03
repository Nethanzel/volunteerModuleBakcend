const { createGrado, createTipoMiembro, createEscuela } = require("../methods/creators.js");

const Levels = {
    "novato": {
        color: null,
        name: "Ninguno",
        description: "Liderar los esfuerzos para construir familias y comunidades capaces de reducir el impacto de los desastres, así como, planificar, organizar y llevar a cabo los planes de respuesta para la atención humanitaria de la población afectada por los desastres en su municipio."
    },
    "verde": {
        color: '00e634',
        name: "Verde",
        description: "La unidad de Juventud lidera las acciones que movilizan la juventud (8 a 28 años) la filial, como agentes de cambio orientados hacia el logro de una cultura de paz, solidaridad, participación, respeto del medioambiente y vida saludable."
    },
    "azul": {
        color: '0066ff',
        name: "Azul",
        description: "Liderar el accionar de salud comunitaria y atención directa en salud de la filial, hacia la población meta, mediante la promoción, prevención, recuperación y rehabilitación de la salud de las personas, familias y comunidades."
    },
    "morado": {
        color: '8b00ff',
        name: "Morado",
        description: "Liderar el accionar encaminado a preservar la dignidad, el acceso, la participación y la seguridad de las personas, a través de acciones de protección y doctrina del área misional."
    }
}

async function InsertLevels() {
    for(let prop in Levels) {
        await createGrado({
            grado: Levels[prop].name,
            color: Levels[prop].color,
            descripcion: Levels[prop].description
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
        await createTipoMiembro({
            tipo: MemberType[prop].name,
            descripcion: MemberType[prop].description
        });
    }
}

const Schools = {
    "1": {
        nombre: "Parque del Este",
        provincia: 102,
        municipio: 102
    },
    "2": {
        nombre: "Las Asturias",
        provincia: 102,
        municipio: 102
    }
}
async function InsertSchools() {
    for(let prop in Schools) {
        await createEscuela(Schools[prop]);
    }
}

/* WARNING: Only run commented lines if you're willing to lose all the data in the database */
/* InsertTypes()
InsertSchools()
InsertLevels() */

module.exports = {
    InsertTypes,
    InsertSchools,
    InsertLevels
}

