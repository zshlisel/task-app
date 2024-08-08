import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function LogOutButton(){
    const navigate = useNavigate();

    const LogOutButtonClicked = async() =>{
        let response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include', // This is important to include cookies in the request
        });
        if (response.ok) {
            console.log('Logged out successfully');
            navigate('/')
            // Perform any additional cleanup or redirection here
        } else {
            console.error('Logout failed');
        }
    }
    return(
        <button id = "logOut" className="logOut" onClick={LogOutButtonClicked}>Log Out</button>
    )
}