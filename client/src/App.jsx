import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Todos from './Todos.jsx'
import Login from './Login.jsx'
import './App.css'
import SignUp from "./Sign-up.jsx"



export default function App() {
 
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Login/>
      },
      {
        path: '/tasks',
        element: <Todos/>

      },
      {
        path: '/sign-up',
        element: <SignUp/>
      }
    ])
  
    return (
        <RouterProvider router={router} />
    )
  }