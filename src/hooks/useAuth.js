import { useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import { useAxiosUrl } from "./useAxiosUrl";
import { useTokenStore } from "../store/tokenStore";
import axios from "axios";
import { useUrl } from "./useUrl";

export const AuthStatus = {
	Unknown: 0,
	Authenticated: 1,
	Guest: 2,
};

export function useAuth() {
	const { axiosBaseURL } = useAxiosUrl(true);

	const { token, setToken } = useTokenStore();

	const { account, setAccount } = useAuthStore();

	let status;

	switch (token) {
		case null:
			status = AuthStatus.Guest;
			break;
		case undefined:
			status = AuthStatus.Unknown;
			break;
		default:
			status = AuthStatus.Authenticated;
			break;
	}

	const authenticate = useCallback(() => {
		if (token) {
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
		} else {
			setAccount(null);
		}
	}, []);

	const login = useCallback((email, password) => {
		const { FRONT_URL, BACK_URL } = useUrl();
		axios
			.post(BACK_URL + "auth/login", {
				email: email,
				password: password,
			})
			.then((response) => {
				const newToken = response.data.token;
				setToken(newToken);
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
				window.location.href =
					FRONT_URL + "google-auth?token=" + response.data.token;
			});
	}, []);

	const logout = useCallback(() => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("account");
		window.location.reload();
	}, []);

	return {
		token,
		status,
		authenticate,
		login,
		logout,
	};
}
