import React from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Area from "../components/AreaChart";
import Radar from "../components/RadarChart";
import '../Mypage.css';
import '../Landing.css';

function Mypage() {
    return (
    <div id="mypage">
        <Navbar />
        <Profile/>
        <Area />
        <Radar />
    </div>
  );
}

export default Mypage;
