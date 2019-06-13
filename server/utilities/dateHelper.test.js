const chai = require('chai');
const expect = chai.expect;
const moment = require('moment');

const dateHelper = require('./dateHelper');

describe('dateHelper Tests', () => {
    describe('getNextDay', () => {
        it('should return the next day', () => {
            let result = dateHelper.getNextDay('2019-06-12');
            let expected = '2019-06-13';
            expect(expected).to.equal(result);

            result = dateHelper.getNextDay('2019-06-30');
            expected = '2019-07-01';
            expect(expected).to.equal(result);

            result = dateHelper.getNextDay('2019-12-31');
            expected = '2020-01-01';
            expect(expected).to.equal(result);
        });
        it('should not crash on bad input', () => {
            let result2 = dateHelper.getNextDay('not the right thing');
            expect(result2).to.equal('Invalid date');

            result2 = dateHelper.getNextDay('bad date!');
            expect(result2).to.equal('Invalid date');

            expect('Invalid date').to.equal(dateHelper.getNextDay(undefined));
        });

    });
});