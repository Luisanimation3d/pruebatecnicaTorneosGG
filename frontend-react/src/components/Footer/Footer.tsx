import styles from './Footer.module.css';
import {FiGithub, FiInstagram, FiLinkedin} from "react-icons/fi";

export function Footer() {
    return (
        <footer>
            <ul className={styles.social__media__container}>
                <li className={`${styles.icon__container} ${styles.instagram}`}>
                    <span className={styles.tooltip}>Instagram</span>
                    <a href="https://www.instagram.com/_luis.angel.c_/" className={styles.icon}
                       target={'_blank'}><FiInstagram/></a>
                </li>
                <li className={`${styles.icon__container} ${styles.github}`}>
                    <span className={styles.tooltip}>Github</span>
                    <a href="https://github.com/Luisanimation3d/" className={styles.icon} target={'_blank'}><FiGithub/></a>
                </li>
                <li className={`${styles.icon__container} ${styles.linkedin}`}>
                    <span className={styles.tooltip}>
                        Linkedin</span>
                    <a href="https://www.linkedin.com/in/luis-angel-correa-558979148/" className={styles.icon}
                       target={'_blank'}><FiLinkedin/></a>
                </li>
            </ul>
            <p className={styles.footer__text}>Prueba realizada por Luis Angel Correa
                Ramìrez {new Date().getFullYear()}</p>
        </footer>
    )
}