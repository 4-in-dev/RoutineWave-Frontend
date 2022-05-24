import React,{useState} from "react";
import logo from "../assets/11.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";






function Navbar() {

    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const [nav,setnav] = useState(false);
    const changeBackground = ()=> {
        if (window.scrollY >= 50){
            setnav(true);
        }
        else {
            setnav(false);
        }
    }

    window.addEventListener("scroll", changeBackground);

    return (
        <nav className={nav ? "nav active" : "nav"}>
            {/*<a href="#" className="logo">*/}
                <Link to="/">
                <img src={logo} alt='' />
                </Link>
            {/*</a>*/}
            <input type="checkbox" className="menu-btn" id="menu-btn" />
            <label className="menu-icon" for="menu-btn">
                <span className="nav-icon"> </span>
            </label>
            <ul className="menu">
                <li><Link to="/"> main </Link></li>
                {!isAuth && (
                      <li>
                        <Link to="/login">sign in</Link>
                      </li>
                    )}
                    {isAuth && (
                      <>
                        <li>
                          <Link to="/main">schedule</Link>
                        </li>
                        <li>
                            <Link to="/mypage">mypage</Link>
                        </li>
                        <li>
                          <Link to="/logout">sign out</Link>
                        </li>
                      </>
                    )}

            </ul>
        </nav>
    )
}

export default Navbar;