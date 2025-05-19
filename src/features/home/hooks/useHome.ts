import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useHome = () => {

    const navigate = useNavigate()

    const goToAuth = () => {
        navigate('/auth')
    }

    useEffect(() => {
        document.title = 'Travelio.'
    })

    return {
        goToAuth
    }
}