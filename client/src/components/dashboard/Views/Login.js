/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import React, { useState } from 'react';
import Axios from 'axios'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { BiLogInCircle } from "react-icons/bi";
import { toast } from "react-toastify"
import Spinner from '../../../helpers/Spinner';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);
    const history = useHistory();


    const url = "http://localhost:3002/auth"


    const login = (e) => {
        e.preventDefault();

        const data = { email: email, password: password }
        Axios.post(url + "/login", data).then((response) => {
            if (response.data.error) {
                setSpinner(!spinner)
                setTimeout(() => {
                    toast.warn(response.data.error);
                    setSpinner(false)
                }, 2500)
                // alert(response.data)
            }
            else {
                // console.log("userData: ", response.data);
                localStorage.setItem("token", response.data.token); //this comes from routes -> const accessToken -> res.json({token, username, id})
                const userData = {
                    id: response.data.id,
                    // name: response.data.name,
                    email: response.data.email
                }
                setSpinner(!spinner)
                setTimeout(() => {
                    redirect();
                    setSpinner(false)
                }, 2500)
                localStorage.setItem("user", JSON.stringify(userData));
                toast.success(response.data.message)
            }
        })
        console.log(spinner)

    }

    const redirect = () => {
        history.push("/dashboard")
    }

    return (

        <div className="container-bcg">
            <form onSubmit={(e) => login(e)} className="form login-form d-flex flex-column justify-content-center">
                <div className="icon text-center">
                    <BiLogInCircle />
                </div>
                <h2 className="dark-blue">Login</h2>
                <div className="form-space">
                    <input type="text" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                    <input type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />

                </div>
                <div className="button-span text-center">
                    <div>
                        <button disabled={(email && password) < 1} type="submit">Login</button>
                    </div>
                    <span>Create an account <Link to="/create-account">here</Link></span><br />
                    <span><Link to="/forget-password">Forgot password?</Link></span>
                </div>

            </form>
            <div className="spinner">
                {spinner ? <Spinner /> : null}
            </div>
        </div>
    )
}

export default Login
