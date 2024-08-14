import { useSelector } from "react-redux";
import '../pages/style/HomePage.css'
import './ArtisteSong.css'
import { BsFillPlayCircleFill } from "react-icons/bs";
import { GiMusicalNotes } from "react-icons/gi";


const ArtisteSong = ({ song, handlePlay }) => {
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  const isCurrentTrack = currentTrack?._id === song?._id;

  const playSong = () => {
    handlePlay(song);
  };

  return (
    <div className="songlist">
      <img
        className="img"
        src={song?.coverImage}
        alt={song?.title}
      />
      
      <p className="song-title">{song?.title}</p>
      <p className="song-artiste">{song?.Artiste}</p>

      {isCurrentTrack && isPlaying ?
       <button style={{ fontSize: '40px' }} className="isplaying" ><GiMusicalNotes /></button>
    : <button style={{ fontSize: '40px' }} className="isplaying" onClick={playSong}><BsFillPlayCircleFill /></button>}

    </div>
  );
};

export default ArtisteSong;
