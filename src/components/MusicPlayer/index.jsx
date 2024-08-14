import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	nextTrack,
	prevTrack,
	setPlaying,
} from "../../redux/slices/playerSlice";
import { client } from "../../api";
import { setUser } from "../../redux/slices/userSlice";
import VolumeControl from "./VolumeControl";
import TrackDetails from "./TrackDetails";
import PlayControls from "./PlayControls";
import PlayingBar from "./PlayingBar";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./music.css"

const MusicPlayer = () => {
	const dispatch = useDispatch();
	const { currentTrack, repeatStatus, currentIndex, trackList, isPlaying } = useSelector((state) => state.player);
	const { user, token } = useSelector((state) => state.user);

	const audioRef = useRef();

	const playAnimationRef = useRef();// i addded it

	const isEndOfTracklist = currentIndex === trackList.length - 1;

	const [duration, setDuration] = useState(0);
	const [songDetails, setSongDetails] = useState(null);
	const [audioPlaying, setAudioPlaying] = useState(audioRef.current && audioRef.current.playing);

	useEffect(() => {
		if (audioPlaying) {
			dispatch(setPlaying(true));
//			setDuration(audioRef.current.duration)
		} else {
			dispatch(setPlaying(false));
		}
	}, [audioPlaying]);

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		}
	}, [isPlaying]);

	useEffect(() => {
		setSongDetails((prev) => {
			return { ...prev, time: 0 };
		});
		audioRef.current.currentTime = 0;
		audioRef.current.play();
	}, [currentTrack?._id]);

	useEffect(() => {
		setSongDetails({
			volume: 1,
			time: audioRef?.current	? Math.round((audioRef?.current.currentTime / audioRef.current.duration) * 100) : 0,
			shuffle: false,
			repeat: false,
		});
	}, [audioRef.current]);

	const seekPoint = (e) => {

		audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;

		setSongDetails((prev) => ({
			...prev,
			time: Math.round((audioRef.current.currentTime / audioRef.current.duration) * 100),
		}));
	};

	const changeVolume = (e) => {
		setSongDetails((prevValues) => {
			return { ...prevValues, volume: e.target.value / 100 };
		});
		audioRef.current.volume = e.target.value / 100;
	};

	const handlePlayPause = () => {
		if (isPlaying) {
			audioRef?.current.pause();
			dispatch(setPlaying(false));
		} else {
			audioRef?.current.play();
			dispatch(setPlaying(true));
		}
	};

	const volumeToggle = () => {
		if (songDetails?.volume > 0) {
			setSongDetails((prev) => {
				return { ...prev, volume: 0 };
			});
			audioRef.current.volume = 0;
		} else {
			setSongDetails((prev) => {
				return { ...prev, volume: 1 };
			});
			audioRef.current.volume = 1;
		}
	};

	useEffect(() => {
		audioRef.current.currentTime = 0;
		audioRef?.current.play();
		dispatch(setPlaying(true));
	}, [currentTrack.src]);

	const handleNextSong = () => {
		if (trackList.length == 1) {
			restartSong();
		} else {
			dispatch(nextTrack());
		}
	};

	const handlePreviousSong = () => {
		if (trackList.length == 1) {
			restartSong();
		} else {
			dispatch(prevTrack());
		}
	};

	const restartSong = () => {
		setSongDetails((prev) => {
			return { ...prev, time: 0 };
		});
		audioRef.current.currentTime = 0;
		audioRef.current.play();
	};

	const handleEnded = () => {
		switch (repeatStatus) {
			case "OFF":
				if (!isEndOfTracklist) {
					handleNextSong();
				}
				break;
			case "TRACKLIST":
				handleNextSong();
				break;
			case "SINGLE":
				audioRef.current.play();
				break;

			default:
				break;
		}
	};

	return (
		<div class="base">
			<div style={{display: 'flex'}}>
				<img
					className="music_img"
					src={currentTrack.coverImage}
					alt={currentTrack.title}
					width="100px"
					height="100px"
				/>
				<TrackDetails track={currentTrack} />
			</div>

			<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
				<PlayingBar
					onSeek={seekPoint}
					time={songDetails?.time}
					track={currentTrack}
					trackRef={audioRef.current}
				/>

				<PlayControls
					isPlaying={isPlaying}
					onNext={handleNextSong}
					onPlay={handlePlayPause}
					onPrevious={handlePreviousSong}
					repeatStatus={repeatStatus}
				/>

				<VolumeControl
					onChange={changeVolume}
					onToggle={volumeToggle}
					volume={songDetails ? songDetails?.volume : 0}
				/>
			</div>

		<audio
			ref={audioRef}
			src={currentTrack?.songUrl}
			onPause={() => setAudioPlaying(false)}
			onPlay={() => setAudioPlaying(true)}
			onEnded={handleEnded}
			onTimeUpdate={() => {
				setSongDetails((prev) => ({
				...prev,
				time: Math.round((audioRef.current.currentTime / audioRef.current.duration)*100),}));}}
		/>
		</div>
	);
};

export { MusicPlayer };
