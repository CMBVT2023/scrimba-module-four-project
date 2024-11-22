export function Die({styles, dieObj, hold, isDisabled}) {
    const { value, isHeld, id} = dieObj;

    const holdingStyle = {
        backgroundColor: `${isHeld ? '#59E391' : '#FFFFFF'}`
    }

    const disabledStyle = {
        backgroundColor: '#808080',
        cursor: 'default'
    }

    if (isDisabled) {
        return (<div className={`${styles.displayFlexCenter} ${styles.dieElement}`} 
                style={disabledStyle}>
                    <p>0</p>
                </div>)
    } else {
        return (
            <div className={`${styles.displayFlexCenter} ${styles.dieElement}`} 
            style={holdingStyle} onClick={() => hold(id)}>
                <p>{value}</p>
            </div>
        )
    }
}