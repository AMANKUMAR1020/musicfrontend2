import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { client } from "../../api/index";
import { loginUser } from "../../redux/slices/userSlice";
import { resetPlayer } from "../../redux/slices/playerSlice";
import { Outlet, useNavigate } from "react-router-dom";
import '../style/Register.css'
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";
import { AiOutlineLoading } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import useTitle from "../useTitle";
import  Timer  from '../Timer.js';

const RegisterPage = () => {

  useTitle('Signin Page')

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
      try {
        const res = await client.post("/users/register", {
          username,
          password,
        });
        dispatch(resetPlayer());
        dispatch(loginUser(res.data));
      
        navigate("/dash");
      } catch (err) {
        setError(err?.response?.data?.message);
      }
      setLoading(false);
    }
  };


  if(loading){
    return (<>      	{/* <ClipLoader
        color='yellow'
        loading={loading}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "yellow",
          }}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"/> */}
        <Timer/>
    </>)
  }

  

  return (
    <>
    <MyNavbar/>

    <h1 className="headline1">RegisterPage</h1>
	<div className="formparant">
    { loading ?
     <p><AiOutlineLoading className="AiOutlineLoading" size={36} /></p> 
     : 
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
          <button className="button" onClick={handleLogin}>Register</button>
        </div>
      </form>
    }
	</div>        
    <Outlet/>
    <Footer/>
    </>
  );
};

export default RegisterPage;
