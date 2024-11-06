import React, {useState} from "react";
import { NavBar } from "./components/NavBar";
import { Main } from "./components/Main";
import styles from "./FunFactsStyles.module.css"

export function FunFactsPage() {
    const [ darkMode, setDarkMode ] = useState(false);

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }

    return (
        <div className={styles.container}>
            <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Main darkMode={darkMode} />
        </div>
    )
}