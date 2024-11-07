import React, { useEffect } from "react";
import { Editor } from "./components/Editor";
import { Sidebar } from "./components/Sidebar";

import { data } from "./data";

import Split from "react-split"
import {nanoid} from "nanoid"

import styles from './NotesStyles.module.css'

export function NotesPage() {
    const [notes, setNotes] = React.useState(() => 
        JSON.parse(localStorage.getItem('notes')) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    useEffect(() => {
        localStorage.setItem('notes', 
            JSON.stringify(notes)
        )
    }, [notes]);

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
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
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
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
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
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