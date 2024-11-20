import React, { useEffect, useState } from "react";
import { Editor } from "./components/Editor";
import { Sidebar } from "./components/Sidebar";

import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

import { notesCollection, db } from "./firebase";

import styles from './NotesStyles.module.css'

export function NotesPage() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")

    const [ tempNoteText, setTempNoteText ] = useState("");

    const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

    // Shallow copies the array of notes since the .sort() method mutates the array, so without shallow copying,
    // it would mutate the current state of notes which would cause errors.
    const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt)

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

    useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])

    /**
     * Create an effect that runs any time the tempNoteText changes
     * Delay the sending of the request to Firebase
     *  uses setTimeout
     * use clearTimeout to cancel the timeout
     */

    useEffect(() => {
        async function updateNote(text) {
            const docRef = doc(db, "notes", currentNoteId)

            // Similar to deleting, you need to have a reference to the document you are attempting to edit, and then you pass in the changes you want to make as the second argument
            // in this case, we just construct a new object with the body property set to the text passed in to the function.
            await setDoc(docRef, {
                body: text,
                updatedAt: Date.now()
            }, {merge: true})
        }

        // This will now trigger 500 milliseconds after the user stops typing in their notes,
        // if the user does type against before the 500 milliseconds, the timer resets.
        const timeoutId = setTimeout(() => {
            updateNote(tempNoteText);
        }, 500)

        return() => clearTimeout(timeoutId);

        //! My first attempt at creating the debounce update
        /* let debounceUpdate = setTimeout(() => {
            updateNote(tempNoteText);
            console.log('Update.')
        }, 500)
        
        return () => {
            console.log('Debounce activated.')
            clearTimeout(debounceUpdate)
        } */
    }, [tempNoteText, currentNoteId])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        // This will add the new note to the notesCollection in the firestore database, and this requires passing in the variable retaining the collection and the new object you wish to add.
        //* Because we are using snapshot, once this note is added, the snapshot feature will update our current state value for the notes array.
        //* Also, the firebase database creates their own unique ids for each entry so appending a id property is no longer required.
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
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
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                    <Editor 
                        currentNote={tempNoteText} 
                        updateNote={setTempNoteText} 
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