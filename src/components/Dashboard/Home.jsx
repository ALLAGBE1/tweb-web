import Slider from "react-slick";
import banner from "../../assets/SL-0212121-40670-60.jpg";
import { useEffect } from "react";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import { useState } from "react";
import { Table } from "flowbite-react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link } from "react-router-dom";
export function Home() {
	const { axiosBaseURL } = useAxiosUrl();
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

	const [crypto, setCrypto] = useState([]);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axiosBaseURL.get("/cryptos/api/home").then((res) => {
			setCrypto(res.data);
		});

		axiosBaseURL.get("/articles/feed").then((res) => {
			setArticles(res.data);
		});
	}, []);
	return (
		<>
			<div
				className="min-h-[75vh] bg-center bg-cover object-contain flex items-center"
				style={{ backgroundImage: `url(${banner})` }}
			>
				<div className="max-w-4xl py-24">
					<div className="w-full mx-auto text-left md:text-center">
						<h1 className="max-w-4xl mb-6 text-5xl font-extrabold leading-none tracking-normal text-white sm:text-6xl md:text-6xl lg:text-5xl md:tracking-tight">
							Explorez le monde passionnant des cryptomonnaies avec
							<span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
								&nbsp; CryptoPrice Insight
							</span>
						</h1>
						<p className="px-0 mb-6 text-lg text-center text-white md:text-xl">
							Suivez les tendances, découvrez les opportunités et prenez des
							décisions éclairées. Votre guide ultime dans l'univers en
							constante évolution des crypto-actifs.
						</p>
					</div>
					<div>
						<Link
							className="flex items-center justify-center py-4 bg-[#427aa1] w-fit mx-auto rounded-lg px-4 text-white font-bold"
							to="/login"
						>
							Connectez-vous maintenant
						</Link>
					</div>
				</div>
			</div>
			<div className="py-8">
				<h1 className="text-4xl font-bold text-center text-black">
					Découvrez les cryptomonnaies disponibles sur notre plateforme
				</h1>
				<div className="w-full px-8 py-8">
					<Table>
						<Table.Head>
							<Table.HeadCell>Nom</Table.HeadCell>
							<Table.HeadCell>Symbole</Table.HeadCell>
							<Table.HeadCell>Prix</Table.HeadCell>
							<Table.HeadCell>Volume sur 24 heures</Table.HeadCell>
							<Table.HeadCell>Variation du volume sur 24 heures</Table.HeadCell>
							<Table.HeadCell>
								Variation en pourcentage sur 1 heure
							</Table.HeadCell>
							<Table.HeadCell>
								Variation en pourcentage sur 24 heures
							</Table.HeadCell>
						</Table.Head>
						<Table.Body className="divide-y">
							{crypto.map((c) => {
								return (
									<Table.Row
										key={c.id}
										className="bg-white dark:border-gray-700 dark:bg-gray-800"
									>
										<Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{c.name}
										</Table.Cell>
										<Table.Cell>{c.symbol}</Table.Cell>
										<Table.Cell>${c["quote"]["USD"].price}</Table.Cell>
										<Table.Cell className="flex flex-row items-center">
											{c["quote"]["USD"].volume_24h > 0 ? (
												<IoMdArrowDropup color="green" size={30} />
											) : (
												<IoMdArrowDropdown color="red" size={30} />
											)}
											{c["quote"]["USD"].volume_24h}
										</Table.Cell>
										<Table.Cell>
											{c["quote"]["USD"].volume_change_24h > 0 ? (
												<IoMdArrowDropup color="green" size={30} />
											) : (
												<IoMdArrowDropdown color="red" size={30} />
											)}
											{c["quote"]["USD"].volume_change_24h}
										</Table.Cell>
										<Table.Cell>
											{c["quote"]["USD"].percent_change_1h > 0 ? (
												<IoMdArrowDropup color="green" size={30} />
											) : (
												<IoMdArrowDropdown color="red" size={30} />
											)}
											{c["quote"]["USD"].percent_change_1h}
										</Table.Cell>
										<Table.Cell>
											{c["quote"]["USD"].percent_change_24h > 0 ? (
												<IoMdArrowDropup color="green" size={30} />
											) : (
												<IoMdArrowDropdown color="red" size={30} />
											)}
											{c["quote"]["USD"].percent_change_24h}
										</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				</div>
			</div>
			<h1 className="text-4xl font-bold text-center text-black">
				Découvrez les actualités du jour
			</h1>
			<div className="py-16">
				<Slider {...settings} className="flex flex-col max-w-[83vw] mx-auto ">
					{articles.map((article) => (
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
		</>
	);
}
