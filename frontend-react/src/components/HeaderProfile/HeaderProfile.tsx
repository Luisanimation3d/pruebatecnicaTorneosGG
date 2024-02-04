import {FC, useEffect, useState} from "react";

import {FiLogOut, FiMenu} from "react-icons/fi";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {SideBarMenuItemProps, SideBarMenuProps} from "../../types/generaltypes";
import {logout} from "../../features/auth/authSlice.ts";
import {useDispatch} from "react-redux";


import "./HeaderProfile.css";
import {useFetch} from "../../hooks/useFetch.ts";
import Swal from "sweetalert2";

export const HeaderProfile: FC<SideBarMenuProps> = ({
                                                        items
                                                    }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {data, get} = useFetch('http://localhost:3000/api')

    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    }


    useEffect(() => {
        get('/users/single')
    }, []);

    useEffect(() => {
        const width = window.innerWidth;
        if (width > 768) {
            setToggleMenu(true);
        }
    }, []);
    useEffect(() => {
        window.addEventListener('resize', () => {
            const currentDeviceWidth = window.innerWidth;
            if (currentDeviceWidth > 768) {
                setToggleMenu(true);
            } else {
                setToggleMenu(false);
            }
        });
        return () => {
            window.removeEventListener('resize', () => {
                const currentDeviceWidth = window.innerWidth;
                if (currentDeviceWidth > 768) {
                    setToggleMenu(true);
                } else {
                    setToggleMenu(false);
                }
            });
        }
    }, []);
    return (
        <div className={`sideBarMenu__container ${toggleMenu && 'sideBarMenu__container--active'}`}>
            <div className="sideBarMenu__top">
                <div className="sideBarMenu__logo">
                    <Link to={'/'}>
                    Eventos
                    </Link>
                </div>
                <button className="sideBarMenu__toggleMenu" onClick={handleToggleMenu}>
                    <FiMenu/>
                </button>
            </div>
            <div className="sideBarMenu__user">
                <div className={`sideBarMenu__user-image`}>
                    <img src={`http://localhost:3000/api/users/image/${data.user?.image}`} alt={`${data?.user?.firstname} ${data?.user?.lastname}`}/>
                </div>
                <div className="sideBarMenu__user-info">
                    <h4 className={`sideBarMenu__user-name`}>{data.user?.firstname} {data.user?.lastname}</h4>
                </div>
            </div>
            <ul className="sideBarMenu__menu">
                {
                    items?.map((item, index) => {
                        return (
                            <SideBarMenuItem icon={item.icon} title={item.title} link={item.link} key={index}/>
                        )
                    })
                }
            </ul>

            <div className="sideBarMenu__logout">
                <button className="sideBarMenu__logout-button" onClick={()=> {

                    // Preguntar si el usuario si quiere cerrar la sesión

                    Swal.fire({
                        title: 'Cerrar sesión',
                        text: '¿Estás seguro que deseas cerrar sesión?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí',
                        cancelButtonText: 'No',
                        confirmButtonColor: '#C38EB4',
                        cancelButtonColor: '#d01838',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(logout())
                            Swal.fire({
                                title: 'Sesión cerrada',
                                text: 'Tu sesión ha sido cerrada con éxito',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            setTimeout(() => {
                                navigate('/login')
                            }, 1000)
                        }
                    })
                }} >
                    <FiLogOut/>
                    <span className={`sideBarMenu__logout-name`}>
                        Logout
                    </span>
                </button>
                <span className="sideBarMenu__logout-tooltip">Logout</span>
            </div>

        </div>
    )
}

const SideBarMenuItem: FC<SideBarMenuItemProps> = ({
                                                       title,
                                                       link,
                                                       icon
                                                   }) => {
    return (
        <li className="sideBarMenu__menuItem">
            <NavLink to={link} className={`sideBarMenu__menuItem-link`}>
                {icon}
                <span className={`sideBarMenu__menuItem-name`}>{title}</span>
            </NavLink>
            <span className="sideBarMenu__menuItem-tooltip">{title}</span>
        </li>
    )
}