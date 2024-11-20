import { useState, useId } from "react";
import { Die } from "./Die";

export function GameContainer({styles}) {
    const [ dice, setDice ] = useState(allNewDice())
    let id = useId()

    /**
     * Challenge: Update the array of numbers in state to be
     * an array of objects instead. Each object should look like:
     * { value: <random number>, isHeld: false }
     * 
     * Making this change will break parts of our code, so make
     * sure to update things so we're back to a working state
     */

    function allNewDice() {
        //! My way of originally filling the array
        // const newDice = new Array(10).fill(1).map(value => Math.ceil(Math.random() * 6));

        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: `die-${i + 1}`
            })
        }

        return newDice
    }

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            <div className={styles.diceContainer}>
                {dice.map((die) => <Die key={die.id} value={die.value} styles={styles} />)}
            </div>
            <button onClick={() => setDice(allNewDice())} className={styles.reRollButton}>Roll</button>
        </main>
    )
}