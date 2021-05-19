import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../features/TodoListsList/Todolist/tasks-reducer'
import {todoListsReducer} from '../features/TodoListsList/Todolist/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../app/store'
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {appReducer} from '../app/app-reducer';

const rootReducer = combineReducers({
    task: tasksReducer,
    todoLists: todoListsReducer,
    app:appReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',entityStatus:'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',entityStatus:'loading', addedDate: '', order: 0}
    ],
    task: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};


export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)