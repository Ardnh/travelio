import { type RootState } from '@/app/stores';

export const getArticleSummary = (state: RootState) => {
    
    return {
        totalArticle : state.article.articles.length,
        totalComments : state.article.articles.flatMap((item) => item.comments).length
    }
};