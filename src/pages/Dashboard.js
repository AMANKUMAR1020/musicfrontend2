import React from "react";
import "./style/HomePage.css";
import SongList from "./SongList";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";
import useTitle from "./useTitle";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user} = useSelector((state) => state.user);

  useTitle(`Welcome ${user.username}`)

  return (
    <>
      <MyNavbar/>
        <Navbar/>
        <SongList/>
        <Outlet />
      <Footer/>
    </>
  );
};

export default Dashboard;
