import { useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { Avatar } from "flowbite-react";
import logo from "../../assets/logo.jpeg";
import { useAccount } from "../../hooks/useAccount";
import { FaHome } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import { RiArticleLine } from "react-icons/ri";
import { Logout } from "../Auth/Logout";

export function Header({ title }) {
	const { account } = useAccount();
	const { isAdmin } = useAccount();

	const [showMenu, setShowMenu] = useState(false);

	const closeMenu = () => {
		setShowMenu(false);
	};

	const openMenu = () => {
		setShowMenu(true);
	};

	const location = useLocation();

	function styleRender(currentPath) {
		return currentPath == location.pathname
			? "flex items-center space-x-2 text-sm text-black font-bold w-full px-2 py-2 rounded-md"
			: "flex items-center space-x-2 text-sm";
	}

	return (
		<>
			<div className="flex items-center justify-between w-full px-4 text-black min-h-[5rem] shadow-md">
				<div className="flex items-center mx-4 cursoblackr-pointer text- lg:hidden">
					<CiMenuFries
						className="text-xl font-bold text-black"
						onClick={openMenu}
					/>
				</div>
				<div className="flex flex-row items-center justify-between w-full">
					<h4 className="font-bold text-md">{title}</h4>
					<div className="flex flex-row items-center space-x-2">
						<h4 className="font-bold">{account.username}</h4>
						{account.avatar && <Avatar img={account.avatar} rounded bordered />}
						{!account.avatar && (
							<Avatar
								img={
									`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=` +
									account.name
								}
								rounded
								bordered
							/>
						)}
					</div>
				</div>
				{showMenu && (
					<div className="fixed top-0 left-0 z-10 w-full h-full px-4 py-4 overflow-hidden bg-[#427aa1]">
						<div className="flex items-center justify-end w-full cursor-pointer">
							<ImCross className="text-xl" onClick={closeMenu} />
						</div>
						<div className="flex flex-col items-start px-4 py-4 space-y-6 text-white w-60">
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
				)}
			</div>
		</>
	);
}
