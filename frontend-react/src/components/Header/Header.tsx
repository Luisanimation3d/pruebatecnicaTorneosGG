import {useState, useRef, useEffect} from "react";
import styles from './Header.module.css';
import {FiInstagram, FiGithub, FiLinkedin, FiMenu, FiX} from "react-icons/fi";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Header = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const menuContainerRef = useRef<HTMLDivElement | null>(null);

    const {isAuthenticated: auth} = useSelector((state: any) => state.auth);



    const handleMenuOpen = () => {
        menuContainerRef.current?.classList.toggle(`${styles.menu__container__open}`);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth);
        });
    }, []);

    return (
        <header className={`${styles.header__container}`}>
            {
                screenWidth < 768 ? (
                    <>
                        <Link to="/" className={`${styles.logo__container}`}>
                            Eventos
                        </Link>
                        <button className={styles.button__menu} onClick={handleMenuOpen}>
                            <FiMenu/>
                        </button>
                        <div className={`${styles.menu__container}`} ref={menuContainerRef}>
                            <button className={`${styles.button__menu} ${styles.button__close__menu}`}
                                    onClick={handleMenuOpen}>
                                <FiX/>
                            </button>

                            <ul className={`${styles.items__menu}`}>
                                {auth ? (
                                        <>
                                            <li className={`${styles.item__menu}`}><Link to="/" onClick={handleMenuOpen}>Inicio</Link></li>
                                            <li className={`${styles.item__menu}`}><Link to="/explorer" onClick={handleMenuOpen}>Explorar</Link>
                                            </li>
                                            <li className={`${styles.item__menu}`}><Link to="/profile" onClick={handleMenuOpen}>Perfil</Link></li>
                                        </>
                                    )
                                    : (
                                        <>
                                            <li className={`${styles.item__menu}`}><Link to="/" onClick={handleMenuOpen}>Inicio</Link></li>
                                            <li className={`${styles.item__menu}`}><Link to="/explorer" onClick={handleMenuOpen}>Explorar</Link>
                                            </li>
                                            <li className={`${styles.item__menu}`}><Link to="/login" onClick={handleMenuOpen}>Iniciar
                                                Sesión</Link></li>
                                        </>
                                    )
                                }
                            </ul>
                            <ul className={`${styles.items__social}`}>
                                <li className={`${styles.item__social}`}><a
                                    href="https://www.instagram.com/_luis.angel.c_/"
                                    target={'_blank'}><FiInstagram/></a>
                                </li>
                                <li className={`${styles.item__social}`}><a href="https://github.com/Luisanimation3d/"
                                                                            target={'_blank'}><FiGithub/></a></li>
                                <li className={`${styles.item__social}`}><a
                                    href="https://www.linkedin.com/in/luis-angel-correa-558979148/"
                                    target={'_blank'}><FiLinkedin/></a></li>
                            </ul>

                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/" className={`${styles.logo__container}`}>
                            Eventos
                        </Link>
                        <ul className={`${styles.items__menu}`}>
                            {
                                auth ? (
                                        <>
                                            <li className={`${styles.item__menu}`}><Link to="/">Inicio</Link></li>
                                            <li className={`${styles.item__menu}`}><Link to="/explorer">Explorar</Link>
                                            </li>
                                            <li className={`${styles.item__menu}`}><Link to="/profile">Perfil</Link></li>
                                        </>
                                    )
                                    : (
                                        <>
                                            <li className={`${styles.item__menu}`}><Link to="/">Inicio</Link></li>
                                            <li className={`${styles.item__menu}`}><Link to="/explorer">Explorar</Link>
                                            </li>
                                            <li className={`${styles.item__menu}`}><Link to="/login">Iniciar
                                                Sesión</Link></li>
                                        </>
                                    )
                            }
                        </ul>
                        <ul className={`${styles.items__social}`}>
                            <li className={`${styles.item__social}`}><a
                                href="https://www.instagram.com/_luis.angel.c_/" target={'_blank'}><FiInstagram/></a>
                            </li>
                            <li className={`${styles.item__social}`}><a href="https://github.com/Luisanimation3d/"
                                                                        target={'_blank'}><FiGithub/></a></li>
                            <li className={`${styles.item__social}`}><a
                                href="https://www.linkedin.com/in/luis-angel-correa-558979148/"
                                target={'_blank'}><FiLinkedin/></a></li>
                        </ul>
                    </>
                )
            }
        </header>
    )
}