import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolist-api';
import {FilterValuesType, TodoListDomainType} from './todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from './tasks-reducer';


type PropsType = {
    todolist: TodoListDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}


export const Todolist = React.memo(({
                                        demo = false,
                                        todolist,
                                        changeFilter,
                                        changeTaskTitle,
                                        changeTaskStatus,
                                        removeTask,
                                        addTask,
                                        changeTodolistTitle,
                                        ...props
                                    }: PropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(todolist.id))
    }, [])

    const add_Task = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask, todolist.id])
    const remove_Todolist = () => {
        props.removeTodolist(todolist.id)
    }
    const change_TodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitle(todolist.id, newTitle)
    }, [todolist.id, changeTodolistTitle])


    const onAllClickHandler = useCallback(() => {
        changeFilter('all', todolist.id)
    }, [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', todolist.id)
    }, [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', todolist.id)
    }, [changeFilter, todolist.id])


    const onClickHandler = useCallback((taskId: string) => {
        removeTask(taskId, todolist.id)
    }, [removeTask, todolist.id])
    const onChangeStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
        changeTaskStatus(taskId, status, todolist.id)
    }, [changeTaskStatus, todolist.id])
    const onChangeTitleHandler = useCallback((taskId: string, newValue: string) => {
        changeTaskTitle(taskId, newValue, todolist.id)
    }, [changeTaskTitle, todolist.id])


    let tasksForTodolist = props.tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3><EditableSpan title={todolist.title} onChange={change_TodolistTitle}/>
                <IconButton onClick={remove_Todolist}
                            disabled={todolist.entityStatus === 'loading'}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={add_Task} disabled={todolist.entityStatus === 'loading'}/>
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
                <Button color={'primary'} variant={todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>

                <Button color={'secondary'} variant={todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>

                <Button color={'inherit'} variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
});

