import { create } from 'zustand'

export const useArticleStore = create((set) => ({
    articles: [],
    setArticle: (val) => set((state) => ({ articles: val })),
}));