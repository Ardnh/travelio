import { useAppDispatch, useAppSelector } from "@/app/stores"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getArticleList } from "@/features/dashboard/store/articles/articlesThunks"

export const useArticle = () =>{

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, articles, articlesParams } = useAppSelector((state) => state.article)

    const onCreateArticle = async () => {

    }

    const onUpdateArticle = async () => {

    }

    const onDeleteArticle = async () => {

    }

    useEffect(() => {
        dispatch(getArticleList(articlesParams))
    },[])


    return {
        loading,
        articles
    }
}