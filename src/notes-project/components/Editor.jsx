import React, {useState} from "react";
import ReactMde from "react-mde"
import Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css';

import styles from '../NotesStyles.module.css'

export function Editor({currentNote, updateNote}) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <section className={`${styles.pane} ${styles.editor}`}>
            <ReactMde
                // Now that the current note is a temporary string, it does not need to access a body property on the current not object.
                value={currentNote}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}