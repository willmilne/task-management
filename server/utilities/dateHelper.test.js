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
            let result2 = dateHelper.getNextDay('not the right thing');
            expect(result2).to.equal('Invalid date');

            result2 = dateHelper.getNextDay('bad date!');
            expect(result2).to.equal('Invalid date');

            expect('Invalid date').to.equal(dateHelper.getNextDay(undefined));
        });
        it('should not mutate the incoming date', () => {
            let dateString = '6/12/2019';
            expect('6/13/2019').to.equal(dateHelper.getNextDay(dateString));
            expect('6/12/2019').to.equal(dateString);
        });
    });

    describe('isBefore', () => {
        it('should return true if date a is before date b', () => {
            let a = '6/12/2019';
            let b = '6/13/2019';

            expect(true).to.equal(dateHelper.isBefore(a, b));
        });
        it('should return false if date a is the same as or after date b', () => {
            let a = '6/12/2019';
            let b = '6/13/2019';

            expect(false).to.equal(dateHelper.isBefore(b, a));
            expect(false).to.equal(dateHelper.isBefore(a, a));
        });
    });
});