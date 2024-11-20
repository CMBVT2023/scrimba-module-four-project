export function Die({styles, value}) {

    return (
        <div className={`${styles.displayFlexCenter} ${styles.dieElement}`}>
            <p>{value}</p>
        </div>
    )
}