const chai = require('chai');
const expect = chai.expect;

const { Task } = require('./Task');

describe('task tests', () => {
    describe('constructor', () => {
        it('should properly initialize the parameters', () => {
            let task = new Task('namestring', 'descriptionstring', '1/1/2019');
            expect(task.completed).to.equal(false);
            expect(task.name).to.equal('namestring');
            expect(task.description).to.equal('descriptionstring');
            expect(task.due).to.equal('1/1/2019');
            expect(task.id).to.equal(-1);
        });
    });

    describe('update', () => {
        it('should correctly update the appropriate fields',() => {
            let task = new Task('namestring', 'descriptionstring', '1/1/2019');
            
            task.update('newName!', 'new description', '1/2/2019', true);

            expect(task.completed).to.equal(true);
            expect(task.name).to.equal('newName!');
            expect(task.description).to.equal('new description');
            expect(task.due).to.equal('1/2/2019');
            expect(task.id).to.equal(-1);
        });
    });
});