import React from 'react'
import { useHistory } from 'react-router'

const LogOut = () => {

    let history = useHistory()

    const logOut = () => {
        localStorage.clear();
        history.push("/login")

    }

    return (
        <div>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}

export default LogOut
