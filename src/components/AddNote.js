import React, { useContext, useState } from 'react'

import noteContext from "../context/notes/noteContext"
const AddNote = () => {
    
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick= (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }
    const onchange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className='container my-3'>
        <h1>Add a Note</h1>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={note.title} required minLength={2} id="title" aria-describedby="emailHelp" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={note.description} required minLength={2} name="description" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" minLength={2} required  className="form-control" value={note.tag} id="tag" name="tag" onChange={onchange} />
          </div>
          
          <button disabled={note.title.length<2 || note.description.length<2 || note.tag.length<2} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
