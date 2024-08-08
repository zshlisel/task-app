import { useRef, useState } from "react"
import ProfilePhoto from "./ProfilePhoto"
import './App.css'

export default function Profile() {
    const profileRef = useRef()

    const [showProfilePhoto, setShowProfilePhoto] = useState();
    const [userProfilePic, setUserProfilePic] = useState(null)

    const handleOnClick = () => {
        setShowProfilePhoto(!showProfilePhoto)
    }



    console.log('profile rendered')



    return (<>
        <div className="profile-icon-container" onClick={handleOnClick}>
            {userProfilePic ?
                (<img src={userProfilePic}
                    alt="User Profile"
                    width="160"
                    height="160"
                    className="profile-icon">
                </img>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        className="bi bi-person-circle profile-icon"
                        viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                )}
            {showProfilePhoto ? (
                <div ref={profileRef}>
                    <ProfilePhoto setUserProfilePic={setUserProfilePic} />
                </div>
            ) : null}
        </div>
    </>
    )
}