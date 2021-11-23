import React, { useState } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const url = "http://localhost:3002/forgot-password"
    let history = useHistory()

    const sendToken = (e) => {
        e.preventDefault();

        Axios.post(url, { email })
            .then((response) => {
                if (response.data.error) {
                    toast.warn(response.data.error)
                }
                else {
                    history.push("/reset-password")
                    toast.success(response.data);
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div className="container-bcg">
            <form onSubmit={sendToken} className="form login-form d-flex flex-column justify-content-center">

                <h2 className="dark-blue">Forgot password?</h2>
                <div className="form-space">
                    <input type="text" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                    {/* <input type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} /> */}

                </div>
                <div className="button-span text-center">
                    <div>
                        <button type="submit">Send</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default ForgetPassword
