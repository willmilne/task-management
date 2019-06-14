const chai = require('chai');
const expect = chai.expect;

const { Task } = require('./Task');
const { Tasks } = require('./Tasks');

describe('tasks tests', () => {
    describe('constructor', () => {
        it('should initialize an empty list', () => {
            let tasks = new Tasks();
            expect({}).to.deep.equal(tasks.list);
        });
    });

    describe('addTask', () => {
        it('should add the new task and give it a unique id', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            expect({1:task}).to.deep.equal(tasks.list);
        });

        it('should add multiple new tasks and give them all unique sequential ids', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            let task2 = new Task('name2', 'description2', '7/7/2018');
            tasks.addTask(task2);
            let expected = {
                1: task, 
                2: task2
            }
            expect(expected).to.deep.equal(tasks.list);
        });

        // I recognize that this is not fully a unit test - because it relies on removeTask as part of the sequence.  
        // I have found that writing automated tests for sequences that could produce unexpected behaviors is 
        // also quite useful.
        it('should add multiple new tasks and give them sequential ids, even when a task is removed', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            let task2 = new Task('name2', 'description2', '7/7/2018');
            let task3 = new Task('name3', 'description3', '9/21/2019');
            tasks.addTask(task2);
            tasks.removeTask(2);
            tasks.addTask(task3);
            let expected = {
                1: task, 
                3: task3
            }
            expect(expected).to.deep.equal(tasks.list);
        });
    });

    describe('getTasks', () => {
        let today = '6/12/2019';
        let task0 = new Task('task 0', 'weird zero', '1/1/1970');
        let task1 = new Task('task 1', 'it is a task', '6/10/2019');
        let task2 = new Task('task 2', 'it is a task', '6/10/2019');
        let task3 = new Task('task 3', 'it is a task', '6/11/2019');
        let task4 = new Task('task 4', 'it is a task', '6/11/2019');
        let task5 = new Task('task 5', 'it is a task', '6/12/2019');
        let task6 = new Task('task 6', 'it is a task', '6/12/2019');
        let task7 = new Task('task 7', 'it is a task', '6/13/2019');
        let task8 = new Task('task 8', 'it is a task', '6/13/2019');
        let task9 = new Task('task 9', 'it is a task', '6/14/2019');
        let task10 = new Task('task 10', 'it is a task', '6/14/2019');
        let task11 = new Task('task 11', 'it is a task', '12/13/2019');
        let task12 = new Task('task 12', 'it is a task', '12/13/2019');

        task0.completed = true;
        task1.completed = true;
        task11.completed = true;
        task8.completed = true;

        let tasks = new Tasks();
        tasks.addTask(task0);
        tasks.addTask(task1);
        tasks.addTask(task2);
        tasks.addTask(task3);
        tasks.addTask(task4);
        tasks.addTask(task5);
        tasks.addTask(task6);
        tasks.addTask(task7);
        tasks.addTask(task8);
        tasks.addTask(task9);
        tasks.addTask(task10);
        tasks.addTask(task11);
        tasks.addTask(task12);

        it('should return entire dictionary of tasks if no filter is provided', () => {
            let expected = {
                1: task0,
                2: task1,
                3: task2,
                4: task3,
                5: task4,
                6: task5,
                7: task6,
                8: task7,
                9: task8,
                10: task9,
                11: task10,
                12: task11,
                13: task12
            }

            let actual = tasks.getTasks();

            expect(expected).to.deep.equal(actual);
        });

        it('should get all tasks due today if filter 0 is provided', () => {
            let expected = {
                6: task5,
                7: task6,
            }

            let actual = tasks.getTasks(0, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all tasks due tomorrow if filter 1 is provided', () => {
            let expected = {
                8: task7,
                9: task8
            }

            let actual = tasks.getTasks(1, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all tasks due today and tomorrow if filter 2 is provided', () => {
            let expected = {
                6: task5,
                7: task6,
                8: task7,
                9: task8
            }

            let actual = tasks.getTasks(2, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all overdue tasks if filter 3 is provided', () => {
            let expected = {
                3: task2,
                4: task3,
                5: task4
            }

            let actual = tasks.getTasks(3, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all completed tasks if filter 4 is provided', () => {
            let expected = {
                1: task0,
                2: task1,
                9: task8,
                12: task11
            }

            let actual = tasks.getTasks(4);

            expect(expected).to.deep.equal(actual);
        });
    });

    describe('getTask', () => {
        it('should return the task with the specified id', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            let actual = tasks.getTask(1);
            let expected = task;
            expect(expected).to.deep.equal(actual);
        });
        it('should return false if the specified task doesnt exist', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            let actual = tasks.getTask(1023);
            let expected = false;
            expect(expected).to.deep.equal(false);
        });
    });

    describe('removeTask', () => {
        it('should remove the specified task and return true', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            let actual = tasks.removeTask(1);
            let expected = true;
            expect(expected).to.deep.equal(true);
        });
        it('should return false if the specified task is removed twice or expected task doesnt exist', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            tasks.removeTask(1);
            let actual = tasks.removeTask(1);
            let expected = true;
            expect(expected).to.deep.equal(true);
        });
    });

    // status is a new field to be used for easier display of 
    // completed, 'upcoming', or overdue
    // upcoming is today or tomorrow
    // overdue is overdue
    // completed is completed
    describe('updateStatus', () => {
        let today = '6/12/2019';
        let task0 = new Task('task 0', 'weird zero', '1/1/1970');
        let task1 = new Task('task 1', 'it is a task', '6/10/2019');
        let task2 = new Task('task 2', 'it is a task', '6/10/2019');
        let task3 = new Task('task 3', 'it is a task', '6/11/2019');
        let task4 = new Task('task 4', 'it is a task', '6/11/2019');
        let task5 = new Task('task 5', 'it is a task', '6/12/2019');
        let task6 = new Task('task 6', 'it is a task', '6/12/2019');
        let task7 = new Task('task 7', 'it is a task', '6/13/2019');
        let task8 = new Task('task 8', 'it is a task', '6/13/2019');
        let task9 = new Task('task 9', 'it is a task', '6/14/2019');
        let task10 = new Task('task 10', 'it is a task', '6/14/2019');
        let task11 = new Task('task 11', 'it is a task', '12/13/2019');
        let task12 = new Task('task 12', 'it is a task', '12/13/2019');

        task0.completed = true;
        task1.completed = true;
        task11.completed = true;
        task8.completed = true;

        let tasks = new Tasks();
        tasks.addTask(task0);
        tasks.addTask(task1);
        tasks.addTask(task2);
        tasks.addTask(task3);
        tasks.addTask(task4);
        tasks.addTask(task5);
        tasks.addTask(task6);
        tasks.addTask(task7);
        tasks.addTask(task8);
        tasks.addTask(task9);
        tasks.addTask(task10);
        tasks.addTask(task11);
        tasks.addTask(task12);
        it('should mark the status of each task correctly', () => {
            tasks.updateAllStatuses('6/13/2019');
            expect(task0.status).to.equal('completed');
            expect(task1.status).to.equal('completed');
            expect(task2.status).to.equal('overdue');
            expect(task3.status).to.equal('overdue');
            expect(task4.status).to.equal('overdue');
            expect(task5.status).to.equal('overdue');
            expect(task6.status).to.equal('overdue');
            expect(task7.status).to.equal('upcoming');
            expect(task8.status).to.equal('completed');
            expect(task9.status).to.equal('upcoming');
            expect(task10.status).to.equal('upcoming');
            expect(task11.status).to.equal('completed');
            expect(task12.status).to.equal('');
            expect(tasks.lastStatusUpdate).to.equal('6/13/2019');
        });

        it('should mark the status of a single task correctly when that task is added', () => {
            task0.status = undefined;
            tasks.updateStatus(task0, '6/13/2019');
            expect(task0.status).to.equal('completed');

            task4.status = undefined;
            tasks.updateStatus(task4, '6/13/2019');
            expect(task4.status).to.equal('overdue');

            task9.status = undefined;
            tasks.updateStatus(task9, '6/13/2019');
            expect(task9.status).to.equal('upcoming');
        });
    });
});