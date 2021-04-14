import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todoLists, setTodoList] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'RestJS', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodoList([...todoLists])
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodoList([...todoLists])
        }
    }

    function addTask(title: string, todolistId: string) {
        const task = {id: v1(), title: title, isDone: false}
        const tasks = tasksObj[todolistId]
        const newTask = [task, ...tasks]
        tasksObj[todolistId] = newTask
        setTasks({...tasksObj})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }

    const removeTodolist = (todolistId: string) => {
        const filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoList(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks(tasksObj)
    }

    function addTodoList(title: string) {
        const todolist: TodolistType = {
            title: title,
            id: v1(),
            filter: 'all'
        };
        setTodoList([todolist, ...todoLists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

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
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            return <Grid item>
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
