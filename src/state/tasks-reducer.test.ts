import {TaskStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let startState: TaskStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'HTML&CSS',status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'ReactJS',status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'Lovely', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'Cheerful', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'Tired', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };
})
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();

})

test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);

})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2');

    const endState = tasksReducer(startState, action)

    // expect(endState['todolistId2'][1].isDone).toBeFalsy();
    // expect(endState['todolistId1'][1].isDone).toBeTruthy();
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'Banana', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Banana');
    expect(endState['todolistId1'][1].title).toBe('JS');

})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})


