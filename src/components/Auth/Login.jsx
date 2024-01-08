import { Button } from "flowbite-react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Validator from "../../functions/Validator";
import banner from "../../assets/banner.jpeg";
import { FcGoogle } from "react-icons/fc";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";

export function Login() {
	const { login } = useAuth();

	const { axiosBaseURL } = useAxiosUrl();

	const validator = new Validator();

	const [errors, setErrors] = useState({});

	const [showPassword, setShowPassword] = useState(false);
	const type = showPassword ? "text" : "password";

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleLogin = () => {
		validator.email(formData.email, "email");

		validator.required(formData.password, "password");

		setErrors(validator.getErrors());

		if (!validator.hasErrors()) {
			login(formData.email, formData.password);
		}
	};

	const signWithGoogle = () => {
		try {
			axiosBaseURL
				.post("/auth/google")
				.then((res) => (window.location.href = res?.data?.url));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div
				className="flex flex-row items-center justify-center w-full h-screen px-2 bg-center bg-cover shadow-md lg:space-x-2 lg:shadow-white"
				style={{ backgroundImage: `url(${banner})` }}
			>
				<div className="flex flex-col w-full px-6 py-12 space-y-4 text-center shadow-xl lg:w-4/12 bg-[#427aa1] rounded-xl text-white md:w-8/12">
					<h5 className="text-2xl font-bold">Connexion</h5>
					<button
						onClick={signWithGoogle}
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
							value={formData.email}
							onChange={handleInputChange}
							type="email"
							className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						/>
						{errors.email && (
							<div className="text-red-500 text-start">{errors.email}</div>
						)}
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
						{!showPassword && (
							<IoEyeSharp
								className="absolute cursor-pointer top-9 right-4"
								onClick={() => {
									setShowPassword(true);
								}}
							/>
						)}
						{showPassword && (
							<FaEyeSlash
								className="absolute cursor-pointer top-9 right-4"
								onClick={() => {
									setShowPassword(false);
								}}
							/>
						)}
						<input
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							type={type}
							className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						/>
						{errors.password && (
							<div className="text-red-500 text-start">{errors.password}</div>
						)}
					</div>
					<div className="w-full">
						<Button
							className="w-full font-bold"
							color="light"
							onClick={handleLogin}
						>
							Connexion
						</Button>
					</div>
					<div>
						Vous n'avez pas de compte, <a href="/register">créez-en un</a>
					</div>
				</div>
			</div>
		</>
	);
}
