const { Voluntario, Estacion, Departamento, TipoVoluntario } = require("../models/index.js");

async function setVolunteerField(params) {
    try {
        let res = await Voluntario.update(params.field, { where: { id: params.id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        if(e.parent.code == 'ER_DUP_ENTRY') return {
            result: false,
            message: "El valor ya existe para otro registro",
            code: 400
        }

        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function setStacionField(params) {
    try {
        let res = await Estacion.update(params.field, { where: { id: params.id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function setDepartmentField(params) {
    try {
        let res = await Departamento.update(params.field, { where: { id: params.id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function setUserTypeField(params) {
    try {
        let res = await TipoVoluntario.update(params.field, { where: { id: params.id }});
        return {
            result: res > 0,
            message: null,
            code: res > 0 ? 204 : 503
        };
    }
    catch (e) {
        return {
            result: false,
            message: "No se pudo guardar el cambio",
            code: 503
        }
    }
}

async function managePermissions(params, add) {
    let user = await Voluntario.findOne({ where: { id: params.id }});

    if (add) {
        if (!user.permissions) user.permissions = params.key
        else user.permissions += `,${params.key}`;
    }
    else {
        let p = user.permissions?.split(',') ?? [];
        p.splice(p.indexOf(params.key), 1);
        user.permissions = p.join(',');
    }

    let res = await Voluntario.update({ permissions: user.permissions }, { where: { id: params.id }});
    return res > 0;
}

async function manageEmergencyContacts(params, add) {
    try {
        let user = await Voluntario.findOne({ where: { id: params.id }});

        if (!user) return { result: false, message: 'Usuario no encontrado', code: 404 }

        let contacts = user.contactoEmergencia == null ? [] : user.contactoEmergencia;
        
        if (add) {
            if (contacts.find(x => x.name == params.record.name)) return {
                result: false,
                message: "Ya existe un contacto con ese nombre",
                code: 400
            }

            if (contacts.find(x => x.phone == params.record.phone)) return {
                result: false,
                message: "Ya existe un contacto con ese telefono",
                code: 400
            }

            contacts.push(params.record);
            user.contactoEmergencia = contacts;
        }
        else {
            let index = contacts.findIndex(contact => 
                contact.name === params.record.name 
                && contact.phone === params.record.phone 
                && contact.relation === params.record.relation
            );
            
            contacts.splice(index, 1);
            user.contactoEmergencia = contacts;
        }

        let res = await Voluntario.update({ contactoEmergencia: user.contactoEmergencia }, { where: { id: params.id }});
        if (res > 0) return { result: true, message: null, code: res > 0 ? 204 : 503 }

        return { result: false, message: 'No se pudo guardar el cambio', code: 503 }
    }
    catch (e) {
        if(e.parent?.code == 'ER_DATA_TOO_LONG') return {
            result: false,
            message: "No se pueden agregar más contactos",
            code: 503
        }

        return { result: false, message: 'No se pudo guardar el cambio', code: 503 }
    }
}

async function manageAcademicPrep(params, add) {
    try {
        let user = await Voluntario.findOne({ where: { id: params.id }});

        if (!user) return { result: false, message: 'Usuario no encontrado', code: 404 }

        let studies = user.estudios == null ? [] : user.estudios;
        
        if (add) {
            studies.push(params.record);
            user.estudios = studies;
        }
        else {
            let index = studies.findIndex(c => c.age === params.record.age && c.grade === params.record.grade && c.place === params.record.place);
            studies.splice(index, 1);
            user.estudios = studies;
        }

        let res = await Voluntario.update({ estudios: user.estudios }, { where: { id: params.id }});
        if (res > 0) return { result: true, message: null, code: res > 0 ? 204 : 503 }

        return { result: false, message: 'No se pudo guardar el cambio', code: 503 }
    }
    catch (e) {
        if(e.parent?.code == 'ER_DATA_TOO_LONG') return {
            result: false,
            message: "No se pueden agregar más estudios",
            code: 503
        }

        return { result: false, message: 'No se pudo guardar el cambio', code: 503 }
    }
}

module.exports = {
    setVolunteerField,
    managePermissions,
    manageEmergencyContacts,
    manageAcademicPrep,
    setStacionField,
    setDepartmentField,
    setUserTypeField
}