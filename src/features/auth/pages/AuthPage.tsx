import { Fragment } from "react/jsx-runtime"
import { useAuth } from "../hooks/useAuth"
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"
import styles from '../styles/auth.module.css'
import { Button } from "@/app/components/ui/button"
import { ArrowLeftFromLine } from "lucide-react"

const AuthPage = () => {

    const { mode, setMode, goToHome } = useAuth()

    return (
        <Fragment>
            <div className="grid grid-cols-12 h-auto lg:h-screen">
                <div className={`col-span-12 lg:col-span-8 flex items-center p-10 ${styles.authGradient}`}>
                    <div className="">
                        <div className="text-3xl lg:text-[10rem]">Travelio.</div>
                        <div className="text-lg lg:text-[1.7rem]">Your all in one travel planner, guide and resources</div>
                        <Button onClick={goToHome} className="mt-5 w-[10rem]">
                            <ArrowLeftFromLine /> Back to Home
                        </Button>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4 flex items-center p-10 lg:p-[6rem]">
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

export default AuthPage