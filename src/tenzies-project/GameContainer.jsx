import { useState } from "react";
import { Die } from "./Die";

export function GameContainer({styles}) {
    const [ diceArray, setDiceArray ] = useState(allNewDice())
    /**
     * Challenge:
     * 
     * Create state to hold our array of numbers. (Initialize
     * the state by calling our `allNewDice` function so it 
     * loads all new dice as soon as the app loads)
     * 
     * Map over the state numbers array to generate our array
     * of Die elements and render those in place of our
     * manually-written 10 Die elements.
     */

    function allNewDice() {
        return Array(10).fill(1).map(value => Math.ceil(Math.random() * 6));
    }

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            <div className={styles.diceContainer}>
                {diceArray.map((value, index) => <Die key={`die-${index + 1}`} value={value} styles={styles} />)}
            </div>
        </main>
    )
}