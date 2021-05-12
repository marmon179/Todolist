import {v1} from 'uuid';
import {todolistApi, TodoListType} from '../../../api/todolist-api';
import {Dispatch} from 'redux';


export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', id: todolistID}) as const
export const addTodolistAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList}) as const
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id
}) as const
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists}) as const

//thunks
export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistApi.getTodoList()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.deleteTodoList(todoListId)
        .then((res) => {
            dispatch(removeTodolistAC(todoListId))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.createTodoList(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodoListTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.updateTodoListTitle(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

//types
export type  AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodoListActionType = ReturnType<typeof setTodoListsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodoListActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & { filter: FilterValuesType }



