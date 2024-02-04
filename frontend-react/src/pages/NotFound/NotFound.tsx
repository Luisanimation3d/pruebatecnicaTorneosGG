import styles from './NotFound.module.css';

export const NotFound = () => {
    return (
        <>
            <h1 className={styles.not__found__title}>404</h1>
            <p className={styles.not__found__subtitle}>Not Found</p>
        </>
    )
}