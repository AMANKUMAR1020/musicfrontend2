import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AuthLayout = () => {
	const { user } = useSelector((state) => state.user);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		if (user) {
			console.log("login done ",`${user.username}`)
			navigate("/dash");
		}
	}, [user]);
	
	return (
		<main>
            <Outlet />
		</main>
	);
};

export default AuthLayout;
