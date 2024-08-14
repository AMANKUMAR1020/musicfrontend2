import React, { useState } from "react";
import { useSelector } from "react-redux";
import { client } from "../../api";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./music.css";


const TrackDetails = ({ track }) => {
  const { user, token } = useSelector((state) => state.user);
  const [like, setLike] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      await client.patch(
        `/songs/${track._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Your favorites have been updated");
      setLike(!like);

    } catch (error) {
      console.log("An error occurred");
    }
  };

  const checking = () => {
    const result = track.likes.find((id) => id === user._id);
    return result || like;
  };

  return (
    <div className="music_title">

      <p className="song-title">{track.title}</p><span>&nbsp;&nbsp;&nbsp;</span>
      <p className="song-artiste">{track.Artiste}</p>
      <p
        className="like"
        onClick={(e) => {
          handleLike(e);
        }}
      >
        {checking() ? <FaHeart size={32}/> : <CiHeart size={32}/>}
      </p>

    </div>
  );
};

export default TrackDetails;
