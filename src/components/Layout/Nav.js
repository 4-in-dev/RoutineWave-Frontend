import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./Nav.module.css";

const Nav = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className={classes.wrapper}>
      <h2>RountineWave</h2>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        {!isAuth && (
          <li>
            <Link to="/login">로그인</Link>
          </li>
        )}
        {isAuth && (
          <>
            <li>
              <Link to="/main">일정</Link>
            </li>
            <li>
              
              <Link to="/logout">로그아웃</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
