import { useState, useId, useEffect } from "react";
import { Die } from "./Die";
import Confetti from 'react-confetti'

export function GameContainer({styles}) {
    const [ dice, setDice ] = useState(allNewDice());
    const [ tenzies, setTenzies ] = useState(false);

    /**
     * Challenge: Tie off loose ends!
     * 1. If tenzies is true, Change the button text to "New Game"
     * 2. If tenzies is true, use the "react-confetti" package to
     *    render the <Confetti /> component 🎉
     * 
     *    Hint: don't worry about the `height` and `width` props
     *    it mentions in the documentation.
     */
    useEffect(() => {
        //! Video's method for checking for the win conditions
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if (allHeld & allSameValue) {
            console.log("You won!")
            setTenzies(true)
        }

        //! My first attempt at checking for the win conditions 
        /* if (dice) {
            let value = dice[0].value
            
            for (const die of dice) {
                if (!die.isHeld && value != die.value) {
                    return;
                }
            }

            setTenzies(true);
            console.log("You won")
        } */

    }, [dice])

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
        if (tenzies) {
            setDice(allNewDice())
            setTenzies(false)
        } else {
            setDice(prevDiceArray => prevDiceArray.map(die => {
                return die.isHeld ? die : generateNewDie();
            }))
        }
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

    function setAllDice() {
        setDice(new Array(10).fill(1).map(_ => ({value: 1, isHeld: true, id: `die-${Math.random()}`})))
    }

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            {tenzies && <Confetti />}
            <h1 className={styles.gameTitle}>Tenzies</h1>
            <p className={styles.instructionsParagraph}>Roll until all  dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className={styles.diceContainer}>
                {/* Another way of passing the hold function with the id, is to pass an arrow function that will call hold dice with the dice's id. */}
                {dice.map((die) => <Die key={die.id} dieObj={die} styles={styles} hold={holdDice} />)}
            </div>
            <button onClick={rollDice} className={styles.reRollButton}>{tenzies ? 'New Game' : 'Roll'}</button>
            <button onClick={setAllDice}>click</button>
        </main>
    )
}