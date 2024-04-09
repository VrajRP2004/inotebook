// import React, { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitaial =[]
    
    const [notes, setNotes] = useState(notesInitaial)

    //get all a Note
    // console.log("Adding a new note")
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json() 
        setNotes(json)
      }
    
    

    //Add a Note
    // console.log("Adding a new note")
    const addNote =async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/allnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });

        const note = await response.json()
        setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = response.json()
        // console.log(json)
        // console.log("Deleting the note with id" + id)
        const newNote = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNote)
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = response.json();
        // console.log(json)
        //login to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index]
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;