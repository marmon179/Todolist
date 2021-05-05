import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9cd2c268-195b-4b42-abcf-5a1644af026e'
    }
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 3
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type ResponseTaskType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
    item: TaskType
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistApi = {
    getTodoList() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },

    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
    },

    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },

    updateTodoListTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },

    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
    },

    createTask(todoListId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todoListId}/tasks`, {title: taskTitle})
    },

    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },

    deleteTasks(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
}