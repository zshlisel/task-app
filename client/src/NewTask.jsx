import { useContext, useRef } from "react";
import AuthContext from "./auth"

export default function NewTask({UpdateTasks}) {
    const NewTaskRef = useRef()
    const userId = useContext(AuthContext)
    async function handleSubmit() {

        let newTaskObject = {

            title: NewTaskRef.current.value,
            done: false
        };

        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
             credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'authorization': userId
            },
            body: JSON.stringify(newTaskObject)
        });

        if (response.ok) {
            NewTaskRef.current.value = ''
            UpdateTasks()

        } else {
            console.error('failed to add task');
        }
    }

return (
    <div className="input-container">
        <input type="text" id="new-task" placeholder="Add a new task" ref={NewTaskRef} />
        <button className="add-task" onClick={handleSubmit}>+</button>
    </div>
)
}