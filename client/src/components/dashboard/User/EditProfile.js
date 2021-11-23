import React from 'react'
import Spinner from '../../../helpers/Spinner'

const EditProfile = ({ profile, editProfile, handleChange, isEdited, spinner }) => {

    return (
        <div className="container-bcg d-flex flex-column">
            <form onSubmit={(e) => editProfile(e)} className="form login-form d-flex flex-column justify-content-center m-auto" autoComplete="off">
                <h2 className="dark-blue">Edit profile</h2>
                <div className="user-input d-flex flex-column">
                    <input type="text" minLength={3} name="name" defaultValue={profile.name} onChange={(e) => handleChange(e)} />
                </div>

                <div className="user-input d-flex flex-column">
                    <input type="text" minLength={3} name="surname" defaultValue={profile.surname} onChange={(e) => handleChange(e)} />
                </div>
                <div className="user-input d-flex flex-column">
                    <div>{profile.email}</div>
                </div>
                <div className="button-span d-flex justify-content-center align-items-center">
                    <button disabled={!isEdited} type="submit">Edit</button>
                </div>
            </form>
            <div className="spinner">
                {spinner ? <Spinner /> : null}
            </div>
        </div>


    )
}

export default EditProfile
