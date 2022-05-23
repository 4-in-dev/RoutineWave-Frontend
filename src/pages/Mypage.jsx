import React from 'react';
import LandingHeader from "../components/LandingHeader";
import aboutimage from "../assets/about.png";
import Navbar from "../components/Navbar";
import RadarChart from "../components/RadarChart";
import Profile from "../components/Profile";
import Area from "../components/AreaChart";
import '../Mypage.css';
import '../Landing.css';

function Mypage() {
  return (
    <div id="main">
        <Navbar />
        <div className="container">
        <div id="left-wrapper">
            <Profile/>
        </div>
        <div id="right-wrapper">
            <RadarChart/>
            <Area/>
        </div>
        </div>

    </div>
  );
}

export default Mypage;
