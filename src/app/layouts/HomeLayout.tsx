import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime"

const HomeLayout = () => {

    return (
        <Fragment>
            <Outlet/>
        </Fragment>
    )
}

export default HomeLayout