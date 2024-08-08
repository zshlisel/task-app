import React from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const userRef = React.useRef();
    const passRef = React.useRef();
    const loginRef = React.useRef();

    async function handleSubmit(event) {
        event.preventDefault()
        loginRef.current.textContent = 'Logging In...'

        let loginObject = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value
        };

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginObject)
        });

        if (response.ok) {
            const result = await response.json();
            if (result.ok) {
                console.log('Login successful');
                navigate("/tasks");

            } else {
                console.error('login failed');
            }
        } else {
            console.error('Login request failed');
            loginRef.current.textContent = 'Login'

        }
    }




   

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" >Username</label>
                <input type="text" id="username" name="username" ref={userRef} />
                <br/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" ref={passRef} />
                <br/>
                <button type="submit" ref={loginRef}>Login</button>
                <a href="./sign-up" >Sign Up</a>
            </form>
        </>
    )
}