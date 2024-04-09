import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
const NoteItem = (props) => {
    
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note , updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <input className='btn btn-primary mx-4 q' type="button" value={'Delete'} onClick={()=>{deleteNote(note._id)}}  />
                        <input className='btn btn-primary mx-2' type="button" value={'Edit'} onClick={()=>{updateNote(note)}} /></div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
