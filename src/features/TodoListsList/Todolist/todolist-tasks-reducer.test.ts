import {addTodolistAC, TodoListDomainType, todoListsReducer} from './todolists-reducer';
import {tasksReducer, TaskStateType} from './tasks-reducer';
import {TodoListType} from '../../../api/todolist-api';

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    let todoList: TodoListType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    };

    const action = addTodolistAC(todoList);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodoLists).toBe(action.todoList.id)

})