import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    todoListsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todoLists, dispatchToTodolist] = useReducer(todoListsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    const [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: todolistId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ],
        [todolistId2]: [
            {
                id: v1(), title: 'Bread', status: TaskStatuses.Completed, todoListId: todolistId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todolistId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ]
    })

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolist(changeTodolistTitleAC(id, newTitle))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolist(changeTodolistFilterAC(todolistId, value))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }


    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, status, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
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
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
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
