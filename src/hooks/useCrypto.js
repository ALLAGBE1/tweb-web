import { useCallback } from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { useAxiosUrl } from "./useAxiosUrl";
import { useState } from "react";

export function useCrypto() {
	const { cryptos, setCrypto } = useCryptoStore();

	const { axiosBaseURL } = useAxiosUrl(true);

	const [apiCrypto, setApiCrypto] = useState([]);

	const [loading, setLoading] = useState(false);

	const getCrypto = useCallback(() => {
		setLoading(true);
		axiosBaseURL
			.get("/cryptos")
			.then((res) => {
				setCrypto(res.data.data);
				setLoading(false);
			})
			.catch((err) => {
				setCrypto([]);
				setLoading(false);
			});
	}, []);

	const getCryptoFromApi = useCallback(() => {
		setLoading(true);
		axiosBaseURL
			.get("/cryptos/api")
			.then((res) => {
				setApiCrypto(res.data);
				setLoading(false);
			})
			.catch(() => {
				setApiCrypto([]);
				setLoading(false);
			});
	}, []);

	const isActive = (e) => cryptos.filter((c) => c.symbol === e)[0]?.status;

	const getCryptoDetails = (e) => cryptos.filter((c) => c.symbol === e)[0];

	return {
		cryptos,
		getCrypto,
		isActive,
		getCryptoFromApi,
		apiCrypto,
		loading,
		getCryptoDetails
	};
}
