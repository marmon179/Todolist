import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC, TodoListDomainType
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolist-api';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.task)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch]);
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch]);
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch]);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch]);
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, status, todolistId))
    }, [dispatch]);
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [dispatch]);
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
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
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
