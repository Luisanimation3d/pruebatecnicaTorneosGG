import {HeaderProfile} from "../../components/HeaderProfile/HeaderProfile.tsx";
import {FiBook, FiBookmark, FiHome, FiTool} from 'react-icons/fi'

import './UserProfileLayout.css';
import {Outlet} from "react-router-dom";

export const UserProfileLayout = () => {
    return (
        <div>
            <HeaderProfile items={[
                {
                    title: 'Inicio',
                    icon:<FiHome/>,
                    link: '/'
                },
                {
                    title: 'Crear Evento',
                    icon:<FiTool/>,
                    link: 'create-event'
                },
                {
                    title: 'Mis Eventos',
                    icon:<FiBook/>,
                    link: 'my-events'
                },
                {
                    title: 'Mis Reservaciones',
                    icon:<FiBookmark/>,
                    link: 'my-bookings'
                }
            ]}/>
            <div className='userProfileLayout__mainContent'>
                <Outlet/>
            </div>
        </div>
    )
}