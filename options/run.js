const { calcularEdad, titleCase } = require('../src/reports/assets/utils')

const municipios = require('../src/reports/assets/municipios.json');
const provincias = require('../src/reports/assets/provincias.json');

const data = require('./members.json');
let requiredMembers = [];

for (let i = 0; i < data.length; i++) {
    const member = data[i];
    if (calcularEdad(member.nacimiento) >= 18) {
        let memberMun = municipios.find(x => x.municipio_id == member.municipio); 
        let memberProv = provincias.find(x => x.provincia_id == memberMun?.provincia_id ?? 0);

        member.provincia = memberProv?.provincia;
        member.municipio_ = titleCase(memberMun?.municipio);

        requiredMembers.push(member);
    }
}

for (let i = 0; i < requiredMembers.length; i++) {
    const member = requiredMembers[i];
    member.enunciado = `${i+1}) ${member.nombre?.trimEnd()} ${member.apellido?.trimEnd()}, dominicano, mayor de edad, estado civil _______, ocupación: ${member.ocupacion?.trimEnd()}, titular de la cédula de identidad y electoral No. ${member.identity}, residente en la Calle ${member.calle?.trimEnd()}, no. ${member.casa?.trimEnd()}, Sector ${member.sector?.trimEnd()}, Municipio ${member.municipio_?.trimEnd()}, Provincia ${member.provincia?.trimEnd()}, R.D. `;
    console.log(member.enunciado + '\n');
}


console.log(requiredMembers.length);