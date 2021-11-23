import React, { useState } from 'react'
import Edit from '../Buttons/Edit'
import Delete from '../Buttons/Delete'
import Popup from '../../../helpers/Popup';
import Axios from 'axios'
import { toast } from "react-toastify"

const Note = ({ note, deleteNote }) => {

    const [updateNote, setUpdateNote] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const url = "http://localhost:3002/notes"
    const token = localStorage.getItem("token");

    const editNote = () => {
        setIsOpen(!isOpen);
    }
    // console.log(isOpen);

    const handleChange = (e) => {

        if (e.target.value < 2) {
            console.log(e.target.value)
        }

        else {
            setUpdateNote({
                ...updateNote,
                [e.target.name]: e.target.value,
            });

        }
    };


    const updateData = (id) => {
        Axios.put((url + `/${id}`), updateNote, {
            headers: {
                "token": `${token}`
            }
        }).then((response) => {
            // console.log(response.data);
            toast.success("Note updated")
            setIsOpen(!isOpen)

        })
            .catch((err) => {
                console.log(err)
            })

    }


    return (
        <div className="note">
            {/* <span>{date}</span> */}
            <h4>{note.title}</h4>
            <p>{note.description}</p>
            {/* <div>{note.createdAt}</div> */}
            <div className="dashboard-buttons">
                <Edit editNote={editNote} />
                <Delete deleteNote={() => deleteNote(note.id)} />
            </div>
            {
                isOpen && <Popup handleClose={editNote} handleChange={handleChange} updateData={updateData} notes={note} isOpen={isOpen} />
            }
        </div>
    )
}

export default Note
