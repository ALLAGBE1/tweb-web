import { useCallback } from "react";
import { useUserStore } from "../store/userStore";
import { useAxiosUrl } from "./useAxiosUrl"

export function useUser() {

    const { axiosBaseURL } = useAxiosUrl(true);

    const { users, setUser } = useUserStore();

    const userList = useCallback(() => {
        axiosBaseURL.get('/users')
            .then((res) => {
                setUser(res.data.data)
            })
            .catch((err) => {
                setUser([])
            })
    }, []);

    return {
        users,
        userList
    }
} 