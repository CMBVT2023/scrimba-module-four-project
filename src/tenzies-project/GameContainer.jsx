import { useState } from "react";
import { Die } from "./Die";

export function GameContainer({styles}) {
    const [ dice, setDice ] = useState(allNewDice())

    /**
     * Challenge: Create a `Roll Dice` button that will re-roll
     * all 10 dice
     * 
     * Clicking the button should generate a new array of numbers
     * and set the `dice` state to that new array (thus re-rendering
     * the array to the page)
     */

    function allNewDice() {
        return Array(10).fill(1).map(value => Math.ceil(Math.random() * 6));
    }

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            <div className={styles.diceContainer}>
                {dice.map((value, index) => <Die key={`die-${index + 1}`} value={value} styles={styles} />)}
            </div>
            <button onClick={() => setDice(allNewDice())} className={styles.reRollButton}>Roll</button>
        </main>
    )
}