export function Die({styles, value, isHeld}) {

    const holdingStyle = {
        backgroundColor: `${isHeld ? '#59E391' : '#FFFFFF'}`
    }

    return (
        <div className={`${styles.displayFlexCenter} ${styles.dieElement}`} 
        style={holdingStyle}>
            <p>{value}</p>
        </div>
    )
}