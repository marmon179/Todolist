import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolist-api';
import {FilterValuesType} from './todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from './tasks-reducer';


type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status:TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


export const Todolist = React.memo(({id, changeFilter, changeTaskTitle, changeTaskStatus, removeTask,
        addTask,changeTodolistTitle, ...props}: PropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    },[])

    const add_Task = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])
    const remove_Todolist = () => {
        props.removeTodolist(id)
    }
    const change_TodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }, [id,changeTodolistTitle])



    const onAllClickHandler = useCallback(() => {
        changeFilter('all', id)
    }, [changeFilter, id])
    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', id)
    }, [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', id)
    }, [changeFilter, id])


    const onClickHandler = useCallback((taskId: string) => {
        removeTask(taskId, id)
    }, [removeTask, id])
    const onChangeStatusHandler = useCallback((taskId: string, status:TaskStatuses) => {
        changeTaskStatus(taskId, status, id)
    }, [changeTaskStatus, id])
    const onChangeTitleHandler = useCallback((taskId: string, newValue: string) => {
        changeTaskTitle(taskId, newValue, id)
    }, [changeTaskTitle, id])


    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={change_TodolistTitle}/>
                <IconButton onClick={remove_Todolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={add_Task}/>
            <div>
                {
                    tasksForTodolist.map(t => <Task
                        key={t.id}
                        removeTask={onClickHandler}
                        changeTaskStatus={onChangeStatusHandler}
                        changeTaskTitle={onChangeTitleHandler}
                        task={t}
                    />)
                }
            </div>
            <div>
                <Button color={'primary'} variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>

                <Button color={'secondary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>

                <Button color={'inherit'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
});

