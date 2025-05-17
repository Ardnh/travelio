import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime"

const AuthenticationLayout = () => {

    return (
        <Fragment>
            <Outlet/>
        </Fragment>
    )
}

export default AuthenticationLayout