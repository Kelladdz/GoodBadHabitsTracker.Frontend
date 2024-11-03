const ProgressLogger = () => {
    return (
        <div className={styles['progress-logger']}>
            <div className={styles['progress-logger__header']}>
                <h2 className={styles['progress-logger__title']}>Log progress</h2>
                <button className={styles['progress-logger__close-button']} onClick={handleCloseButtonClick}>
                    <img src={closeIcon} alt="Close" />
                </button>
            </div>
            <div className={styles['progress-logger__content']}>
                <div className={styles['progress-logger__input-container']}>
                    <label className={styles['progress-logger__label']} htmlFor="progress">Progress</label>
                    <input className={styles['progress-logger__input']} type="number" id="progress" min="0" max="100" />
                </div>
                <div className={styles['progress-logger__input-container']}>
                    <label className={styles['progress-logger__label']} htmlFor="note">Note</label>
                    <textarea className={styles['progress-logger__input']} id="note" />
                </div>
                <button className={styles['progress-logger__log-button']} onClick={handleLogButtonClick}>Log</button>
            </div>
        </div>
    );
}

export default ProgressLogger;