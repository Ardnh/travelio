import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/store/authSlice';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import articleSlice from '@/features/dashboard/store/articles/articlesSlice';
import commentsSlice from '@/features/dashboard/store/comments/commentSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        article: articleSlice,
        comment: commentsSlice
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store