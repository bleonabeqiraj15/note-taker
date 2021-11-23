import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ profile }) => {

    const logOut = () => {
        localStorage.clear();
        window.location.href = '/login'
    }


    return (
        <>
            <div className="half dropup flex-grow-1">
                <label htmlFor="profile2" className="profile-dropdown" >
                    <input type="checkbox" id="profile2" />
                    <img src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-75-256.png" alt="profile" />
                    <span>{profile.name}</span>
                    <label htmlFor="profile2"><i className="mdi mdi-menu"></i></label>
                    <div className="dropup-content">
                        <ul>
                            <li><Link to="/dashboard/edit-profile">Edit Profile</Link></li>
                            <li><Link to="/dashboard/change-password">Change password</Link></li>
                            <li><Link to="#">Settings</Link></li>
                            <li className="on-mobile"><Link to="/dashboard/my-notes">Notes</Link></li>
                            <li><button onClick={logOut}>Log out</button></li>
                        </ul>
                    </div>
                </label>
            </div>
        </>
    )
}

export default Menu
