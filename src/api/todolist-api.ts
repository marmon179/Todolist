import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9cd2c268-195b-4b42-abcf-5a1644af026e'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
type TodoListType = {
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
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoListTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists${todoListId}/tasks`)
    },
    deleteTasks(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists${todoListId}/tasks${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {

    }

}