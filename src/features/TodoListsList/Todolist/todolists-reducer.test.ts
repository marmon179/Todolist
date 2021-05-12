import {v1} from 'uuid';
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodoListsAC, TodoListDomainType,
    todoListsReducer
} from './todolists-reducer';
import {TodoListType} from '../../../api/todolist-api';
import {RequestStatusType} from '../../../app/app-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType> = [];


beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'Feelings', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let todoList: TodoListType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    };

    const endState = todoListsReducer(startState, addTodolistAC(todoList))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todoList.title)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    const newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todoLists should be set to the state', () => {

    const action = setTodoListsAC(startState);

    const endState = todoListsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {

    const newStatus: RequestStatusType = 'loading'

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus);

    const endState = todoListsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})