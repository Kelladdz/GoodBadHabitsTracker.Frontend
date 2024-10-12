import { Outlet } from "react-router-dom";
import Header from "./components/home/header/Header"

const PrivateRoute = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default PrivateRoute;