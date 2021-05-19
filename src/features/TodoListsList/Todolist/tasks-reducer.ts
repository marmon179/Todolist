import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from '../../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../../app/store';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks}
        }
        default:
            return state
    }
}
//actions
export const removeTaskAC = (taskId: string, todolistID: string) => ({type: 'REMOVE-TASK', todolistID, taskId}) as const
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task}) as const
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
}) as const
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todoListId
}) as const

//thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.deleteTasks(todoListId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todoListId)
            dispatch(action)
        })
}
export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error,dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
    return (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.task[todoListId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistApi.updateTask(todoListId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todoListId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data,dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkError(error,dispatch)
            })
    }
}

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListActionType
    | ReturnType<typeof setTasksAC>
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
