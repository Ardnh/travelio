import { Fragment } from "react/jsx-runtime"
import { useAuth } from "../hooks/useAuth"
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"

const Auth = () => {

    const { mode, setMode } = useAuth()

    return (
        <Fragment>
            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-8 flex items-center bg-amber-100 p-10">
                    <div className="">
                        <div className="text-[10rem]">Travelio</div>
                        <div className="text-[1.7rem]">Your all in one travel planner, guide and resources</div>
                    </div>
                </div>
                <div className="col-span-4 flex items-center p-[6rem]">
                    <div className="w-full">
                        <div className="">
                            { mode === 'login' && <LoginForm/> }
                            { mode === 'register' && <RegisterForm/> }
                        </div>
                        <div className="w-full flex justify-center mt-[3rem]">
                            { mode === 'login' && <div>Don't have an account? <span className="font-semibold cursor-pointer" onClick={() => setMode('register')}>Sign Up</span></div> }
                            { mode === 'register' && <div>Already have an account ? <span className="font-semibold cursor-pointer" onClick={() => setMode('login')}>Sign In</span></div> }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Auth