import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { SidebarComponent } from "./components/Partials/Sidebar";
import { UsersList } from "./components/Users/List";
import { Settings } from "./components/Users/Settings";
import { AuthStatus, useAuth } from "./hooks/useAuth";
import { Spinner } from "flowbite-react";
import { Login } from "./components/Auth/Login";
import { useEffect } from "react";
import { Register } from "./components/Auth/Register";
import { Category } from "./components/Articles/Category";
import { ArticleList } from "./components/Articles/List";
import { Détails } from "./components/Articles/Détails";
import { Dashboard } from "./components/Dashboard/Index";
import { CryptoCategory } from "./components/Cryptos/Category";
import { ChangePassword } from "./components/Auth/ChangePassword";
import { GetGoogleUser } from "./components/Auth/GetGoogleUser";
import { Home } from "./components/Dashboard/Home";
import { useUrl } from "./hooks/useUrl";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "users",
				element: <UsersList />,
			},
			{
				path: "settings",
				element: <Settings />,
			},
			{
				path: "articles-category",
				element: <Category />,
			},
			{
				path: "articles",
				element: <ArticleList />,
			},
			{
				path: "cryptos",
				element: <CryptoCategory />,
			},
			{
				path: "articles/:id",
				element: <Détails />,
			},
		],
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/change-password",
		element: <ChangePassword />,
	},
	{
		path: "/google-auth",
		element: <GetGoogleUser />,
	},
]);

function Layout() {
	return (
		<>
			<div className="flex min-h-screen md:space-x-2">
				<SidebarComponent />
				<div className="flex flex-col w-full h-full space-y-4">
					<Outlet />
				</div>
			</div>
		</>
	);
}

function App() {
	const { status, authenticate } = useAuth();
	const { FRONT_URL } = useUrl();

	useEffect(() => {
		authenticate();
	}, []);

	if (status === AuthStatus.Unknown) {
		return (
			<div className="text-center">
				<Spinner aria-label="Center-aligned spinner example" />
			</div>
		);
	}
	if (
		status === AuthStatus.Guest &&
		![
			"/register",
			"/login",
			"/change-password",
			"/google-auth",
			"/home",
		].includes(window.location.pathname)
	) {
		return (window.location.href = FRONT_URL + "login");
	}
	return <RouterProvider router={router} />;
}

export default App;
