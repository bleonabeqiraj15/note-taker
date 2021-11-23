/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import MyNotes from '../Notes/MyNotes'
import AddNote from '../Notes/AddNote'
import { useHistory, useRouteMatch } from 'react-router';
import Home from '../Home';
import RightSidebar from '../RightSidebar';
import { AiFillFileAdd } from 'react-icons/ai';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
// import AddTodo from './todos/AddTodo';
import EditProfile from '../User/EditProfile';
import { toast } from "react-toastify"
import ChangePassword from '../User/ChangePassword';

const Dashboard = () => {

    const [user, setUser] = useState("");
    const [notes, setNotes] = useState([])
    const [_id, setId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const token = localStorage.getItem("token");
    const [isEdited, setIsEdited] = useState(false)
    const [spinner, setSpinner] = useState(false);
    const [spinnerLoader, setSpinnerLoader] = useState(false);
    // const userId = JSON.parse(localStorage.getItem("user")).id;
    // const userLoggedIn = JSON.parse(localStorage.getItem("user")).email;
    const url = "http://localhost:3002";
    let history = useHistory()

    const getUser = () => {
        Axios.get((url + `/auth/user`), {
            headers: {
                "token": `${token}`
            }
        }).then((response) => {
            setUser(response.data)
            setId(response.data.id);
            setUserEmail(response.data.email)
            // console.log("this", response.data)
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const getNotes = () => {
        Axios.get((url + `/notes/user`), {
            headers: {
                "token": `${token}`
            }
        }).then((response) => {
            console.log("allNotes", response.data)
            let allNotes = response.data;
            setSpinner(!spinner)
            setTimeout(() => {
                setNotes(allNotes)
                setSpinner(false)
            }, 2500)

            // console.log(response.data, "allnotes")
        })
    }

    const deleteNote = (id) => {
        Axios.delete((url + `/notes/${id}`), {
            headers: {
                "token": `${token}`
            }
        }).then((response) => {
            setNotes(notes.filter((note) => {
                // console.log("note from delete method " + note.id)
                return note.id !== id
            }))
        })
    }

    const addNote = (title, description) => {
        const data = { title: title, description: description, UserId: _id }

        Axios.post(url + "/notes/add-note", data, {
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.data.error) {
                toast.warn(response.data.error)
                // console.log("add note error ", response.data.error)
            }
            else {
                // console.log("note added successfully ", response.data);
                // setSpinner(!spinner)
                setTimeout(() => {
                    toast.success("Note added successfully")
                    // setSpinner(false);
                    setNotes([...notes, {
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        user: response.data.user,
                        createdAt: response.data.createdAt,
                        updatedAt: response.data.updatedAt
                    }])
                }, 2500)

                // history.push("/dashboard/my-notes")

            }
        })
    }

    // EDIT PROFILE
    const handleChange = (e) => {
        // [e.target.name] = e.target.value;
        setUser({ ...user, [e.target.name]: e.target.value });

        if (e.target.value <= 1) {
            setIsEdited(false)
        }
        else {
            setIsEdited(true)
        }
        // console.log(e.target.value);
    }

    const editProfile = (e) => {
        e.preventDefault();
        Axios.put(url + `/auth/edit-profile/${_id}`, user, {
            headers: {
                "token": `${token}`
            }
        }).then((response) => {
            setSpinnerLoader(!spinnerLoader)
            setTimeout(() => {
                toast.success("Profile has been updated");
                setSpinnerLoader(false)
            }, 2500)
            // history.push("/dashboard")
        })
            .catch((err) => {
                setSpinnerLoader(!spinnerLoader)
                setTimeout(() => {
                    toast.warn(err)
                    setSpinnerLoader(false)
                }, 2500)
            })
    }

    useEffect(() => {
        getUser()
        getNotes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    let match = useRouteMatch();

    return (
        <div className="full-web-page d-flex">
            <Router>
                <div className="left-sidebar">
                    <div className="links-sidebar d-flex flex-column">
                        <div className="d-flex justify-content-center align-items-center flex-grow-1" title="Add new note"><Link to={`${match.url}/add-note`}><AiFillFileAdd /></Link></div>
                        <div className="d-flex justify-content-center align-items-center flex-grow-1" title="Add new task"><Link to={`${match.url}/add-todo`}><AiOutlineAppstoreAdd /></Link></div>
                    </div>
                </div>
                <div className="dashboard d-flex flex-grow-1">
                    {/* <button onClick={addNote}>Add note</button>
                    <MyNotes />
                    <button onClick={allNotes}>all notes</button> */}

                    <div className="dashboard-component">
                        <Switch>
                            <Route exact path={`${match.path}`}>
                                <Home />
                            </Route>
                            <Route exact path={`${match.path}/add-note`}>
                                <AddNote addNote={addNote} notes={notes} />
                            </Route>
                            <Route exact path={`${match.path}/my-notes`}>
                                <MyNotes spinner={spinner} notes={notes} deleteNote={deleteNote} />
                            </Route>
                            <Route exact path={`${match.path}/edit-profile`}>
                                <EditProfile profile={user} handleChange={handleChange} editProfile={editProfile} isEdited={isEdited} spinner={spinnerLoader} />
                            </Route>
                            <Route exact path={`${match.path}/change-password`}>
                                <ChangePassword />
                            </Route>
                            <Route exact path="**" component={() => "404 NOT FOUND"} />
                        </Switch>
                    </div>
                </div>
                <div className="right-sidebar">
                    <RightSidebar notes={notes} profile={user} />
                </div>
            </Router>
        </div>
    )
}

export default Dashboard
