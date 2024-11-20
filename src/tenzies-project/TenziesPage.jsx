import { GameContainer } from './GameContainer'

import styles from './TenziesStyles.module.css'

export function TenziesPage() {

    return (
        <>
            <div className={`${styles.displayFlexCenter} ${styles.pageDiv}`}>
                <GameContainer styles={styles}/>
            </div>
        </>
    )
}