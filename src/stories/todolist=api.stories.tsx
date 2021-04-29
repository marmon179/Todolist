import React, {useState} from 'react'
// @ts-ignore
import {Meta} from '@storybook/react/types-6-0';
import {todolistApi} from '../api/todolist-api';

export default {
    title: 'API'
} as Meta

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9cd2c268-195b-4b42-abcf-5a1644af026e'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const getTodolist = () => {
        todolistApi.getTodoList()
            .then((res) => {
                setState(res.data)
            })
    }
    const clearTodolist = () => setState(null)
    return <div>{JSON.stringify(state)}
        <div>
            <button onClick={getTodolist}>GET</button>
            <button onClick={clearTodolist}>Clear</button>
        </div>
    </div>
}

export const CreateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const createTodolist = () => {
        todolistApi.createTodoList(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={title} placeholder="title" onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}>creat</button>
        </div>
    </div>

}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)

    const deleteTodolist = () => {
        todolistApi.deleteTodoList(todoListId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder="todoListId" onChange={(e) => {
                setTodoListId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>del</button>
        </div>
    </div>
}

export const UpdateTodoListsTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const updateTodolistTitle = () => {
        todolistApi.updateTodoListTitle(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder="todoListId"
                   onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            <input value={title} placeholder="title"
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolistTitle}>update</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)

    const getTask = () => {
        todolistApi.getTasks(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todoListId} placeholder="todoListId"
                   onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            <button onClick={getTask}>GET</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const create_Task = () => {
        todolistApi.createTask(todoListId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={taskTitle} placeholder="taskTitle" onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <input value={todoListId} placeholder="todoListId" onChange={(e) => {
                setTodoListId(e.currentTarget.value)
            }}/>
            <button onClick={create_Task}>creat</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [todoListId, setTodoListId] = useState<any>('')

    const deleteTask = () => {
        todolistApi.deleteTasks(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>

}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const model = {
        deadline: '',
        description: description,
        priority: priority,
        startDate: '',
        status: status,
        title: taskTitle

    }

    const updateTask = () => {
        todolistApi.updateTask(todoListId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId}
                   onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>

            <input placeholder={'taskTitle'} value={taskTitle} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input placeholder={'taskDescription'} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>
            <input placeholder={'status'} value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder={'priority'} value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>
            <input placeholder={'startDate'} value={startDate} onChange={(e) => {
                setStartDate(e.currentTarget.value)
            }}/>
            <input placeholder={'deadline'} value={deadline} onChange={(e) => {
                setDeadline(e.currentTarget.value)
            }}/>

            <button onClick={updateTask}>update Task</button>
        </div>

    </div>
}