import { Toaster } from "react-hot-toast";
import { Header } from "../Partials/Header";
import { Avatar, Button, Modal, Table } from "flowbite-react";
import { useEffect } from "react";
import { useCrypto } from "../../hooks/useCrypto";
import toast from "react-hot-toast";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import { useState } from "react";
import Validator from "../../functions/Validator";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export function CryptoCategory() {
	const { getCrypto, cryptos } = useCrypto();

	const { axiosBaseURL } = useAxiosUrl(true);

	const [openModal, setOpenModal] = useState(false);

	const [errors, setErrors] = useState({});

	const [formData, setFormData] = useState({
		symbol: "",
		logo: "",
		description: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	useEffect(() => {
		getCrypto();
	}, []);

	const save = (e) => {
		e.preventDefault();

		const validator = new Validator();

		validator.required(formData.symbol, "symbol");
		validator.file(formData.logo, "logo");
		validator.file(formData.description, "description");

		if (validator.hasErrors()) {
			setErrors(validator.getErrors());
		} else {
			toast.promise(
				axiosBaseURL.post("/cryptos", formData),
				{
					loading: "Ajout d'une nouvelle crypto",
					success: () => {
						getCrypto();
						setOpenModal(false);
						setFormData({
							symbol: "",
							logo: "",
							description: "",
						});
						return "Nouvelle crypto ajoutée avec succès";
					},
					error: (err) => {
						const errors = err.response?.data?.errors;
						const errorMessages = errors
							? Object.values(errors)
							: ["Une erreur s'est produite lors de l'ajout."];
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
		}
	};

	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			<Header title="Gestion des cryptos sur la plateforme" />
			<div className="px-4">
				<div className="flex flex-row items-center justify-end">
					<Button
						onClick={() => {
							setOpenModal(true);
						}}
						className="my-4"
					>
						Ajouter
					</Button>
				</div>
				<div className="overflow-x-auto">
					<Table>
						<Table.Head className="divide-y">
							<Table.HeadCell className="bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold">
								Symbole
							</Table.HeadCell>
							<Table.HeadCell className="bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold">
								Image de la crypto
							</Table.HeadCell>
							<Table.HeadCell className="bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold">
								Statut
							</Table.HeadCell>
							<Table.HeadCell className="bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold">
								Ajouté le
							</Table.HeadCell>
							<Table.HeadCell className="bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold">
								Action
							</Table.HeadCell>
						</Table.Head>
						{cryptos.length > 0 && (
							<Table.Body className="divide-y border-[#8D8D8D]">
								{cryptos.map((crypto) => {
									return <TableRow key={crypto._id} crypto={crypto} />;
								})}
							</Table.Body>
						)}
					</Table>
					{cryptos.length <= 0 && (
						<h1 className="my-4 text-center">
							Pas de crytos autorisés sur la plateforme
						</h1>
					)}
				</div>
			</div>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>
					<span className="font-bold">Autoriser une nouvelle cryto</span>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={save} className="space-y-6">
						<div className="flex flex-col space-y-2">
							<label htmlFor="symbol" className="font-bold text-start">
								Symbole
							</label>
							<input
								id="symbol"
								name="symbol"
								value={formData.symbol}
								onChange={handleInputChange}
								type="text"
								className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{errors.symbol && (
								<div className="text-red-500 text-start">{errors.symbol}</div>
							)}
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="logo" className="font-bold text-start">
								Lien du logo
							</label>
							<input
								id="logo"
								name="logo"
								value={formData.logo}
								onChange={handleInputChange}
								type="text"
								className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{errors.logo && (
								<div className="text-red-500 text-start">{errors.logo}</div>
							)}
						</div>
						<div className="flex flex-col space-y-2">
							<label htmlFor="description" className="font-bold text-start">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								type="text"
								className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{errors.description && (
								<div className="text-red-500 text-start">
									{errors.description}
								</div>
							)}
						</div>
						<div className="flex flex-row items-center justify-end">
							<Button type="submit">Soumettre</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}

function TableRow({ crypto }) {
	const { axiosBaseURL } = useAxiosUrl(true);

	const { getCrypto } = useCrypto();

	const [confirmationModal, setConfirmationModal] = useState(false);

	const [cryptoToDelete, setCryptoToDelete] = useState("");

	const update = (status, id) => {
		toast.promise(
			axiosBaseURL.put("/cryptos/" + id, {
				status: status,
			}),
			{
				loading: "Modification du statut",
				success: () => {
					getCrypto();
					return "Statut mis à jour avec succès";
				},
				error: (err) => {
					const errors = err.response?.data?.errors;
					const errorMessages = errors
						? Object.values(errors)
						: ["Une erreur s'est produite lors de la mise à jour."];
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

	const confirmDelete = (e) => {
		setConfirmationModal(true);
		setCryptoToDelete(e);
	};

	const deleteCrypto = () => {
		toast.promise(
			axiosBaseURL.delete("/cryptos/" + cryptoToDelete),
			{
				loading: "Suprression en cours",
				success: () => {
					getCrypto();
					return "Crypto supprimé avec succès";
				},
				error: (err) => {
					const errors = err.response?.data?.errors;
					const errorMessages = errors
						? Object.values(errors)
						: ["Une erreur s'est produite lors de la suppression."];
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

	return (
		<>
			<Table.Row className="dark:border-gray-700 dark:bg-gray-800">
				<Table.Cell className="text-black">
					{crypto.symbol.toUpperCase()}
				</Table.Cell>
				<Table.Cell className="text-black">
					<Avatar img={crypto.image} rounded bordered />
				</Table.Cell>
				{crypto.status ? (
					<Table.Cell className="text-black">Actif</Table.Cell>
				) : (
					<Table.Cell className="text-black">Non actif</Table.Cell>
				)}
				<Table.Cell className="text-black">
					{formaDate(crypto.created_at)}
				</Table.Cell>
				<Table.Cell className="text-black">
					<div className="flex flex-row items-center space-x-2">
						{crypto.status ? (
							<Button
								onClick={() => {
									update(false, crypto._id);
								}}
							>
								Désactiver
							</Button>
						) : (
							<Button
								onClick={() => {
									update(true, crypto._id);
								}}
							>
								Activer
							</Button>
						)}
						<Button
							color="red"
							onClick={() => {
								confirmDelete(crypto._id);
							}}
						>
							Supprimer
						</Button>
					</div>
				</Table.Cell>
			</Table.Row>
			<Modal
				show={confirmationModal}
				size="md"
				onClose={() => setConfirmationModal(false)}
				popup
			>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Êtes vous sûr de vouloir Supprimer cette crypto ?
						</h3>
						<div className="flex justify-center gap-4">
							<Button color="failure" onClick={deleteCrypto}>
								{"Oui, je suis sûr"}
							</Button>
							<Button color="gray" onClick={() => setConfirmationModal(false)}>
								Non
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

function formaDate(date) {
	const dateObject = new Date(date);

	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	const formattedDate = dateObject.toLocaleDateString("en-US", options);

	return formattedDate;
}
