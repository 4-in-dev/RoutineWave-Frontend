import React from "react";
import { Link } from "react-router-dom";

function About(props) {
    return (
        <div id="about">
            <div className="about-image">
                <img src={props.image} />
            </div>
            <div className="about-text">
                <h2> {props.title} </h2>
                <p>{props.desc}</p>
                <Link to="/main"><button> {props.button} </button></Link>
            </div>

        </div>
    )
}

export default About;