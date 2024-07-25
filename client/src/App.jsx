import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Todos from './Todos.jsx'
import AuthContext from './auth.js'
import Login from './Login.jsx'
import './App.css'



export default function App() {
    const [currentUser, setCurrentUser] = useState(null)
  
  
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Login setCurrentUser={setCurrentUser} />
      },
      {
        path: '/tasks',
        element: <Todos/>

      }
    ])
  
    return (
      <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    )
  }