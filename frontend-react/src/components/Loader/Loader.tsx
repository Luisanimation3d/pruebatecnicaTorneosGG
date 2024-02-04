import {FiLoader} from "react-icons/fi";
import styles from './Loader.module.css';

export function Loader() {
  return <span className={styles.loader}><FiLoader/></span>
}