import { Fragment } from "react/jsx-runtime"
import styles from "../styles/home.module.css"
import { useHome } from "../hooks/useHome"
import { Button } from "@/app/components/ui/button"

const HomePage = () => {

    const {goToAuth} = useHome()

    return (
        <Fragment>
            <div className="w-full h-screen flex justify-center items-center">
                <div className={ `${styles.homeGradient} w-11/12 h-11/12 rounded-2xl flex flex-col items-center justify-center` }>
                    <div className="text-7xl text-center md:text-[10rem] lg:text-[20rem]">Travelio.</div>
                    <div className="text-lg text-center md:text-2xl">Your all in one travel planner, guide and resources</div>
                    <Button onClick={goToAuth} className="mt-5 w-[10rem]">
                        Login
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

export default HomePage;