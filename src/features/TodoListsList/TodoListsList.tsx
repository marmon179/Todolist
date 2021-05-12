import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodoListTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC,
    TodoListDomainType
} from './Todolist/todolists-reducer';
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from './Todolist/tasks-reducer';
import {TaskStatuses} from '../../api/todolist-api';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';

type PropsType = {
    demo?:boolean
}
export const TodoListsList: React.FC<PropsType> = ({demo = false}) => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.task)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo){
            return
        }
        dispatch(fetchTodoListsTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodoListTC(title)
        dispatch(thunk)
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const thunk = changeTodoListTC(id, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodoListTC(todolistId)
        dispatch(thunk)
    }, [dispatch])


    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch]);

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch]);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch]);

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [dispatch]);
    return (
        <> <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
            <Grid container spacing={3}>
                {
                    todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    todolist={tl}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })}
            </Grid>

        </>)
}