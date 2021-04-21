import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';

export type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, newValue: string) => void
    task: TaskType
}
export const Task = React.memo(({removeTask,changeTaskStatus,changeTaskTitle,task}: TaskPropsType) => {

    const onClickHandler = () => {removeTask(task.id)}

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue)
    }, [changeTaskTitle,task.id])

    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox color="primary" checked={task.isDone} onChange={onChangeStatusHandler}/>
        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>

        <IconButton onClick={onClickHandler}><Delete/></IconButton>
    </li>

})