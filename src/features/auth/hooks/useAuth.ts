import { useState } from "react"


export const useAuth = () => {

    const [mode, setMode] = useState<'login' | 'register'>('login')

    return {
        mode,
        setMode
    }
}