import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { client } from "../../api/index";
import { loginUser,setUser } from "../../redux/slices/userSlice";
import { resetPlayer } from "../../redux/slices/playerSlice";
import '../style/Register.css'
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";
import useTitle from "../useTitle";
import Timer from "../Timer";
const LoginPage = () => {

	useTitle('Login Page')

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const validateFields = () => {
		if (username === "" || password === "") {
			setError("All fields are required!");
			return false;

		} else {
			setError(null);
			return true;
		}
	};

	const handleLogin = async () => {
		if (validateFields()) {
			setLoading(true);
			await client
				.post("/users/login", {
					username,
					password,
				})
				.then((res) => {
					dispatch(resetPlayer());
					dispatch(loginUser(res.data));

					console.log(res.data)
					dispatch(setUser(res.data.user))

					navigate('/dash')
				})
				.catch((err) => {
					console.log(err)
					setError(err?.response?.data?.message);
				});
				setLoading(false);
		}
	};

	if(loading){
		return (<>
		<Timer/>
		</>)}

	return (
	<>
	<MyNavbar/>
	<h1 className="headline1">Login</h1>
	<div className="formparant">
		<form className="form">
			<div className="div">
				<label htmlFor="username" className="label">Username</label>
				<input type="text" placeholder="Enter Username here..." name="username" className="input"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div className="div">
				<label htmlFor="password" className="label">Password</label>
				<input type="password" placeholder="Enter Password here..." name="password" className="input"
				
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{error && <p className="error">{error}</p>}

			<div className="button-div">
				<button className="button" onClick={()=>{navigate(-1)}}>Back</button>
				<button className="button" onClick={handleLogin}>Login</button>
			</div>
		</form>
	</div>
	<Outlet/>
	<Footer/>
	</>
	);
	
};

export default LoginPage;