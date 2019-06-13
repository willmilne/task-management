const moment = require('moment');

// this is taken in in the format 'MM/DD/YYYY'
const getNextDay = (_day) => {
    let day = moment(_day, 'YYYY-MM-DD');
    let nextDay = day.add(1, 'day');
    return nextDay.format('YYYY-MM-DD');
}

module.exports = {
    getNextDay
};