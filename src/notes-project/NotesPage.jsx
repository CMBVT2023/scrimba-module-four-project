import React, { useEffect } from "react";
import { Editor } from "./components/Editor";
import { Sidebar } from "./components/Sidebar";

import Split from "react-split"
import { onSnapshot, addDoc } from "firebase/firestore";

import { notesCollection } from "./firebase";

import styles from './NotesStyles.module.css'

export function NotesPage() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0]?.id) || ""
    )

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
    
    function updateNote(text) {
        //? Solution using video pseudocode
        setNotes(oldNotes => {
            let newNotes = [];

            for (const note of oldNotes) {
                if (note.id === currentNoteId) {
                    newNotes.unshift({...note, body: text});
                } else {
                    newNotes.push(note)
                }
            }

            return newNotes;
        })
        
        //? My solution to rearranging the notes.
        /* setNotes(oldNotes => {
            let oldIndex;
            let newNotes = [...oldNotes].filter((oldNote, index) => {
                if (oldNote.id != currentNoteId) return true;
                oldIndex = index;
                return false;
            });
            return [{...oldNotes[oldIndex], body: text}, ...newNotes]
        }) */

        //? First attempt at rearranging notes.
        /* setNotes(oldNotes => {
            let noteIndex;
            let newArr = oldNotes.map((oldNote, index) => {
                if (oldNote.id === currentNoteId) noteIndex = index;
                return oldNote.id === currentNoteId
                    ? { ...oldNote, body: text }
                    : oldNote
            })
            newArr.unshift(newArr.splice(noteIndex, 1)[0]);
            return newArr;
        }) */
        
        
        //! Old code that does not rearrange the array
        /* setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        })) */
    }

    function deleteNote(event, noteId) {
        event.stopPropagation();

        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
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
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={currentNote} 
                        updateNote={updateNote} 
                    />
                }
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