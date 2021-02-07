import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

function App() {
    let tasks1: Array<TaskType> = [
        {id: 1, title: 'Rambo', isDone: true},
        {id: 2, title: 'Tenet', isDone: true},
        {id: 3, title: 'Batman', isDone: true}
    ]
    let tasks2: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'REACT', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title={'Movies'} tasks={tasks1}/>
            <Todolist title={'What to learn'} tasks={tasks2}/>
        </div>
    );
}

export default App;
