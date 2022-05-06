import React from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";

import classes from "./Signup.module.css";
import logo from "../../assets/logo-small.png";

const Signup = () => {
  return (
    <section>
      <div>
        <img src={logo} alt="logo" />
        <p>RoutinWave 계정 생성</p>
      </div>
      <form>
        <div className={classes["form-control"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" autoComplete="off" />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="password-confirm">Password Confirm</label>
          <input type="password" id="password-confirm" autoComplete="off" />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="nickname">Nickname</label>
          <input type="text" id="nickname" />
        </div>
        <div className={classes["button-wrapper"]}>
          <button>REGISTER</button>
        </div>
      </form>
    </section>
  );
};

export default Signup;