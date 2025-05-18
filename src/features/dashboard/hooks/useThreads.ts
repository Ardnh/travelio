import { useAppDispatch, useAppSelector } from "@/app/stores"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getArticleThreadsList } from "../store/threads/threadsThunk"
import { setArticleThreadsParams, setHasMore } from "../store/threads/threadsSlice"

export const useThread = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, articleParams, articles, totalArticle, hasMore } = useAppSelector((state) => state.threads)

    const fetchMore = async () => {

        const nextPage = articleParams.page + 1;
        if (nextPage * articleParams.pageSize < totalArticle) {
            dispatch(setHasMore(true))
            dispatch(setArticleThreadsParams({
                ...articleParams,
                page: nextPage
            }));

            await dispatch(getArticleThreadsList({
                ...articleParams,
                page: nextPage
            })).unwrap();
        } else {
            dispatch(setHasMore(false))
            console.log("No more data");
        }
        // setLoading(true);
        // try {
        //     const res = await axios.get<ApiResponse>(`/api/articles?page=${page}&pageSize=10`);
        //     setArticles((prev) => [...prev, ...res.data.data]);

        //     const total = res.data.meta.total;
        //     setHasMore((page + 1) * 10 < total);

        //     setPage((prev) => prev + 1);
        // } catch (error) {
        //     console.error("Fetch error:", error);
        //     setHasMore(false);
        // } finally {
        //     setLoading(false);
        // }
    };

    useEffect(() => {
        dispatch(getArticleThreadsList(articleParams))
    }, [])
    return {
        loading,
        articles,
        hasMore,
        fetchMore
    }
}