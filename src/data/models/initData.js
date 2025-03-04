const { createGrado, createTipoMiembro, createEscuela } = require("../methods/creators.js");

const Levels = {
    "principiante": {
        color: null,
        name: "Principiante",
        description: ""
    },
    "verde": {
        color: '00e634',
        name: "Verde",
        description: ""
    },
    "azul": {
        color: '0066ff',
        name: "Azul",
        description: ""
    },
    "morado": {
        color: '8b00ff',
        name: "Morado",
        description: "",
        prefix: "Avanzado"
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
        description: "Miembros que participan activamente en las actividades y prácticas"
    },
    "pasivo": {
        name: "Pasivo",
        description: "Miembros que nunca participan o participan ocasionalmente en las actividades"
    },
    "benefactor ": {
        name: "Benefactor",
        description: "Personas que apoyan las actividades sin tomar parte activa en estas"
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

