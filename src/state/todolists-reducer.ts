import {v1} from 'uuid';
import {todolistApi, TodoListType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todoList: TodoListType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoListActionType

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodoListDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
export type SetTodoListActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodoListType>
}

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodoListDomainType = {...action.todoList, filter: 'all'}
            return [newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }

        default:
            return state
    }
}


export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
}
export const addTodolistAC = (todoList: TodoListType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todoList}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
export const setTodoListsAC = (todoLists: Array<TodoListType>): SetTodoListActionType => {
    return {type: 'SET-TODOLISTS', todoLists: todoLists}
}

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodoList()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTodoList(todoListId)
            .then((res) => {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTodoList(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodoListTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.updateTodoListTitle(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}



