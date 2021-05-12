import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}

export const AddItemForm = React.memo(({addItem,disabled = false}: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !=null){
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
        }
    }
    return <div>
        <TextField
            disabled={disabled}
            variant='outlined'
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            label='Title'
            helperText={error}
        />
        <IconButton  color='primary' onClick={addTask} disabled={disabled}><AddBox/></IconButton>
    </div>
});