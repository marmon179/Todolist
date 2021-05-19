import {v1} from 'uuid';
import {todolistApi, TodoListType} from '../../../api/todolist-api';
import {Dispatch} from 'redux';
import {
    RequestStatusType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../utils/error-utils';


export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', status, id
}) as const
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists}) as const

//thunks
export const fetchTodoListsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.getTodoList()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTodoListTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
    todolistApi.deleteTodoList(todoListId)
        .then((res) => {
            dispatch(removeTodolistAC(todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTodoListTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodoList(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
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
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodoListActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType

}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>



