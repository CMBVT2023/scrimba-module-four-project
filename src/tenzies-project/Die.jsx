export function Die({styles, dieObj, hold}) {
    const { value, isHeld, id} = dieObj;

    const holdingStyle = {
        backgroundColor: `${isHeld ? '#59E391' : '#FFFFFF'}`
    }

    return (
        <div className={`${styles.displayFlexCenter} ${styles.dieElement}`} 
        style={holdingStyle} onClick={() => hold(id)}>
            <p>{value}</p>
        </div>
    )
}