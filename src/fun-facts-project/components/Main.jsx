import React from "react";
import styles from "../FunFactsStyles.module.css"

export function Main(props) {
    return (
        <main className={`${styles.mainBody} ${props.darkMode ? styles.dark : ""}`}>
            <h1 className={styles.mainTitle}>Fun facts about React</h1>
            <ul className={styles.mainFacts}>
                <li>Was first released in 2013</li>
                <li>Was originally created by Jordan Walke</li>
                <li>Has well over 100K stars on GitHub</li>
                <li>Is maintained by Facebook</li>
                <li>Powers thousands of enterprise apps, including mobile apps</li>
            </ul>
        </main>
    )
}