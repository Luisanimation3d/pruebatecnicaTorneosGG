import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserLayout} from "./layout/UserLayout/UserLayout.tsx";
import {Home} from "./pages/Home/Home.tsx";
import {Explorer} from "./pages/Explorer/Explorer.tsx";
import {Login} from "./pages/Login/Login.tsx";
import {Register} from "./pages/Register/Register.tsx";
import {Create} from "./pages/Create/Create.tsx";
import {UserProfileLayout} from "./layout/UserProfileLayout/UserProfileLayout.tsx";
import {MyEvents} from "./pages/MyEvents/MyEvents.tsx";
import {EventDetail} from "./pages/EventDetail/EventDetail.tsx";
import {BookingEvent} from "./pages/BookingEvent/BookingEvent.tsx";
import {MyBookings} from "./pages/MyBookings/MyBookings.tsx";
import {NotFound} from "./pages/NotFound/NotFound.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute.tsx";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<UserLayout/>}>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/explorer'} element={<Explorer/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        <Route path={'/event-detail/:id'} element={<EventDetail/>}/>
                        <Route path={'/booking-event/:id'} element={<BookingEvent/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Route>
                    <Route path={'/profile/'} element={<UserProfileLayout/>}>
                        <Route path={'create-event'} element={<Create/>}/>
                        <Route path={'my-events'} element={<MyEvents/>}/>
                        <Route path={'my-bookings'} element={<MyBookings/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}