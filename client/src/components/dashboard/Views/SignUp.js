import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Axios from 'axios'
import { useHistory } from 'react-router';
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import { toast } from "react-toastify"
import Spinner from '../../../helpers/Spinner';

const SignUp = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);

    const url = "http://localhost:3002/auth";
    let history = useHistory()
    const signUp = () => {

        const data = { name, surname, email, password }

        Axios.post(url + "/signup", data)
            .then((response) => {
                if (response.data.error) {
                    setSpinner(!spinner)
                    setTimeout(() => {
                        toast.warn(response.data.error)
                        setSpinner(false)
                    }, 2500)
                }
                else {
                    setSpinner(!spinner)
                    setTimeout(() => {
                        history.push("/login")
                        toast.success(`User has been successfully created. A verification message is sent to your email account`);
                        setSpinner(false)
                    }, 2500)
                }
            })

    }

    return (
        <div className="container-bcg">
            <div className="form d-flex flex-column justify-content-center">
                <div className="icon text-center">
                    <BsFillCalendar3WeekFill />
                </div>
                <h2 className="dark-blue">Sign up</h2>
                <div className="form-space">
                    <input type="text" placeholder="Name" onChange={(event) => { setName(event.target.value) }} />
                    <input type="text" placeholder="Surname" onChange={(event) => { setSurname(event.target.value) }} />
                    <input type="text" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                    <input type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <div className="button-span text-center">
                    <div>
                        <button onClick={signUp}>Sign up</button>
                    </div>
                    <span>Already have an account? <Link to="/login">Log in</Link></span>
                </div>
            </div>
            <div className="spinner">
                {spinner ? <Spinner /> : null}
            </div>
        </div>
    )
}

export default SignUp
