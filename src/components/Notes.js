import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes() {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
            
        }
        // eslint-disable-next-line
    }, [getNotes]);

    const ref = useRef(null);
    const refclose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title || "", // Ensure defined value or fallback to empty string
            edescription: currentNote.description || "", // Ensure defined value or fallback to empty string
            etag: currentNote.tag || "" // Ensure defined value or fallback to empty string
        });
    }

    const handleClick = () => {
        // console.log("updating the note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="etitle" id="etitle" minLength={2} required value={note.etitle} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" minLength={2} required value={note.edescription} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" minLength={2} required  value={note.etag} onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<2 || note.edescription.length<2 || note.etag.length<2} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="row">
                    <h2>Your Note</h2>
                    <div className="container">
                    {notes.length===0 && 'No notes added'}
                    </div>
                    {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
                </div>
            </div>
        </>
    )
}

export default Notes;
