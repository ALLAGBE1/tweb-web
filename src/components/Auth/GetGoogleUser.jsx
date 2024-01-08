import { useEffect } from "react";
import { useTokenStore } from "../../store/tokenStore";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

import { Button, Spinner } from "flowbite-react";
import banner from "../../assets/banner.jpeg";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";

export function GetGoogleUser() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const token = queryParams.get("token");
	const { setToken } = useTokenStore();
	const { setAccount } = useAuthStore();
	const { axiosBaseURL } = useAxiosUrl();
	useEffect(() => {
		setToken(token);
        console.log(token);
		try {
			setTimeout(() => {
				axiosBaseURL
					.get("/auth/me", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((response) => {
						setAccount(response.data.data);
					})
					.catch((error) => {
						console.error("Erreur lors de la requête /auth/me :", error);
						setAccount(null);
					});
				navigate("/");
			}, 5000);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<div className="relative">
				<div className="absolute flex items-center justify-center top-0 left-0 z-10 w-full h-full bg-[#427aa1] opacity-60">
					<Spinner aria-label="Extra large spinner example" size="xl" />
				</div>
				<div
					className="flex flex-row items-center justify-center w-full h-screen px-2 bg-center bg-cover shadow-md lg:space-x-2 lg:shadow-white"
					style={{ backgroundImage: `url(${banner})` }}
				>
					<div className="flex flex-col w-full px-6 py-12 space-y-4 text-center shadow-xl lg:w-4/12 bg-[#427aa1] rounded-xl text-white md:w-8/12">
						<h5 className="text-2xl font-bold">Connexion</h5>
						<button
							target="_blank"
							className="flex flex-row items-center p-3 mx-auto space-x-4 font-bold text-black bg-white rounded-lg w-fit"
						>
							<FcGoogle size={30} />
							<span>Connecter vous avec google</span>
						</button>
						<div className="flex flex-col space-y-2">
							<label htmlFor="email" className="font-bold text-start">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>
						<div className="relative flex flex-col space-y-2">
							<div className="flex flex-row items-center justify-between">
								<label htmlFor="password" className="font-bold text-start">
									Mot de passe
								</label>
								<div className="flex flex-row items-center justify-center">
									<a href="/change-password">Mot de passe oublié</a>
								</div>
							</div>
							<input
								id="password"
								name="password"
								type="password"
								className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>
						<div className="w-full">
							<Button className="w-full font-bold" color="light">
								Connexion
							</Button>
						</div>
						<div>
							Vous n'avez pas de compte, <a href="/register">créez-en un</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
