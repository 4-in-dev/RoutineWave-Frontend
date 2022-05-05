import React from "react";
import { Link } from "react-router-dom";

import classes from "./Login.module.css";

const Login = () => {
  return (
    <section>
      <div>로고</div>
      <form >
        <div className={classes['form-control']}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
          />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
          />
        </div>
        <div className={classes['button-wrapper']}>
          <button>Login</button>
        </div>
        <div className={classes['link-wrapper']}>
          <Link className={classes['a-style']} to="/signup">RountineWave 가입하기</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
