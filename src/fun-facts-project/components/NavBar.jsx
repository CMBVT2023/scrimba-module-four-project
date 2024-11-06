import React from "react";
import styles from "../FunFactsStyles.module.css"

export function NavBar(props) {
    return (
        <nav 
            className={`${styles.navBar} ${props.darkMode ? styles.dark : ""}`}
        >
            <img 
                className={styles.navLogoIcon}
                src={new URL("../assets/react-icon-small.png", import.meta.url)}
            />
            <h3 className={styles.navLogoText}>ReactFacts</h3>
            
            <div 
                className={styles.toggler} 
            >
                <p className={styles.togglerLight}>Light</p>
                <div 
                    className={styles.togglerSlider}
                    onClick={props.toggleDarkMode}
                >
                    <div className={styles.togglerSliderCircle}></div>
                </div>
                <p className={styles.togglerDark}>Dark</p>
            </div>
        </nav>
    )
}