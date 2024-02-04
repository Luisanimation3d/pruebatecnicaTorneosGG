import styles from './Banner.module.css';
import {bannerProps} from "../../types/generaltypes";


export function Banner({title, subtitle, image, fullheight=true}: bannerProps) {
    return (
        <div className={styles.banner} style={{
            height: fullheight ? '100vh' : '50vh',
        }}>
            <div className={styles.banner__image}>
                <img src={image} alt={title}/>
            </div>
            <div className={styles.banner__content}>
                <h1 className={styles.banner__title}>{title}</h1>
                {
                    subtitle && <p className={styles.banner__subtitle}>{subtitle}</p>
                }
            </div>
        </div>
    );
}