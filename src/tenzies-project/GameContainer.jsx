import { Die } from "./Die";

export function GameContainer({styles}) {

    /**
     * Challenge:
     * 
     * Write a function (allNewDice) that returns an array 
     * of 10 random numbers between 1-6 inclusive.
     * 
     * Log the array of numbers to the console for now
     */

    let diceArray = allNewDice()

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