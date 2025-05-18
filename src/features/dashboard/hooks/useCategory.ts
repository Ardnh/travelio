import { useAppDispatch, useAppSelector } from "@/app/stores"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getCategoryList } from "../store/category/categoryThunk"
import { getSumCategory } from "../store/category/categorySelector"

export const useCategory = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, category } = useAppSelector((state) => state.category)
    const totalCategory = useSelector(getSumCategory)

    useEffect(() => {
        dispatch(getCategoryList())
    },[])

    return {
        loading,
        category,
        totalCategory
    }
}