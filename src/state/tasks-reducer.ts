import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistID: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    todolistId: string
    status: TaskStatuses
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    todolistId: string
    title: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistID] = filteredTasks
            return {...stateCopy};
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            };
            const tasks = stateCopy[action.todolistId]
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks
            return {...stateCopy}
        }
        case 'CHANGE-TASK-STATUS': {
            const tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string,
                                   status: TaskStatuses,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
