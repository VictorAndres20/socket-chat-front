const hbs = require('hbs');
const path = require('path')

const registerPartials = () => {
    hbs.registerPartials(path.join(__dirname,'../../views/partials'));
}

const registerHelpers = () => {
    hbs.registerHelper('getActualYear',require('../helpers/dateHelper').getActualYear);
}

module.exports = {
    registerPartials,
    registerHelpers
}