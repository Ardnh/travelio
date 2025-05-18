import { useAppDispatch, useAppSelector } from "@/app/stores"
import { useForm } from "react-hook-form"
import { registerSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { setLoading } from "../store/authSlice"
import { register } from "../store/authThunks"
import { useEffect } from "react"
import { StorageUtils } from "@/app/lib/storage"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const auth = useAppSelector((state) => state.auth)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {

        try {
            dispatch(setLoading({ actionName: 'register', status: true }))
            await dispatch(register(values)).unwrap()
        } catch (err) {
            console.error('Login error:', err)
        } finally {
            dispatch(setLoading({ actionName: 'register', status: false }))
        }

    }

    useEffect(() => {
        const storageToken = StorageUtils.getStringItem('token')
        if (auth.token && auth.user && storageToken !== "") {
            navigate('/dashboard')
        }
    }, [auth.token, auth.user])

    return {
        form,
        loading: auth.loading.registerIsLoading,
        onSubmit
    }
}