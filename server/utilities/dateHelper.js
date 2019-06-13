const moment = require('moment');

// this is taken in in the format 'MM/DD/YYYY'
const getNextDay = (_day) => {
    let day = moment(day);
    let nextDay = day.add(1, 'day');
    return nextDay.format('MM/DD/YYYY');
}

module.exports = {
    getNextDay
};