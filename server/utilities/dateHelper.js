const moment = require('moment');

// this is taken in in the format 'MM/DD/YYYY'
const getNextDay = (_day) => {
    let day = moment(_day, 'M/D/YYYY');
    let nextDay = day.add(1, 'day');
    return nextDay.format('M/D/YYYY');
}

const isBefore = (_date1, _date2) => {
    let d1 = moment(_date1, 'M/D/YYYY');
    let d2 = moment(_date2, 'M/D/YYYY');

    return moment(d1).isBefore(d2);
}

module.exports = {
    getNextDay,
    isBefore
};