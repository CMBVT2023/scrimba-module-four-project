import { useState, useId } from "react";
import { Die } from "./Die";

export function GameContainer({styles}) {
    const [ dice, setDice ] = useState(allNewDice())

    /**
     * Challenge: Create a function `holdDice` that takes
     * `id` as a parameter. For now, just have the function
     * console.log(id).
     * 
     * Then, figure out how to pass that function down to each
     * instance of the Die component so when each one is clicked,
     * it logs its own unique ID property. (Hint: there's more
     * than one way to make that work, so just choose whichever
     * you want)
     * 
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

    function holdDice(diceId) {
        console.log(diceId)
    }

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            <div className={styles.diceContainer}>
                {dice.map((die) => <Die key={die.id} dieObj={die} styles={styles} hold={holdDice} />)}
            </div>
            <button onClick={() => setDice(allNewDice())} className={styles.reRollButton}>Roll</button>
        </main>
    )
}