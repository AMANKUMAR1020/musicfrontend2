import React, { useEffect, useState } from "react";
import { client } from "../../api";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";
import '../style/HomePage.css';
import { Outlet, useNavigate } from "react-router-dom";
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";

const CreatePlaylist = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [songIds, setSongIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState("");

  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await client.get("/songs");
      setSongs(res.data);
    } catch (error) {
      setErrorMsg("Failed to load songs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const toggleSongSelection = (id) => {
    setSongIds((prev) =>
      prev.includes(id) ? prev.filter((songId) => songId !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => songIds.includes(id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || songIds.length === 0) {
      setErrorMsg("All fields are required and at least one song must be selected.");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await client.post(
        "/playlists/create",
        {
          title,
          description,
          isPrivate,
          songIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMsg("🎉 Playlist created successfully!");
      setTitle("");
      setDescription("");
      setIsPrivate(false);
      setSongIds([]);
    } catch (error) {
      setErrorMsg("Failed to create playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MyNavbar />
      <h1 className="headline1">Create Playlist</h1>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <h3 className="headline2">Playlist Title</h3>
        <input
          style={{ width: "40%" }}
          className="input"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter playlist title"
        />

        <h3 className="headline2">Description</h3>
        <textarea
          style={{
            width: "40%",
            height: "87px",
            display: "block",
            fontSize: "15px",
            color: "darkslategray",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter playlist description"
        ></textarea>

        <h4 className="text">Private Playlist:</h4>
        <button
          type="button"
          className="container-dashboard-button-type"
          onClick={() => setIsPrivate((prev) => !prev)}
        >
          {isPrivate ? "Private" : "Public"}
        </button>

        <h3 className="headline3" style={{ textAlign: "center" }}>Select Songs</h3>
        <ul>
          {songs.map((song) => (
            <li key={song._id} onClick={() => toggleSongSelection(song._id)}>
              <p className="text1">
                {isSelected(song._id) ? (
                  <s>{song.title}</s>
                ) : (
                  <cite>{song.title}</cite>
                )}
                {" - by "}
                {song.Artiste}
              </p>
            </li>
          ))}
        </ul>
        {errorMsg && <p className="error">{errorMsg} <MdErrorOutline size={24} /></p>}
        {successMsg && <p className="success">{successMsg}</p>}


        <div style={{ display: "flex", gap: "1rem", marginTop: "20px" }}>
          <button
            type="button"
            className="container-dashboard-button-type"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            type="submit"
            className="container-dashboard-button-type"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading className="loading-icon" size={24} /> : "Create Playlist"}
          </button>
        </div>
      </form>

      <Outlet />
      <Footer />
    </>
  );
};

export default CreatePlaylist;





















// import React, { useEffect, useState } from "react";
// import { client } from "../../api";
// import { MdErrorOutline } from "react-icons/md";
// import { AiOutlineLoading } from "react-icons/ai";

// import { useSelector } from "react-redux";
// import '../style/HomePage.css';
// import { Outlet, useNavigate } from "react-router-dom";
// import MyNavbar from "../MyNavbar";
// import Footer from "../Footer";

// const CreatePlaylist = () => {
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [songIds, setSongIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [successMsg, setSuccessMsg] = useState("");

//   const { token } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const fetchSongs = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const res = await client.get("/songs");
//       setData(res.data);
//       setLoading(false);

//       console.log("songs", res.data);
      
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error);
//     }
//   };

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const handleCollect = (id) => {
//     const isContains = songIds.includes(id);
    
//     if (songIds.length === 0) {
//       setSongIds([...songIds, id]);
//       cheaking(id);
//     } else if (!isContains) {
//       setSongIds([...songIds, id]);
//     } else {
//       setSongIds(songIds.filter((songid) => id !== songid));
//     }
//   };

//   const cheaking = (id) => {
//     return songIds.includes(id);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validateFields = () => {
//       if (title==="" || description==="" || songIds===null ||songIds===undefined) {
//         setErrorMsg("All fields are required!");
//         return false;
//       } else {
//         setErrorMsg('');
//         return true;
//       }
//     };
    
//     setLoading(true);
//     setError(false);
//     try {      
//       validateFields();
//       await client.post("/playlists/create", {
//         title,
//         description,
//         isPrivate,
//         songIds
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       }).then((res) => {
//         console.log("songsIds", res.data);
//       });
//       setSuccessMsg(" :) you create playlist successFully")
//       setIsPrivate(false);
//       setDescription("");
//       setTitle("");

//     } catch (error) {
//       setError(true);
//       setErrorMsg(error);
//     }  
//     setLoading(false);
//   };

//   if (error) {
//     return (
//       <>
//         {errorMsg}
//         <MdErrorOutline color="inherit" size={32} />
//       </>
//     );
//   }

//   return (
//     <>
//       <MyNavbar/>
//       <h1 className="headline1">Playlist Creation</h1>
//       {error && <p className="error">{errorMsg} <MdErrorOutline color="inherit" size={32} /></p>}
//       {successMsg && <p className="success">{successMsg}</p>}

//       <h3 className="headline2">Playlist title</h3>
//       <input
//         style={{ width: "40%" }}
//         className="input"
//         value={title}
//         type="text"
//         onChange={(e) => { setTitle(e.target.value); }}
//       />

//       <h3 className="headline2">Playlist description</h3>
//       <textarea
//         style={{ width: "40%", height: "87px", display:"block",fontSize:'15px',color: "darkslategray" }}
//         value={description}
//         onChange={(e) => { setDescription(e.target.value); }}
//         rows="5"
//         cols="6"
//       ></textarea>
  
//       <h4 className="text" style={{display:'contents'}}>You can make Playlist by apply true</h4>
//       <button className="container-dashboard-button-type"
//         onClick={() => setIsPrivate(!isPrivate)}>
//         {isPrivate ? <p>true</p> : <p>false</p>}
//       </button>
  
//         <h3 className="headline3" style={{display:"flex", justifyContent:"center"}}>Songs </h3>
//       <ul>
//         {data.map((song) => (
//           <li key={song._id} onClick={() => handleCollect(song._id)}>
//             <p className="text1">
//               {cheaking(song._id) ? (
//                 <s>{song.title}</s>
//               ) : (
//                 <cite>{song.title}</cite>
//               )}
//               {"- by "}
//               {song.Artiste}
//             </p>
//           </li>
//         ))}
//       </ul>
  
//       <div style={{display:'flex'}}>
//         <button className="container-dashboard-button-type" onClick={()=>{navigate(-1)}}>Back</button>
//         <button className="container-dashboard-button-type" onClick={handleSubmit}>
//           {loading ? <AiOutlineLoading className="AiOutlineLoading" size={36} /> : <p>Create Playlist</p>}
//         </button>
//       </div>

//       <Outlet/>
//       <Footer/>
//     </>
//   );
// };

// export default CreatePlaylist;