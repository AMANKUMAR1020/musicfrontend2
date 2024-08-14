import { useNavigate,Outlet } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { resetPlayer } from "../redux/slices/playerSlice";
import "./style/HomePage.css"
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";
import useTitle from "./useTitle";

const HomePage = () => {

	useTitle('Muyi app')

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const Login = () => {
		console.log('Login navigate');
		dispatch(resetPlayer());
		navigate('/auth/login');
	}

	const Logout = () => {
		console.log('Logout done');
		dispatch(resetPlayer()); 
		dispatch(logoutUser());

		navigate('/');
	}

	const Register = () =>{
		console.log('Register done');
		dispatch(resetPlayer());
		
		navigate('/auth/register');
	}

	return (
		<>
		<MyNavbar/>
			<div className="container-dashboard">{/* main-container*/}
				{/* <div className="inside-container"> */}
				<div className="container-dashboard-heading" >
					<h1 className="container-dashboard-heading-headline1">Welcome to the Front Page</h1>
					<p className="container-dashboard-heading-headline2">Create your own music</p>
					<p className="container-dashboard-heading-headline3">👉 Find the best tilented Artistes around the world</p>
					<p className="container-dashboard-heading-headline3">✨ Get Free created playlists</p>
					<p className="container-dashboard-heading-headline3">🚀 Explare New Song Player - Muyi</p>
				<div className="container-dashboard-button">
					<button className="container-dashboard-button-type"onClick={Login}>Login</button>
					<button className="container-dashboard-button-type"onClick={Register}>Register</button>
					<button className="container-dashboard-button-type"onClick={Logout}>Logout</button>
				</div>
				</div>
			</div>
		<Outlet/>
		<Footer/>
		</>
	);
};

export default HomePage;
