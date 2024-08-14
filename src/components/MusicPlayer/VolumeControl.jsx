import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import "./music.css"

const VolumeControl = ({ onToggle, onChange, volume }) => {
		
	return (
		<div class="vol-title">
			<button className="music_bnt" onClick={onToggle} >{volume === 0 ? <BsFillVolumeMuteFill size={28}/> : <BsFillVolumeUpFill size={28}/>}</button>
			<input type="range" value={volume ? volume * 100 : 0} onChange={onChange}/>
		</div>
	);
};

export default VolumeControl;
