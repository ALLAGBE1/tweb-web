import axios from "axios";
import { useTokenStore } from "../store/tokenStore";
import { useUrl } from "./useUrl";

export function useAxiosUrl(withToken) {
	const { BACK_URL } = useUrl();
	const { token } = useTokenStore();
	const axiosBaseURL = axios.create({
		baseURL: BACK_URL,
		headers: withToken
			? {
					Authorization: `Bearer ${token}`,
			  }
			: {},
	});

	return {
		axiosBaseURL,
	};
}
