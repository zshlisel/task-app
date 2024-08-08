import { useState, useEffect, useContext } from "react";
import Task from "./Task";
import { useNavigate } from "react-router-dom";
import NewTask from "./NewTask";
import LogOutButton from "./LogOut";
import Profile from "./Profile";


export default function Todos() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);


    async function loadTasks() {
        let response = await fetch('http://localhost:3000/tasks', {
            method: 'GET',
            mode: "cors",
            credentials: "include",
        });
        if (response.ok) {
            let result = await response.json();
            setTasks(result)
        } else {
            navigate('/')
            console.error('Failed to get tasks');
        }
    }
    
    
    useEffect(() => {
        loadTasks()
    }, [])


    return (
        <div className="todo-container">
            <LogOutButton/>
            <Profile/>
            <h1 id="app-title">Your Tasks</h1>
            <NewTask UpdateTasks={loadTasks} />

            <section className="task-list" id="todo-list">
                <h2 className="task-header">Active tasks</h2>
                {tasks
                    .filter((task) => !task.done)
                    .map((task) => (
                        <Task task={task} UpdateTasks={loadTasks} key={task.id} />
                    ))}
            </section>
            <section className="task-list completed" id="done-list">
                <h2 className="task-header">Completed tasks</h2>
                {tasks
                    .filter((task) => task.done)
                    .map((task) => (
                        <Task task={task} UpdateTasks={loadTasks} key={task.id} />
                    ))}
            </section>
        </div>
    )
}