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
            expect({0:task}).to.deep.equal(tasks.list);
        });

        it('should add multiple new tasks and give them all unique sequential ids', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            let task2 = new Task('name2', 'description2', '7/7/2018');
            tasks.addTask(task2);
            let expected = {
                0: task, 
                1: task2
            }
            expect(expected).to.deep.equal(tasks.list);
        });

        it('should add multiple new tasks and give them sequential ids, even when a task is removed', () => {
            let tasks = new Tasks();
            let task = new Task('name','description', '6/23/2019');
            tasks.addTask(task);
            let task2 = new Task('name2', 'description2', '7/7/2018');
            let task3 = new Task('name3', 'description3', '9/21/2019');
            tasks.addTask(task2);
            tasks.removeTask(1);
            tasks.addTask(task3);
            let expected = {
                0: task, 
                2: task3
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
                0: task0,
                1: task1,
                2: task2,
                3: task3,
                4: task4,
                5: task5,
                6: task6,
                7: task7,
                8: task8,
                9: task9,
                10: task10,
                11: task11,
                12: task12
            }

            let actual = tasks.getTasks();

            expect(expected).to.deep.equal(actual);
        });

        it('should get all tasks due today if filter 0 is provided', () => {
            let expected = {
                5: task5,
                6: task6,
            }

            let actual = tasks.getTasks(0, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all tasks due tomorrow if filter 1 is provided', () => {
            let expected = {
                7: task7,
                8: task8
            }

            let actual = tasks.getTasks(1, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all tasks due today and tomorrow if filter 2 is provided', () => {
            let expected = {
                5: task5,
                6: task6,
                7: task7,
                8: task8
            }

            let actual = tasks.getTasks(2, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all overdue tasks if filter 3 is provided', () => {
            let expected = {
                2: task2,
                3: task3,
                4: task4
            }

            let actual = tasks.getTasks(3, today);

            expect(expected).to.deep.equal(actual);
        });

        it('should get all completed tasks if filter 4 is provided', () => {
            let expected = {
                0: task0,
                1: task1,
                8: task8,
                11: task11
            }

            let actual = tasks.getTasks(4);

            expect(expected).to.deep.equal(actual);
        });
    });

    describe('getTask', () => {
        it('should return the task with the specified id', () => {
            
        });
        it('should return false if the specified task doesnt exist', () => {

        });
    });

    describe('removeTask', () => {
        it('should remove the specified task and return true', () => {

        });
        it('should return false if the specified task is removed twice', () => {

        });
    });
});