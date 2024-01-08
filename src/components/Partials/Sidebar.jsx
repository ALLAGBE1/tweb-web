import { IoMdSettings } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import { NavLink, useLocation } from "react-router-dom";
import { Logout } from "../Auth/Logout";
import logo from "../../assets/logo.jpeg";
import { FaHome } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import { RiArticleLine } from "react-icons/ri";
import { useAccount } from "../../hooks/useAccount";

export function SidebarComponent() {
	const { isAdmin } = useAccount();
	const location = useLocation();
	function styleRender(currentPath) {
		return currentPath == location.pathname
			? "flex items-center space-x-2 text-sm text-white font-bold bg-[#343643] w-full px-2 py-2 rounded-md"
			: "flex items-center space-x-2 text-sm";
	}
	return (
		<>
			<div className="lg:flex hidden flex-col  border-r-2 justify-between   bg-[#427aa1]">
				<div className="flex flex-col items-start px-4 py-4 space-y-6 text-white w-60">
					<div className="flex items-center justify-between w-full mt-10 space-x-2">
						<div className="flex items-center justify-center w-full">
							<img src={logo} className="h-20 mx-auto"></img>
						</div>
					</div>
					<NavLink to="/dashboard" className={styleRender("/")}>
						<FaHome />
						<span>Dashboard</span>
					</NavLink>
					{isAdmin && (
						<NavLink to="/users" className={styleRender("/users")}>
							<HiMiniUsers />
							<span>Utilisateurs</span>
						</NavLink>
					)}
					{isAdmin && (
						<NavLink to="/cryptos" className={styleRender("/cryptos")}>
							<SiGoogletagmanager />
							<span>Gestion des cryptos</span>
						</NavLink>
					)}
					{isAdmin && (
						<NavLink
							to="/articles-category"
							className={styleRender("/articles-category")}
						>
							<RiArticleLine />
							<span>Catégorie des articles</span>
						</NavLink>
					)}
					<NavLink to="/articles" className={styleRender("/articles")}>
						<RiArticleLine />
						<span>Articles</span>
					</NavLink>
						<NavLink to="/settings" className={styleRender("/settings")}>
							<IoMdSettings />
							<span>Paramètres</span>
						</NavLink>
				</div>
				<Logout />
			</div>
		</>
	);
}
