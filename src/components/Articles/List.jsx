import { useEffect } from "react";
import { Header } from "../Partials/Header";
import { useAccount } from "../../hooks/useAccount";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import { useState } from "react";
import Slider from "react-slick";
import { useArticle } from "../../hooks/useArticle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";

export function ArticleList() {
	const { account } = useAccount();
	const { axiosBaseURL } = useAxiosUrl(true);
	const [articlesList, setArticlesList] = useState([]);
	const { articleList, getCategoryLabel, isActive } = useArticle();
	const [loading, setLoading] = useState(false);
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 2000,
		cssEase: "linear",
	};

	useEffect(() => {
		articleList();
		setLoading(true);
		if (account.key_word.length > 0) {
			const fetchPromises = account.key_word.map(async (keyword) => {
				try {
					const res = await axiosBaseURL.get("/articles/feed/" + keyword);
					return { [keyword]: res.data };
				} catch (error) {
					console.error(
						`Une erreur s'est produite pour le mot-clé ${keyword}:`,
						error
					);
					setLoading(false);
					return null;
				}
			});

			Promise.all(fetchPromises)
				.then((results) => {
					const validResults = results.filter((result) => result !== null);

					setArticlesList((prevArticles) => {
						const newArticles = validResults.reduce(
							(acc, result) => ({ ...acc, ...result }),
							{}
						);
						return { ...prevArticles, ...newArticles };
					});
					setLoading(false);
				})
				.catch((error) => {
					console.error(
						"Une erreur s'est produite lors de la récupération des articles:",
						error
					);
					setLoading(false);
				});
		}
	}, []);

	return (
		<>
			<Header title="Liste des articles du jour" />
			{!loading && Object.keys(articlesList).length > 0 && (
				<div>
					{Object.keys(articlesList).map(
						(keyword) =>
							isActive(keyword) && (
								<div key={keyword} className="flex flex-col space-y-4">
									<div className="flex flex-row items-center justify-between w-full">
										<h1 className="my-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
											{getCategoryLabel(keyword)}
										</h1>
										<NavLink
											to={"/articles/" + keyword}
											className="flex p-3 m-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											<span>Voir plus</span>
										</NavLink>
									</div>
									<div className="px-4">
										<Slider
											{...settings}
											className="flex flex-col max-w-[83vw] "
										>
											{articlesList[keyword].map((article) => (
												<div
													key={article.title}
													className="relative max-w-[22rem] p-6 bg-white border border-gray-200 rounded-lg shadow h-[22rem]"
												>
													<a href="#" className="text-blue-700 hover:underline">
														<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
															{article.title}
														</h5>
													</a>
													<p className="mb-3 text-justify text-gray-700 dark:text-gray-400 max-h-[22rem] line-clamp-5">
														{article.contentSnippet}
													</p>
													<a
														href={article.link}
														target="__blank"
														rel="noopener noreferrer"
														className="absolute bottom-0 right-0 inline-flex items-center px-3 py-2 m-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
													>
														Lire plus
														<svg
															className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 14 10"
														>
															<path
																stroke="currentColor"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M1 5h12m0 0L9 1m4 4L9 9"
															/>
														</svg>
													</a>
												</div>
											))}
										</Slider>
									</div>
								</div>
							)
					)}
				</div>
			)}
			{loading && (
				<div
					role="status"
					className="flex items-center justify-center col-span-full"
				>
					<svg
						aria-hidden="true"
						className="w-8 h-8 text-blue-700 fill-current animate-spin"
						viewBox="0 0 100 101"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="ml-2">Chargement...</span>
				</div>
			)}
		</>
	);
}
