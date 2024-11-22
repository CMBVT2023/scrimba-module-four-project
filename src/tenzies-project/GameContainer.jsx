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
        setDice(prevDiceArray => {
            return prevDiceArray.map((die) => {
                //* Using ternary operator.
                return die.id == diceId ? {...die, isHeld: !die.isHeld} : die;
                //* Using if else statements
                /* if (die.id == diceId) {
                    return {
                        ...die,
                        isHeld: !die.isHeld,
                    }
                } else {
                    return die;
                } */
            })
        })
    }

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            <div className={styles.diceContainer}>
                {/* Another way of passing the hold function with the id, is to pass an arrow function that will call hold dice with the dice's id. */}
                {dice.map((die) => <Die key={die.id} dieObj={die} styles={styles} hold={holdDice} />)}
            </div>
            <button onClick={() => setDice(allNewDice())} className={styles.reRollButton}>Roll</button>
        </main>
    )
}