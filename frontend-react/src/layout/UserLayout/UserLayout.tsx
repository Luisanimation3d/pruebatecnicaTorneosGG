import {Header} from "../../components/Header/Header.tsx";
import {Outlet} from "react-router-dom";
import styles from './UserLayout.module.css';
import {Footer} from "../../components/Footer/Footer.tsx";

export function UserLayout() {
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}