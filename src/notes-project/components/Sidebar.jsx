import React from "react";

import styles from '../NotesStyles.module.css'

export function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => {
        let noteString = JSON.stringify(note.body)
        noteString = noteString.substring(1, noteString.length - 1)
        
        let noteTitle = noteString.split('\\n')[0]

        return (
            <div key={note.id}>
                <div
                    className={`${styles.title} ${
                        note.id === props.currentNote.id ? styles.selectedNote : ""
                    }`}
                    onClick={() => props.setCurrentNoteId(note.id)}
                >
                    <h4 className={styles.textSnippet}>{noteTitle}</h4>
                </div>
            </div>
        )
    })

    return (
        <section className={`${styles.pane} ${styles.sidebar}`}>
            <div className={styles.sidebarHeader}>
                <h3>Notes</h3>
                <button className={styles.newNote} onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}