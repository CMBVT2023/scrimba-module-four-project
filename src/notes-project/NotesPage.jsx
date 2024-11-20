import React, { useEffect } from "react";
import { Editor } from "./components/Editor";
import { Sidebar } from "./components/Sidebar";

import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

import { notesCollection, db } from "./firebase";

import styles from './NotesStyles.module.css'

export function NotesPage() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

    useEffect(() => {
        // This creates a websocket listener within our app, so we need to provide a way for the component to close this if the component unmounts.
        const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
            //TODO: Sync the local notes array with the snapshot data.
            const notesArray = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setNotes(notesArray)
        })

        return () => {
            // This will clean up the websocket connection when the component unmounts
            unsubscribe()
        }
        //* Since unsubscribe is a function, it can also be written like so.
        // return unsubscribe
    }, []);

    useEffect(() => {
        if (!currentNoteId) setCurrentNoteId(notes[0]?.id)
    }, [notes, currentNoteId])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here"
        }

        // This will add the new note to the notesCollection in the firestore database, and this requires passing in the variable retaining the collection and the new object you wish to add.
        //* Because we are using snapshot, once this note is added, the snapshot feature will update our current state value for the notes array.
        //* Also, the firebase database creates their own unique ids for each entry so appending a id property is no longer required.
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }
    
    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)

        // Similar to deleting, you need to have a reference to the document you are attempting to edit, and then you pass in the changes you want to make as the second argument
        // in this case, we just construct a new object with the body property set to the text passed in to the function.
        await setDoc(docRef, {
            body: text
        })
    }

    async function deleteNote(noteId) {
        // First a reference to the document is needed before deleting the note.
        // By calling the doc method and passing three arguments,
        // One is the variable pointing to the database
        // the second is the string specifying the path of the collection.
        // and finally the id of the note we want to delete.
        const docRef = doc(db, "notes", noteId)

        //* From here the deleteDoc method is called and the docRef is passed in as an argument.
        await deleteDoc(docRef);
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className={styles.split}
            >
                <Sidebar
                    notes={notes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                    <Editor 
                        currentNote={currentNote} 
                        updateNote={updateNote} 
                    />
            </Split>
            :
            <div className={styles.noNotes}>
                <h1>You have no notes</h1>
                <button 
                    className={styles.firstNote} 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}