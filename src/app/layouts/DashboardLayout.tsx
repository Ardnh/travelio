import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime"

const DashboardLayout = () => {

    return (
        <Fragment>
            <Outlet/>
        </Fragment>
    )
}

export default DashboardLayout