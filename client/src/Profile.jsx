import { useRef, useState } from "react"
import ProfilePhoto from "./ProfilePhoto"
import './App.css'

export default function Profile() {
    const profileRef = useRef()

    const [sidebarOpen, setSidebarOpen] = useState();
    const [userProfilePic, setUserProfilePic] = useState(null)

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    console.log('profile rendered')

    return (
        <>
        <div className={`${sidebarOpen ? 'sidebar' : ''} `}>
            <div className={`profile-icon-container ${sidebarOpen ? 'open' : ''} `} onClick={openSidebar}>
                {userProfilePic ?
                    (<img src={userProfilePic}
                        alt="User Profile"
                        width="160"
                        height="160"
                        className={`${!sidebarOpen ? 'profile-icon' : 'profile-icon-open'}`}>
                    </img>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="60"
                            fill="currentColor"
                            className={`${!sidebarOpen ? 'profile-icon' : 'profile-icon-open'}`}
                            viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                    )}
            </div>
            {sidebarOpen ? (
                <div>
                    <span className="close-btn" onClick={closeSidebar}>&times;</span>
                    <ProfilePhoto closeSidebar={closeSidebar} setUserProfilePic={setUserProfilePic} />
                </div>
            ) : null}
            </div>
        </>
    )
}