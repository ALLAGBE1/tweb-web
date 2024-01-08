import { useState } from "react";
import banner from "../../assets/banner.jpeg";
import { IoEyeSharp } from "react-icons/io5";
import { Button } from "flowbite-react";
import OTPInput from "react-otp-input";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import Validator from "../../functions/Validator";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function ChangePassword() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		passwordConfirmation: "",
	});

	const [errors, setErrors] = useState({});

	const { axiosBaseURL } = useAxiosUrl();

	const [canConfirmOtp, setCanConfirmOtp] = useState(false);
	const [canChangePassword, setCanChangePassword] = useState(false);
	const [canVerifyEMail, setCanVerifyEMail] = useState(true);

	const [otp, setOtp] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const type1 = showPassword ? "text" : "password";

	const [showConfirmationPassword, setShowConfirmationPassword] =
		useState(false);
	const type2 = showConfirmationPassword ? "text" : "password";

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const verifyEmail = (e) => {
		e.preventDefault();
		const validator = new Validator();
		validator.required(formData.email, "email");
		validator.email(formData.email, "email");
		if (!validator.hasErrors()) {
			toast.promise(
				axiosBaseURL.post("/users/verify-email", { email: formData.email }),
				{
					loading: "Envoi du code de vérification ... ",
					success: () => {
						setCanVerifyEMail(false);
						setCanConfirmOtp(true);
						return "Code de vérification envoyé par mail";
					},
					error: (err) => {
						const errors = err.response?.data?.errors;
						const errorMessages = errors
							? Object.values(errors)
							: ["Une erreur s'est produite lors de l'envoi du mail"];
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
		} else {
			setErrors(validator.getErrors());
		}
	};

	const otpConfirmation = (e) => {
		e.preventDefault();
		const validator = new Validator();
		validator.required(otp, "email");

		if (!validator.hasErrors()) {
			toast.promise(
				axiosBaseURL.post("/users/validate-otp", {
					email: formData.email,
					otp: otp,
				}),
				{
					loading: "Vérification du code OTP ... ",
					success: () => {
						setCanVerifyEMail(false);
						setCanConfirmOtp(false);
						setCanChangePassword(true);
						return "Vérification OTP réussie";
					},
					error: (err) => {
						const errors = err.response?.data?.errors;
						const errorMessages = errors
							? Object.values(errors)
							: ["Une erreur s'est produite lors de la vérification"];
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
		} else {
			setErrors(validator.getErrors());
		}
	};

	const proccedChangePassword = (e) => {
        
		e.preventDefault();

		const validator = new Validator();
		validator.required(formData.password, "password");
		validator.same(
			formData.passwordConfirmation,
			formData.password,
			"passwordConfirmation"
		);

		if (validator.hasErrors()) {
			console.log(validator.getErrors());

			setErrors(validator.getErrors());
		} else {
			toast.promise(
				axiosBaseURL.post("/users/change-password", {
					email: formData.email,
					password: formData.password,
				}),
				{
					loading: "Changement du mot de passe ... ",
					success: () => {
						navigate("/login");
						return "Mot de passe changé avec succès";
					},
					error: (err) => {
						const errors = err.response?.data?.errors;
						const errorMessages = errors
							? Object.values(errors)
							: [
									"Une erreur s'est produite lors du changement du mot de passe",
							  ];
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
			<div
				className="flex flex-row items-center justify-center w-full h-screen px-2 bg-center bg-cover shadow-md lg:space-x-2 lg:shadow-white"
				style={{ backgroundImage: `url(${banner})` }}
			>
				<div className="flex flex-col w-full px-6 py-12 space-y-4 text-center shadow-xl lg:w-4/12 bg-[#427aa1] rounded-xl text-white md:w-8/12">
					<h5 className="text-2xl font-bold">Changement du mot de passe</h5>
					{canVerifyEMail && !canConfirmOtp && !canChangePassword && (
						<form onSubmit={verifyEmail} className="flex flex-col space-y-4">
							<div className="flex flex-col space-y-2">
								<label htmlFor="email" className="font-bold text-start">
									Email
								</label>
								<input
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.email && (
									<div className="text-red-500 text-start">{errors.email}</div>
								)}
							</div>
							<div className="w-full">
								<Button
									className="w-full font-bold"
									color="light"
									type="submit"
								>
									Continuer
								</Button>
							</div>
						</form>
					)}
					{!canVerifyEMail && canConfirmOtp && !canChangePassword && (
						<form
							onSubmit={otpConfirmation}
							className="flex flex-col justify-center w-full space-y-4"
						>
							<OTPInput
								value={otp}
								onChange={setOtp}
								numInputs={4}
								renderSeparator={<span>-</span>}
								renderInput={(props, index) => (
									<input
										{...props}
										style={{
											width: "40px",
											height: "40px",
											fontSize: "16px",
											textAlign: "center",
											margin: "5px",
											border: "1px solid #ccc",
											borderRadius: "5px",
											color: "black",
											marginLeft: "auto",
											marginRight: "auto",
										}}
									/>
								)}
							/>
							{errors.otp && (
								<div className="text-red-500 text-start">{errors.otp}</div>
							)}
							<div className="w-full">
								<Button
									className="w-full font-bold"
									color="light"
									type="submit"
								>
									Continuer
								</Button>
							</div>
						</form>
					)}
					{!canVerifyEMail && !canConfirmOtp && canChangePassword && (
						<form
							onSubmit={proccedChangePassword}
							className="flex flex-col space-y-4"
						>
							<div className="relative flex flex-col space-y-2">
								<div className="flex flex-row items-center justify-between">
									<label htmlFor="password" className="font-bold text-start">
										Nouveau mot de passe
									</label>
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
									type={type1}
									className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.password && (
									<div className="text-red-500 text-start">
										{errors.password}
									</div>
								)}
							</div>
							<div className="relative flex flex-col space-y-2">
								<div className="flex flex-row items-center justify-between">
									<label htmlFor="password" className="font-bold text-start">
										Confirmer le nouveau mot de passe
									</label>
								</div>
								{!showConfirmationPassword && (
									<IoEyeSharp
										className="absolute cursor-pointer top-9 right-4"
										onClick={() => {
											setShowConfirmationPassword(true);
										}}
									/>
								)}
								{showConfirmationPassword && (
									<FaEyeSlash
										className="absolute cursor-pointer top-9 right-4"
										onClick={() => {
											setShowConfirmationPassword(false);
										}}
									/>
								)}
								<input
									id="passwordConfirmation"
									name="passwordConfirmation"
									value={formData.passwordConfirmation}
									onChange={handleInputChange}
									type={type2}
									className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								/>
								{errors.passwordConfirmation && (
									<div className="text-red-500 text-start">
										{errors.passwordConfirmation}
									</div>
								)}
							</div>
							<div className="w-full">
								<Button
									className="w-full font-bold"
									color="light"
									type="submit"
								>
									Modifier le mot de passe
								</Button>
							</div>
						</form>
					)}
					<div className="flex justify-end">
						<NavLink to="/login">Connectez-vous</NavLink>
					</div>
				</div>
			</div>
		</>
	);
}
