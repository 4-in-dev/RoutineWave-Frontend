import React from "react";
import Navbar from "./Navbar";

function LandingHeader() {
    return (
        <div id="main">
            <Navbar />
            <div className="name">
                <h1><span>RoutineWave</span> will make you grow up.</h1>
                <p className="details">
                    You can create and run routines. Check your achievement and draw a growth curve. You can also save and recall routines. Check in what direction
                </p>
            <a href="#" className="cv-btn">go to login</a>
            </div>

        </div>
    )
}

export default LandingHeader;
