import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../api';
import { setUser } from '../../redux/slices/userSlice';
import { AiOutlineLoading } from "react-icons/ai";
import { Outlet, useNavigate } from 'react-router-dom';
import MyNavbar from '../MyNavbar';
import Footer from '../Footer';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import useTitle from '../useTitle';

function EditProfile() {
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedImage, setUpdatedImage] = useState("");
  const [progresspercentimg, setProgresspercentimg] = useState(0);
  useTitle('Edit Profile')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateFields = () => {
      if (!updatedName) {
        setError("All fields are required!");
        return false;
      } else {
        setError(null);
        return true;
      }
    };

    validateFields();

    try {
      setLoading(true);
      setError('');

      if (updatedImage === ""){
        setUpdatedImage(user.image);
      }

      const res = await client.put('users/myprofile',{
          updatedName,
          updatedImage,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"},
          });

      console.log(res.data);
      dispatch(setUser(res.data));

      setSuccessMsg(' :) Update is successfull')

    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  const handleSubmitImg = (e) => {
    e.preventDefault();
    console.log("handleSubmitImg")

    const file = e.target.files[0];
    console.log(file)
    
    if (!file) return;
    const storageRef = ref(storage, `avtar/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercentimg(progress);
      },
      (error) => {
        alert(error);
        setError(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpdatedImage(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  if(loading){
    return <AiOutlineLoading className="AiOutlineLoading" size={36}/>
  }


  return (
    <>
    <MyNavbar/>
      <h1 className='headline1'>EditProfile</h1>
      <h3 className='headline2'>{user.username}</h3>
  
      <div style={{ textAlign:'center'}}>
        <p className='headline3'>Artiste Name</p>
        <input
          className="input"
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </div>
  
      <img
        src={user.image}
        alt={user.username}
        width="150px"
        height="150px"
        style={{ borderRadius: '50%' }}
      />
  
      <div style={{ textAlign:'center'}}>
        <p className='headline3'>Change Image</p>
        {error && <p className='error'>{error.message}</p>}
        {successMsg && <p className='success'>{successMsg}</p>}

        <input
        className='input'
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleSubmitImg}
        />

        {
        updatedImage ? 
        <img src={updatedImage} alt={updatedImage} height={80} weight={80} />
        :  
        <div style={{ textAlign:'center', display:'flex', fontSize:'20px'}}>{progresspercentimg}%</div>
        }
      </div>

      <div className='container-dashboard-button'>
        <button className="container-dashboard-button-type" onClick={()=>{navigate(-1)}}>Back</button>
        <button className="container-dashboard-button-type" onClick={handleSubmit}>Update</button>
      </div>
  
      {loading && <p><AiOutlineLoading className="AiOutlineLoading" size={36}/></p>}

    <Outlet/>
    <Footer/>
    </>
  );
  
}

export default EditProfile;
