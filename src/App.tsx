import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {


    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodoList] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, setTasks] = useState({
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

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodoList([...todolists])
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

    const removeTodolist = (todolistId: string) => {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodoList(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks(tasksObj)
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }


        </div>
    );
}

export default App;
