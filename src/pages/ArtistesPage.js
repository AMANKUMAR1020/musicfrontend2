import React, { useEffect, useState } from "react";
import { client } from "../api";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { resetPlayer} from "../redux/slices/playerSlice";
import './style/ArtistesPage.css'
import './style/HomePage.css'
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";
import useTitle from "./useTitle";

const ArtistesPage = () => {

	useTitle('Ppopular Atistes')

	const [artistes, setArtistes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
  

	const fetchArtistes = async () => {
		setLoading(true);
		setError(false);
		try {
			const res = await client.get("users/allusers");
			setArtistes(res.data);
			setLoading(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};

	const flush=()=>{dispatch(resetPlayer());}

	useEffect(() => {
		fetchArtistes();
	}, []);

	return (
		<>

		<MyNavbar/>

		<h1 className="headline1">Artistes</h1>
		<p className="headline2">Discover new artistes</p>
			<div className="artistes-container-page">
				{loading && artistes.length < 1 && (
					<ClipLoader
						color='#64B1F0'
						loading={loading}
						cssOverride={{
							display: "block",
							margin: "0 auto",
							borderColor: "yellow",
						}}
						size={100}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				)}

				{artistes.map((artiste) => (
					<div key={artiste.id} className="artistes-hover">
						<Link to={`${artiste.id}`}>
						<img src={artiste.image} alt={artiste.username} width="150px" height="150px" />
							<p className="text" onClick={flush}>{artiste.name}</p>
						</Link>
					</div>
				))}

				{error && <div>Sorry, an error occurred</div>}
			</div>
			
		<Outlet/>
		<Footer/>
		</>
	);
};

export default ArtistesPage;