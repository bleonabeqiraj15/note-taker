import React from 'react'

const Popup = ({ notes, handleClose, handleChange, updateData }) => {

    return (
        <div className="popup-box">
            <div className="box container-bcg d-flex">
                <form onSubmit={() => updateData(notes.id)} className="form login-form d-flex flex-column justify-content-center m-auto">
                    <button onClick={handleClose} className="cancel-button">X</button>
                    <h2 className="dark-blue">Edit note</h2>
                    <div>
                        <div className="user-input d-flex flex-column">
                            <input type="text" name="title" defaultValue={notes.title} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="user-input d-flex flex-column">
                            <input type="text" name="description" defaultValue={notes.description} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="button-span d-flex justify-content-center align-items-center flex-column">
                        <button type="submit">Save data</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Popup
