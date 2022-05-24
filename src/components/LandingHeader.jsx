import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function LandingHeader() {
    return (
        <div id="main">
            {/*<Navbar />*/}
            <div className="name">
                <h1><span>RoutineWave</span> will make you grow up.</h1>
                <p className="details">
                    You can create and run routines. Check your achievement and draw a growth curve. You can also save and recall routines. Check in what direction
                </p>
            <Link to="/login"><a href="#" className="cv-btn">go to login</a></Link>
            </div>

        </div>
    )
}

export default LandingHeader;
