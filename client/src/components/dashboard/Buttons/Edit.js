import React from 'react'
import { FiEdit } from 'react-icons/fi'

const Edit = ({ editNote }) => {
    return (
        <>
            <FiEdit className='list-icon edit-icon' onClick={editNote} />
        </>
    )
}

export default Edit