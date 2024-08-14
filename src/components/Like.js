import { useSelector } from "react-redux";
import { useState } from "react";
import { client } from "../api";
import '../pages/style/HomePage.css'

import { BsFillPlayCircleFill } from "react-icons/bs";
import { GiMusicalNotes } from "react-icons/gi";



const Like = ({ song, handlePlay, id }) => {
    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  const { token } = useSelector((state) => state.user);
  const isCurrentTrack = currentTrack?._id === song?._id;

  const handleLike = async (id, e) => {
    e.preventDefault();
	const songId = id;
    await client
      .patch(
        "/songs/like",
        {
          songId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        setErrorMsg(e);
      });

    cheacking(id);
  };

  const cheacking = (id) => {
    return song?.likes.includes(id);
  };

  const playSong = () => {
    handlePlay(song);
  };

  return (
    <div className="songlist">
      <img
        className="img"
        src={song?.coverImage}
        alt={song?.title}
        width="150px"
        height="150px"
      />
      <p className="text">{song?.title}</p>
      <p className="text">{song?.Artiste}</p>
      
  {isCurrentTrack && isPlaying ? (
    <p className="text">
      <GiMusicalNotes />
    </p>
  ) : (
    !isPlaying ? (
      <button style={{ fontSize: '40px' }} className="btn-type4" onClick={playSong}>
        <BsFillPlayCircleFill />
      </button>
    ) : null
  )}

    </div>
  );
};

export default Like;
