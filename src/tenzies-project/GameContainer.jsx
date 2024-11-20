import { Die } from "./Die";

export function GameContainer({styles}) {

    let diceArray = Array(10).fill(1).map(value => Math.ceil(Math.random() * 6));

    /**
     * Challenge:
     * 
     * - Style the <main> and <Die> components 
     *   to look like they do in the slide
     *      - Hints: Create a container to hold the 10 instances
     *        of the Die component, and use CSS Grid to lay them
     *        out evenly in 2 rows of 5 columns
     *      - Use flexbox on main to center the dice container
     *        in the center of the page
     */

    return (
        <main className={`${styles.displayFlexCenter} ${styles.gameElement}`}>
            <div className={styles.diceContainer}>
                {diceArray.map((value, index) => <Die key={`die-${index + 1}`} value={value} styles={styles} />)}
            </div>
        </main>
    )
}