import {Banner} from "../../components/Banner/Banner.tsx";
import bannerHome from "../../assets/images/banner.jpg";
export function Home() {
    return (
        <>
            <Banner title={'Explora y reserva experiencias únicas'} subtitle={'Encuentra eventos emocionantes cerca de ti y asegura tu lugar en segundos'} image={bannerHome}/>
        </>
    )
}