import { useForm } from "react-hook-form"
import { loginSchema } from '../schema'
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { useAppDispatch, useAppSelector } from '@/app/stores';
import { login } from '@/features/auth/store/authThunks'
import { setLoading } from "../store/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StorageUtils } from "@/app/lib/storage";

export const useLogin = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const auth = useAppSelector((state) => state.auth)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {

        try {
            dispatch(setLoading({ actionName: 'login', status: true }))
            await dispatch(login(values)).unwrap()
        } catch (err) {
            console.error('Login error:', err)
        } finally {
            dispatch(setLoading({ actionName: 'login', status: false }))
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
        onSubmit,
        loading: auth.loading.loginIsLoading
    }
}