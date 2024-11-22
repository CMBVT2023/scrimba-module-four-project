import { useState, useId } from "react";
import { Die } from "./Die";

export function GameContainer({styles}) {
    const [ dice, setDice ] = useState(allNewDice())

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: `die-${Math.random()}`
        }
    }
        
    function allNewDice() {
        //! My way of originally filling the array
        // const newDice = new Array(10).fill(1).map(value => Math.ceil(Math.random() * 6));

        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }

        return newDice
    }

    function rollDice() {
        setDice(prevDiceArray => prevDiceArray.map(die => {
            return die.isHeld ? die : generateNewDie();
        }))
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
            <h1 className={styles.gameTitle}>Tenzies</h1>
            <p className={styles.instructionsParagraph}>Roll until all  dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className={styles.diceContainer}>
                {/* Another way of passing the hold function with the id, is to pass an arrow function that will call hold dice with the dice's id. */}
                {dice.map((die) => <Die key={die.id} dieObj={die} styles={styles} hold={holdDice} />)}
            </div>
            <button onClick={() => rollDice()} className={styles.reRollButton}>Roll</button>
        </main>
    )
}