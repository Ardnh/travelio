import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/store/authSlice';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import articleSlice from '@/features/dashboard/store/articles/articlesSlice';
import commentsSlice from '@/features/dashboard/store/comments/commentSlice';
import categorySlice from '@/features/dashboard/store/category/categorySlice';
import threadsSlice from "@/features/dashboard/store/threads/threadsSlice"
import dashboardSlice from '@/features/dashboard/store/dashboard/dashboardSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        article: articleSlice,
        comment: commentsSlice,
        category: categorySlice,
        threads: threadsSlice,
        dashboard: dashboardSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store