export function Die({styles, value, isHeld}) {

    return (
        <div className={`${styles.displayFlexCenter} ${styles.dieElement}`} 
        style={{backgroundColor: `${isHeld ? '#59E391' : '#FFFFFF'}`}}>
            <p>{value}</p>
        </div>
    )
}