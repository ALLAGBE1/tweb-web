import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

export function Logout() {
    const { logout } = useAuth();
    const disconnect = (e) => {
        e.preventDefault();
        logout()
    }
    return (
        <>
            <NavLink onClick={disconnect} className="flex items-center mx-auto my-8 space-x-2 text-white">
                <TbLogout2 />
                <span>Déconnexion</span>
            </NavLink>
        </>
    )
}