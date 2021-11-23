import React from 'react'
import { BsCreditCard2Front } from 'react-icons/bs';
import { Link } from 'react-router-dom'

const Notes = ({ notes }) => {

    return (
        <div className="right-side-notes flex-grow-1">
            <div className="notes-box">
                <div>
                    <h4>Notes</h4>
                    <h4>{notes.length}</h4>
                </div>
                <div>
                    <Link to="/dashboard/my-notes"><BsCreditCard2Front /></Link>
                </div>
            </div>
        </div>
    )
}

export default Notes

