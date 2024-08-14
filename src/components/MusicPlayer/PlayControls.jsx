import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import {
	TbArrowsShuffle,
	TbPlayerTrackNextFilled,
	TbPlayerTrackPrevFilled,
	TbRepeat,
	TbRepeatOff,
	TbRepeatOnce,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toggleRepeat } from "../../redux/slices/playerSlice";
import "./music.css"

const PlayControls = ({
	onNext,
	onPrevious,
	onPlay,
	isPlaying,
	repeatStatus,
}) => {
	const dispatch = useDispatch();

//	const repeatStatus = "OFF";

	return (
		<div class="track-button">
			<button className="music_bnt" ><TbArrowsShuffle size={20}/></button>

			<button className="music_bnt" onClick={onPrevious}> <TbPlayerTrackPrevFilled size={20}/></button>
			
			<button className="music_bnt" onClick={onPlay}> {!isPlaying ? <AiFillPlayCircle size={28}/> : <AiFillPauseCircle size={28}/>}</button>
			
			<button className="music_bnt" onClick={onNext}> <TbPlayerTrackNextFilled size={20} /></button>
			
			<button className="music_bnt" onClick={() => dispatch(toggleRepeat())}>
				{repeatStatus === "OFF" ? (
						<TbRepeatOff color="inherit" size={20} />
					) : repeatStatus === "SINGLE" ? (
						<TbRepeatOnce color="inherit" size={20} />
					) : (
						<TbRepeat color="inherit" size={20} />
					)}
			</button>
		</div>
	);
};

export default PlayControls;

