const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Note = require("../models/Notes")
const { body, validationResult } = require("express-validator")

// ROUTE 1: Get all the notes using : GET "/api/notes/getuser" Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2: Add a new Note using : POST "/api/notes/addnote" Login required

router.post('/allnote', fetchUser, [
    body('title', 'Enter a valid litle').isLength({ min: 3 }),
    body('description', 'Enter a valid description it must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Update an existing Note : PUT "/api/notes/updatenote" Login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // Find the note to be update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json('Not Allowed')
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }


})

// ROUTE 4: Delete an existing Note : DELETE "/api/notes/deletenote" Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note 

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json('Not Allowed')
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }


})

module.exports = router