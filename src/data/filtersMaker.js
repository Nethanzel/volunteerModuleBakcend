const { Op } = require("sequelize");

function getFilters(params) {
    if (typeof params == 'object') {
        let filters = {};

        Object.keys(params).forEach(k => {
            let c = getCriteria(params[k].type, params[k].value);

            if (params[k].type == 'between' && c.length < 2) {
                filters[k] = { [Op['eq']] : c }
            }
            else {
                filters[k] = { [Op[params[k].type]] : c }
            }
        });

        return filters;
    }
    return null;
}

function getCriteria(op, value) {
    if (op == 'eq') return value
    else if (op == 'like') return `%${value}%`
    else if (op == 'between') {
        value = value.sort((a ,b) => a - b);
        return value;
    }
}

module.exports = {
    getFilters
}