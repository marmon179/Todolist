import React, {useEffect, useState} from 'react'
// @ts-ignore
import {Meta} from '@storybook/react/types-6-0';
import axios from 'axios';
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
    useEffect(() => {
        todolistApi.getTodoList()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodoList('Ha ha ha')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '4396dac1-d133-4107-9628-a1659169f29f'
        todolistApi.deleteTodoList(todoListId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListsTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '4396dac1-d133-4107-9628-a1659169f29f'
        todolistApi.updateTodoListTitle('Pab', todoListId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '4396dac1-d133-4107-9628-a1659169f29f'
        todolistApi.getTasks(todoListId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const deleteTask = () => {
        const todoListId = '4396dac1-d133-4107-9628-a1659169f29f'
        const taskId = ''
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