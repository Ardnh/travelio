import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const useAuth = () => {

    const navigate = useNavigate()

    const [mode, setMode] = useState<'login' | 'register'>('login')

    const goToHome = () => {
        navigate('/')
    }

    return {
        mode,
        goToHome,
        setMode,
    }
}