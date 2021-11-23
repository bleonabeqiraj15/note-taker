import React, { useState } from 'react'
// import Axios from 'axios';
import { useHistory } from 'react-router';
import Spinner from '../../../helpers/Spinner';

const CreateNote = ({ addNote }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [propsNotes, setPropsNotes] = useState(notes);
    // let url = "http://localhost:3002/notes";
    const [spinner, setSpinner] = useState(false);

    let history = useHistory()

    console.log("spinner ", spinner)

    // const addNote = (e) => {
    //     // console.log(e)
    //     e.preventDefault();
    //     const data = { title: title, description: description }

    //     Axios.post(url + "/add-note", data, {
    //         headers: {
    //             "token": localStorage.getItem("token")
    //         }
    //     }).then((response) => {
    //         if (response.data.error) {
    //             console.log("add note error ", response.data.error)
    //         }
    //         else {
    //             console.log("note added successfully ", response.data);
    //             setPropsNotes([...propsNotes, { title: response.data.title, description: response.data.description }])
    //             history.push("/dashboard/my-notes")
    //         }
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.length < 3) {
            console.log("error")
        }
        else {
            addNote(title, description);
            console.log("success")
            setSpinner(!spinner)
            setTimeout(() => {
                setSpinner(false)
                history.push("/dashboard/my-notes")
            }, 2500)

        }



    }

    return (
        <div className="container-bcg d-flex flex-column">
            <form onSubmit={handleSubmit} className="form login-form d-flex flex-column justify-content-center m-auto">
                <h2 className="dark-blue">Add note</h2>
                <div className="user-input d-flex flex-column">
                    <input type="text" placeholder="Title" onChange={(event) => { setTitle(event.target.value) }} />
                </div>
                <div className="user-input d-flex flex-column">
                    <input type="text" placeholder="Description" onChange={(event) => { setDescription(event.target.value) }} />
                </div>

                <div className="button-span d-flex justify-content-center align-items-center">
                    <button type="submit">Save note</button>
                    {/* <span>Create an account <Link to="create-account">here</Link></span> */}
                </div>
            </form>
            <div className="spinner">
                {spinner ? <Spinner /> : null}
            </div>
        </div>
    )
}

export default CreateNote
