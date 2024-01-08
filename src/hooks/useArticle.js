import { useCallback } from "react";
import { useAxiosUrl } from "./useAxiosUrl";
import { useArticleStore } from "../store/articleStore";

export function useArticle() {
	const { axiosBaseURL } = useAxiosUrl(true);

	const { articles, setArticle } = useArticleStore();

	const articleList = useCallback(() => {
		axiosBaseURL
			.get("/articles")
			.then((res) => {
				setArticle(res.data.data);
			})
			.catch((err) => {
				setArticle([]);
			});
	}, []);

	const getCategoryLabel = (e) => articles.filter((a) => a._id === e)[0]?.label;

	const isActive = (e) => articles.filter((a) => a._id === e)[0]?.status;

	return {
		articles,
		articleList,
		getCategoryLabel,
        isActive
	};
}
