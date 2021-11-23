import React from 'react'
import Menu from './User/Menu'
import Notes from './Notes/Notes'

const RightSidebar = ({ notes, profile }) => {
    return (
        <div className="navbar d-flex justify-content-between">
            <Menu profile={profile} />
            <Notes notes={notes} />
        </div>
    )
}

export default RightSidebar
