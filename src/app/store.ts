import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../features/TodoListsList/Todolist/tasks-reducer';
import {todoListsReducer} from '../features/TodoListsList/Todolist/todolists-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    task: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store