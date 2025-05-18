import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime"
import { Toaster } from "../components/ui/sonner";

const AuthenticationLayout = () => {

    return (
        <Fragment>
            <Outlet/>
            <Toaster/>
        </Fragment>
    )
}

export default AuthenticationLayout