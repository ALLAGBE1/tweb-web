import { useAuthStore } from "../store/authStore";
import { useTokenStore } from "../store/tokenStore";

export function useAccount() {
	const { account } = useAuthStore();
	const { setToken } = useTokenStore();

	const isAdmin = account?.admin;

	if (!account) {
		setToken(null);
		throw new Error("User is not authenticated");
	} else {
		return {
			account,
			isAdmin,
		};
	}
}
