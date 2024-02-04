import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import styles from "./Stars.module.css";

export function Stars({count}: { count: number }) {
    const stars = [1, 2, 3, 4, 5];
    return (
        <>
            {
                stars.map(star => (
                    star <= count ? (
                        <FaStar key={star} className={styles.star}/>
                    ) : star - 0.5 <= count ? (
                        <FaStarHalfAlt key={star} className={styles.star}/>
                    ) : (
                        <FaRegStar key={star} className={styles.star}/>
                    )
                ))
            }
        </>
    )
}