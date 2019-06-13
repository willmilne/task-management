const chai = require('chai');
const expect = chai.expect;

const dateHelper = require('./dateHelper');

describe('dateHelper Tests', () => {
    describe('getNextDay', () => {
        it('should return the next day', () => {
            let result = dateHelper.getNextDay('6/12/2019');
            let expected = '6/13/2019';
            expect(expected).to.equal(result);

            result = dateHelper.getNextDay('6/30/2019');
            expected = '7/1/2019';
            expect(expected).to.equal(result);

            result = dateHelper.getNextDay('12/31/2019');
            expected = '1/1/2020';
            expect(expected).to.equal(result);
        });
        it('should not crash on bad input', () => {
            let result = dateHelper.getNextDay(undefined);
            expect(false).to.equal(result);

            result = dateHelper.getNextDay('bad date!');
            expect(false).to.equal(result);
        });
    });
});