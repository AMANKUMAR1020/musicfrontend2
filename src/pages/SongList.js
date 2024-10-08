import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../api";
import ArtisteSong from "../components/ArtisteSong";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { MusicPlayer } from "../components/MusicPlayer";
import './style/HomePage.css'
import {resetPlayer } from "../redux/slices/playerSlice";

const SongList = () => {
	const [songs, setSongs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { currentTrack } = useSelector((state) => state.player);
	const dispatch = useDispatch();

	const fetchSongs = async () => {
		setLoading(true);
		setError(false);
		await client
			.get("/songs")
			.then((res) => {
				setLoading(false);
				setSongs(res.data);
			})
			.catch((e) => {
				setLoading(false);
				setError(true);
				setErrorMsg(e);
				console.log(errorMsg)
			});
	};

	useEffect(() => {
		fetchSongs();
	}, []);

	const onPlay = (song) => {
		
		dispatch(resetPlayer());

		const index = songs?.findIndex((s) => s._id === song._id);

		dispatch(setTrackList({ list: songs, index }));
		dispatch(playTrack(song));
	};

	return (
		<span style={{display : 'inline'}}>
			<div className="Container">
				<h1 className="headline2">SongList</h1>

				{loading && songs.length < 1 && (<AiOutlineLoading className="AiOutlineLoading" size={36} />)}
				{error && (<p className="Empty-Song-List-Message">Sorry, an error occured</p>)}
				
				<div className="SongList">
				{songs?.map((song) => (
					<ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
				))}
				</div>
				
				{!loading && !error && songs.length < 1 && (<p className="error">{"You haven't any songs yet..."}</p>)}

				{currentTrack && <MusicPlayer />}
			</div>
		</span>
	);
};

export default SongList;