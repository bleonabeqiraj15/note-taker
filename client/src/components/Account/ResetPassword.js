import React, { useState } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

const ResetPassword = () => {

    const [resetToken, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const url = "http://localhost:3002/reset-password"
    let history = useHistory()

    const savePassword = (e) => {
        e.preventDefault();

        Axios.put(url, { resetToken, newPassword })
            .then((response) => {
                if (response.data.error) {
                    toast.warn(response.data.error)
                }
                else {
                    history.push("/login")
                    toast.success(response.data);
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div className="container-bcg">
            <form onSubmit={savePassword} className="form login-form d-flex flex-column justify-content-center">

                <h2 className="dark-blue">Reset password</h2>
                <div className="form-space">
                    <input type="text" placeholder="Token" onChange={(event) => { setToken(event.target.value) }} />
                    <input type="password" placeholder="New password" onChange={(event) => { setNewPassword(event.target.value) }} />

                </div>
                <div className="button-span text-center">
                    <div>
                        <button type="submit">Save new password</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default ResetPassword
