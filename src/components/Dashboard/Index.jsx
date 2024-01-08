import { Header } from "../Partials/Header";
import { useEffect } from "react";
import { useCrypto } from "../../hooks/useCrypto";
import { Button, Card } from "flowbite-react";
import { useState } from "react";
import { VscSymbolKey } from "react-icons/vsc";
import {
	MdOutlinePriceChange,
	MdOutlineDoNotDisturbOnTotalSilence,
} from "react-icons/md";
import { SiCoinmarketcap, SiReactivex } from "react-icons/si";
import { FaMaximize } from "react-icons/fa6";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import { useAccount } from "../../hooks/useAccount";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

export function Dashboard() {
	const { getCryptoFromApi, apiCrypto, getCrypto, loading, getCryptoDetails } =
		useCrypto();

	const [slideOverOpen, setSlideOverOpen] = useState(false);

	const { account } = useAccount();

	const { authenticate } = useAuth();

	const [isHovered, setIsHovered] = useState(
		Array(apiCrypto.length).fill(false)
	);

	const { axiosBaseURL } = useAxiosUrl(true);

	const [singleCrypto, setSingleCrypto] = useState([]);

	const openSlideShow = (i) => {
		setSingleCrypto(apiCrypto.filter((c) => c.id == i)[0]);
		setSlideOverOpen(true);
	};

	const handleMouseEnter = (index) => {
		setIsHovered((prevStates) => {
			const newState = [...prevStates];
			newState[index] = true;
			return newState;
		});
	};

	const toggleFavorite = (e) => {
		toast.promise(
			axiosBaseURL.put("/users/update-crypos/" + account._id, { crypto: e }),
			{
				loading: "Traitement",
				success: () => {
					authenticate();
					return "Opération réussie";
				},
				error: (err) => {
					const errors = err.response?.data?.errors;
					const errorMessages = errors
						? Object.values(errors)
						: ["Une erreur s'est produite."];
					return (
						<div>
							<ul>
								{errorMessages.map((errorMessage, index) => (
									<div key={index}>
										<li>{errorMessage}</li>
										<hr />
									</div>
								))}
							</ul>
						</div>
					);
				},
			},
			{
				style: {
					minWidth: "250px",
				},
				success: {
					duration: 3000,
					icon: "🔥",
				},
			}
		);
	};

	const handleMouseLeave = (index) => {
		setIsHovered((prevStates) => {
			const newState = [...prevStates];
			newState[index] = false;
			return newState;
		});
	};

	useEffect(() => {
		getCrypto();
		getCryptoFromApi();
	}, []);

	return (
		<>
			<Header title="Dashboard" />
			<Toaster position="top-right" reverseOrder={false} />
			<div className="w-full my-6 space-y-6">
				<div className="w-full space-y-4">
					<h1 className="text-xl font-bold text-black">Mes favoris</h1>
					{!loading && apiCrypto.length > 0 && (
						<div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
							{apiCrypto
								.filter((c) => account.crypto.includes(c.symbol))
								.map((c, index) => {
									return (
										<Card
											onMouseEnter={() => handleMouseEnter(c.symbol)}
											onMouseLeave={() => handleMouseLeave(c.symbol)}
											key={c.id}
											className="relative max-w-sm h-60 rounded-xl overflow-clip"
											imgSrc={getCryptoDetails(c.symbol)?.image}
											horizontal
										>
											<h1 className="my-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
												{c.name}
											</h1>
											<p className="overflow-hidden font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
												{getCryptoDetails(c.symbol)?.description}
											</p>
											{isHovered[c.symbol] && (
												<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-[#427aa1] rounded-xl space-x-4">
													<Button
														onClick={() => {
															openSlideShow(c.id);
														}}
														className="h-fit"
													>
														Voir les détails
													</Button>
													<Button
														onClick={() => {
															toggleFavorite(c.symbol);
														}}
														className="h-fit"
													>
														Retirer des favoris <FaRegStar color="yellow" className="mx-2" />
													</Button>
												</div>
											)}
										</Card>
									);
								})}
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
					{!loading && apiCrypto.length == 0 && (
						<p className="font-bold text-center font-xl">
							Pas de crypto disponibles sur la plateforme
						</p>
					)}
				</div>
				<div className="w-full space-y-4">
					<h1 className="text-xl font-bold text-black">Autres</h1>
					{!loading && apiCrypto.length > 0 && (
						<div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
							{apiCrypto
								.filter((c) => !account.crypto.includes(c.symbol))
								.map((c, index) => {
									return (
										<Card
											onMouseEnter={() => handleMouseEnter(c.symbol)}
											onMouseLeave={() => handleMouseLeave(c.symbol)}
											key={c.id}
											className="relative max-w-sm h-60 rounded-xl overflow-clip"
											imgSrc={getCryptoDetails(c.symbol)?.image}
											horizontal
										>
											<h1 className="my-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
												{c.name}
											</h1>
											<p className="overflow-hidden font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
												{getCryptoDetails(c.symbol)?.description}
											</p>
											{isHovered[c.symbol] && (
												<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-[#427aa1] rounded-xl space-x-4">
													<Button
														onClick={() => {
															openSlideShow(c.id);
														}}
														className="h-fit"
													>
														Voir les détails
													</Button>
													<Button
														onClick={() => {
															toggleFavorite(c.symbol);
														}}
														className="h-fit"
													>
														Ajouter en favoris <FaRegStar className="mx-2" />
													</Button>
												</div>
											)}
										</Card>
									);
								})}
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
					{!loading && apiCrypto.length == 0 && (
						<p className="font-bold text-center font-xl">
							Pas de crypto disponibles sur la plateforme
						</p>
					)}
				</div>
			</div>

			{slideOverOpen && (
				<div className="fixed inset-y-0 right-0 z-10 flex max-w-full pl-10">
					<div className="w-screen max-w-md">
						<div className="flex flex-col h-full py-5 overflow-y-scroll bg-white border-l shadow-lg border-neutral-100/70">
							<div className="px-4 sm:px-5">
								<div className="flex items-start justify-between pb-1">
									<h2
										className="my-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline"
										id="slide-over-title"
									>
										{singleCrypto.name}
									</h2>
									<div className="flex items-center h-auto ml-3">
										<button
											onClick={() => setSlideOverOpen(false)}
											className="absolute top-0 right-0 z-30 flex items-center justify-center px-3 py-2 mt-4 mr-5 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-4 h-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18L18 6M6 6l12 12"
												></path>
											</svg>
											<span>Fermer</span>
										</button>
									</div>
								</div>
							</div>
							<div className="relative flex-1 px-4 mt-5 sm:px-5">
								<div className="absolute inset-0 px-4 sm:px-5">
									<div className="relative h-full overflow-scroll border border-dashed rounded-md border-neutral-300">
										<div className="h-48 shadow-md ">
											<img
												className="object-fill w-full h-full mx-auto"
												src={getCryptoDetails(singleCrypto.symbol)?.image}
											></img>
										</div>
										<div className="flow-root px-2">
											<ul className="divide-y divide-gray-200 dark:divide-gray-700">
												<li className="py-2 sm:py-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															<VscSymbolKey className="font-2xl" />
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Symbole
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto.symbol}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															<MdOutlinePriceChange className="font-2xl" />
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Prix (USD)
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].price}
														</div>
													</div>
												</li>
												<li className="py-2 sm:py-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															<SiCoinmarketcap />
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Nombre de paires de marchés
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto.num_market_pairs}
														</div>
													</div>
												</li>
												<li className="py-2 sm:py-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															<FaMaximize />
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Offre maximale
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto.max_supply}
														</div>
													</div>
												</li>
												<li className="py-2 sm:py-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															<SiReactivex />
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Offre en circulation
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto.circulating_supply}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															<MdOutlineDoNotDisturbOnTotalSilence />
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Offre totale
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto.total_supply}
														</div>
													</div>
												</li>
											</ul>
										</div>
										<h1 className="my-4 text-center">Tendances</h1>

										<div className="flow-root px-2">
											<ul className="divide-y divide-gray-200 dark:divide-gray-700">
												<li className="py-2 sm:py-2">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															<IoMdArrowDropup color="green" size={30} />
															<IoMdArrowDropdown color="red" size={30} />
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Volume sur 24 heures
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].volume_24h}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															{singleCrypto["quote"]["USD"].volume_change_24h >
															0 ? (
																<IoMdArrowDropup color="green" size={30} />
															) : (
																<IoMdArrowDropdown color="red" size={30} />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Variation du volume sur 24 heures
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].volume_change_24h}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															{singleCrypto["quote"]["USD"].percent_change_1h >
															0 ? (
																<IoMdArrowDropup color="green" size={30} />
															) : (
																<IoMdArrowDropdown color="red" size={30} />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Variation en pourcentage sur 1 heure
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].percent_change_1h}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															{singleCrypto["quote"]["USD"].percent_change_24h >
															0 ? (
																<IoMdArrowDropup color="green" size={30} />
															) : (
																<IoMdArrowDropdown color="red" size={30} />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Variation en pourcentage sur 24 heures
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].percent_change_24h}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															{singleCrypto["quote"]["USD"].percent_change_7d >
															0 ? (
																<IoMdArrowDropup color="green" size={30} />
															) : (
																<IoMdArrowDropdown color="red" size={30} />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Variation du volume sur 7 jours
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].percent_change_7d}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															{singleCrypto["quote"]["USD"].percent_change_30d >
															0 ? (
																<IoMdArrowDropup color="green" size={30} />
															) : (
																<IoMdArrowDropdown color="red" size={30} />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Variation du volume sur 30 jours
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].percent_change_30d}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															{singleCrypto["quote"]["USD"].percent_change_60d >
															0 ? (
																<IoMdArrowDropup color="green" size={30} />
															) : (
																<IoMdArrowDropdown color="red" size={30} />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Variation du volume sur 60 jours
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].percent_change_60d}
														</div>
													</div>
												</li>
												<li className="pt-3 pb-0 sm:pt-4">
													<div className="flex items-center space-x-4">
														<div className="shrink-0">
															{singleCrypto["quote"]["USD"].percent_change_90d >
															0 ? (
																<IoMdArrowDropup color="green" size={30} />
															) : (
																<IoMdArrowDropdown color="red" size={30} />
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
																Variation du volume sur 90 jours
															</p>
														</div>
														<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
															{singleCrypto["quote"]["USD"].percent_change_90d}
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
