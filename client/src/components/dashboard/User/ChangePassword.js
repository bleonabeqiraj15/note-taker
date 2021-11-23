import React, { useState } from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router';
import Spinner from '../../../helpers/Spinner';

const ChangePassword = () => {

    const [oldPassword, setOldPaasword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = localStorage.getItem("token");
    const url = "http://localhost:3002/change-password";
    const [spinner, setSpinner] = useState(false);

    let history = useHistory()

    const changePassword = (e) => {
        e.preventDefault();

        Axios.put(url, { oldPassword, newPassword, confirmPassword }, {
            headers: {
                "token": `${token}`
            }
        })
            .then((response) => {
                if (!(oldPassword && newPassword && confirmPassword)) {

                    setSpinner(!spinner)
                    setTimeout(() => {
                        toast.warn("Please fill all fields")
                        setSpinner(false)
                    }, 2500)
                }
                else {
                    if (!oldPassword) {
                        setSpinner(!spinner)
                        setTimeout(() => {
                            toast.warn(response.data.error)
                            setSpinner(false)
                        }, 2500)
                    }
                    else if (newPassword !== confirmPassword) {
                        setSpinner(!spinner)
                        setTimeout(() => {
                            toast.warn(response.data.error)
                            setSpinner(false)
                        }, 2500)
                    }
                    else {

                        setSpinner(!spinner)
                        setTimeout(() => {
                            toast.success(response.data)
                            history.push("/dashboard")
                            setSpinner(false)
                        }, 2500)
                    }
                }

            })
            .catch((error) => {
                toast.warn(error)
                console.log(error.data.error)
            })
    }

    return (
        <div className="container-bcg d-flex flex-column">
            <form onSubmit={(e) => changePassword(e)} className="form login-form d-flex flex-column justify-content-center m-auto" autoComplete="off">
                <h2 className="dark-blue">Change password</h2>
                <div className="user-input d-flex flex-column">
                    <input type="password" name="oldPassword" placeholder="Old password" onChange={(event) => { setOldPaasword(event.target.value) }} />
                </div>
                <div className="user-input d-flex flex-column">
                    <input type="password" name="newPassword" placeholder="New password" onChange={(event) => { setNewPassword(event.target.value) }} />
                </div>
                <div className="user-input d-flex flex-column">
                    <input type="password" name="confirmPassword" placeholder="Confirm new password" onChange={(event) => { setConfirmPassword(event.target.value) }} />
                </div>
                <div className="button-span d-flex justify-content-center align-items-center">
                    <button type="submit">Save</button>
                </div>
            </form>
            <div className="spinner">
                {spinner ? <Spinner /> : null}
            </div>
        </div>
    )
}

export default ChangePassword
