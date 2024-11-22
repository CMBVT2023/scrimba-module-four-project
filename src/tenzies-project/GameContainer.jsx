import { useState, useId, useEffect } from "react";
import { DisplayTimer } from "./DisplayTimer";
import { Die } from "./Die";
import Confetti from 'react-confetti'

export function GameContainer({styles}) {
    const [ startTime, setStartTime ] = useState(0);
    const [ numberOfRolls, setNumberOfRolls ] = useState(0);
    const [ tenzies, setTenzies ] = useState(false);
    const [ dice, setDice ] = useState(allNewDice());
    const [ newGame, setNewGame ] = useState(true);

    useEffect(() => {
        //! Video's method for checking for the win conditions
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if (allHeld & allSameValue) {
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

    function resetGame() {
        setNumberOfRolls(1);
        setTenzies(false);
        setStartTime(Date.now());
        setDice(allNewDice());
    }

    function generateNewDie() {
        let number = Math.ceil(Math.random() * 6);
        return {
            value: number,
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
            resetGame()
            return
        } else if (numberOfRolls == 0) {
            setStartTime(Date.now());
            setNewGame(false);
        }
        
        
        setNumberOfRolls(prev => prev + 1)
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

    function setAllDice() {
        setDice(new Array(10).fill(1).map(_ => ({value: 1, isHeld: true, id: `die-${Math.random()}`})))
    }

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            {tenzies && <Confetti />}
            <h1 className={styles.gameTitle}>Tenzies</h1>
            <p className={styles.instructionsParagraph}>Roll until all  dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <DisplayTimer start={startTime} hasUserWon={tenzies} />

            <p>{tenzies ? `You Won In ${numberOfRolls} Rolls!` : `Current Role: ${numberOfRolls}`}</p>

            <div className={styles.diceContainer}>
                {/* Another way of passing the hold function with the id, is to pass an arrow function that will call hold dice with the dice's id. */}
                {dice.map((die) => <Die key={die.id} dieObj={die} styles={styles} hold={holdDice} isDisabled={newGame} />)}
            </div>
            <button onClick={rollDice} className={styles.reRollButton}>{tenzies ? 'New Game' : 'Roll'}</button>
            {/* <button onClick={setAllDice}>click</button> */}
        </main>
    )
}