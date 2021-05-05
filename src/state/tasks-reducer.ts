import {TaskStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistID: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    taskId: string
    todolistId: string
    model: UpdateDomainTaskModelType
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    todolistId: string
    title: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListId: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListActionType
    | SetTasksActionType

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
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks
            return {...stateCopy}
        }
        case 'UPDATE-TASK': {
            const tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todoList.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}

            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            const copyState = {...state}
            copyState[action.todoListId] = action.tasks

            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string,
                             model: UpdateDomainTaskModelType,
                             todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todoListId}
}

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTasks(todoListId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todoListId))
            })
    }
}

export const removeTaskTC = (taskId: string, todoListId: string) => {

    return (dispatch: Dispatch) => {
        todolistApi.deleteTasks(todoListId, taskId)
            .then(res => {
                const action = removeTaskAC(taskId, todoListId)
                dispatch(action)
            })
    }
}

export const addTaskTC = (title: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTask(todoListId, title)
            .then(res => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
                const action = updateTaskAC(taskId, domainModel, todoListId)
                dispatch(action)
            })
    }
}