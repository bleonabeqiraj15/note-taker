import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const Delete = ({ deleteNote }) => {
    return (
        <>
            <AiFillDelete className='list-icon delete-icon' onClick={deleteNote} />
        </>
    )
}

export default Delete
