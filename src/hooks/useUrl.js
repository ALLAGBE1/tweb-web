export function useUrl() {
	const FRONT_URL = window.location.origin + "/";
	const BACK_URL = "http://localhost:3000/";

	return {
		FRONT_URL,
		BACK_URL,
	};
}