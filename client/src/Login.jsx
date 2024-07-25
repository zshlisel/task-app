import React from "react"
import { useNavigate } from "react-router-dom";

export default function Login({ setCurrentUser }) {
    const navigate = useNavigate()
    const userRef = React.useRef();
    const passRef = React.useRef();
    const loginRef = React.useRef();
    const signUpRef = React.useRef();

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
                setCurrentUser(result.id);
                navigate("/tasks");

            } else {
                console.error('login failed');
            }
        } else {
            console.error('Login request failed');
            loginRef.current.textContent = 'Login'

        }
    }




    async function handleSignUp(event) {
        event.preventDefault()
        signUpRef.current.textContent = 'Signing Up...'

        let newUserObject = {
            name: 'exampleName',
            pass: passRef.current.value,
            email: userRef.current.value
        };

        const response = await fetch('http://localhost:3000/auth/user', {
            method: 'POST',
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserObject)
        });

        if (response.ok) {
            let result = await response.json();
            setCurrentUser(result.id);
            console.log('Successfully Signed Up');
            navigate("/tasks");
        } else {
            console.error('failed to add user');
            signUpRef.current.textContent = 'Sign Up'
        }

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" >Username</label>
                <input type="text" id="username" name="username" ref={userRef} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" ref={passRef} />
                <br />
                <button type="submit" ref={loginRef}>Login</button>
                <button onClick={handleSignUp} ref={signUpRef}>Sign Up</button>
            </form>
        </>
    )
}