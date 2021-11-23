import React from 'react'
import Spinner from '../../../helpers/Spinner';
import Note from './Note';

const MyNotes = ({ notes, deleteNote, spinner }) => {

    return (
        <div className="switched-components">
            <div className="component-name">
                <div>{notes.length}</div><span className="dark-blue">Your notes</span>
            </div>
            <hr />

            <div className="dashboard-container">
                <div className="spinner">
                    {spinner ? <div><h4>Loading notes</h4><Spinner /> </div> : null}
                </div>
                {
                    notes.map((note) => {
                        return <Note note={note} key={note.id} deleteNote={() => deleteNote(note.id)} />
                    })
                }
            </div>
        </div >
    )
}

export default MyNotes
