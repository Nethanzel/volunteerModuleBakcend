const provincias = require("./provincias.json");
const municipios = require("./municipios.json");
const { trainingTypes } = require("../../data/models/dictionaries/trainingTypes");

function calcularEdad(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    const dia = hoy.getDate() - fechaNac.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) edad--;

    return edad;
}

function formatDate(date, onlyDate = false) {
    if(date != undefined && date != null) {
        date = date.toString().trim();
        let dateInstance = new Date(date);
        dateInstance = new Date(dateInstance.setHours(dateInstance.getHours() + 8));
        
        let month = `${dateInstance.getMonth() + 1}`.padStart(2,"0");
        let day = `${dateInstance.getDate()}`.padStart(2,"0");
        let year = `${dateInstance.getFullYear()}`;

        let hour = `${dateInstance.getHours()}`.padStart(2,"0");
        let minutes = `${dateInstance.getMinutes()}`.padStart(2,"0");
        let seconds = `${dateInstance.getSeconds()}`.padStart(2,"0");

        let resultDate = `${day}/${month}/${year}`;

        if (onlyDate) return resultDate;

        return `${resultDate} a las ${hour}:${minutes}:${seconds}`;
    }
    return "No hay fecha"
}

function titleCase(texto) {
    if (!texto) return texto;

    return texto
        .toLowerCase() // Convertimos todo a minúsculas
        .split(" ") // Dividimos en palabras
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)) // Capitalizamos cada palabra
        .join(" "); // Unimos nuevamente
}

function formatIdentification(input) {
    if (!input) return;
    // Elimina cualquier caracter que no sea un número
    let digits = input.replace(/\D/g, '');
    // Verifica que al menos tenga la cantidad mínima de caracteres
    if (digits.length != 11) return input;
    // Aplica el formato XXX-XXXXXXX-X
    return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10, 11)}`;
}

function formatPhoneNumber(input) {
    if (!input) return;
    // Elimina cualquier caracter que no sea un número
    let digits = input.replace(/\D/g, '');
    // Verifica que tenga al menos 10 dígitos
    if (digits.length != 10) return input;
    // Aplica el formato (XXX) XXX-XXXX
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function convertToBase64(texto) {
    if (!texto) return;

    const buffer = Buffer.from(texto, 'utf8');
    const base64 = buffer.toString('base64');
    return base64;
}

function convertFromBase64(base64) {
    const buffer = Buffer.from(base64, 'base64');
    const texto = buffer.toString('utf8');
    return texto;
}

function prepMember(member) {
    const edad = calcularEdad(member.nacimiento);

    member.identity = formatIdentification(member.identity);
    member.nacimiento = formatDate(member.nacimiento, true) + " (" + edad + " años)";
    member.lugarNacimiento = provincias.find(p => p.provincia_id == member.lugarNacimiento).provincia;
    
    member.otroPais = member.otherCountry ? "Si" : "No";
    if (!member.otherCountry) {
        member.provincia = provincias.find(p => p.provincia_id == municipios.find(m => m.municipio_id == member.municipio).provincia_id).provincia;
        member.municipio = titleCase(municipios.find(m => m.municipio_id == member.municipio).municipio);
    }

    member.celular = formatPhoneNumber(member.celular);
    member.telefonoFijo = formatPhoneNumber(member.telefonoFijo);

    if (member.interested) {
        member.interested = trainingTypes.find(x => x.id == member.interested).name;
    }

    member.contactoEmergencia?.forEach(contact => {
        contact.phone = formatPhoneNumber(contact.phone);
    });

    member.tutorInfo?.forEach(contact => {
        contact.phone = formatPhoneNumber(contact.phone);
        contact.otherPhone = formatPhoneNumber(contact.otherPhone);

    });

    member.otrasArtesMarciales = member.otherMartialArt ? "Si" : "No";
    member.tieneUniforme = member.hasIdentification ? "Si" : "No";
    member.seguro = member.assurance ? "Si" : "No";
    member.alergies = member.alergia ? "Si" : "No";
    member.sick = member.enfermedad ? "Si" : "No";
    member.isMinorAged = edad <= 17;

    member.referenceCode = `http://${process.env.HOST}/confirm-member?id=${convertToBase64(member.referenceCode)}`;
    member.queryTime = formatDate(new Date(), true);

    return member;
}

function prepMembers(members) {
    members.rows.forEach((member, i) => {
        const edad = calcularEdad(member.nacimiento);

        member.celular = formatPhoneNumber(member.celular);
        member.telefonoFijo = formatPhoneNumber(member.telefonoFijo);
        member.nacimiento = formatDate(member.nacimiento, true);
        member.edad = edad + " años";

        if (!member.otherCountry) {
            member.provincia = provincias.find(p => p.provincia_id == municipios.find(m => m.municipio_id == member.municipio)?.provincia_id)?.provincia;
            member.municipio = titleCase(municipios.find(m => m.municipio_id == member.municipio)?.municipio);
        }

        member.pos = i +1;
        member.classIndex = member.pos % 2;
    });

    members.queryTime = formatDate(new Date(), true);

    return members;
}

module.exports = {
    prepMember,
    prepMembers,
    convertFromBase64
}