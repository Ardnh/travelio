import { useAppDispatch, useAppSelector } from "@/app/stores"
import { useCallback, useEffect, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { getArticleThreadsList } from "../store/threads/threadsThunk"
import { setArticleThreadsParams, setHasMore, setLoading } from "../store/threads/threadsSlice"
import debounce from "lodash.debounce"
import { toast } from "sonner"

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
    };

    const handleSearch = async (term: string) => {
        try {

            if(term === "") {
                dispatch(setLoading({actionName: 'searchArticle', status: false}))
            } else {
                dispatch(setLoading({actionName: 'searchArticle', status: true}))
            }

            await dispatch(getArticleThreadsList({
                ...articleParams,
                page: 1,
                filterTitle: term
            })).unwrap();
        } catch (err) {
            toast.success("Failed to search article")
        } finally {
            dispatch(setLoading({actionName: 'searchArticle', status: false}))
        }
    };

    // Debounced version
    const debouncedSearch = useCallback(
        debounce((value: string) => handleSearch(value), 2000),
        []
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    useEffect(() => {
        document.title = 'Threads | Travelio.'
        dispatch(getArticleThreadsList(articleParams))
    }, [])
    return {
        loading,
        articles,
        hasMore,
        fetchMore,
        onChange,
    }
}