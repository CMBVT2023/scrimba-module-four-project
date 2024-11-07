import React from "react";

import styles from '../NotesStyles.module.css'

export function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                className={`${styles.title} ${
                    note.id === props.currentNote.id ? styles.selectedNote : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className={styles.textSnippet}>{note.body.split('\n')[0]}</h4>
                <button
                    className={styles.deleteButton}
                    onClick={(e) => props.deleteNote(e, note.id)}
                >
                    <i className={`${styles.ggTrash} ${styles.trashIcon}`}></i>
                </button>
            </div>
        </div>
    ))

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