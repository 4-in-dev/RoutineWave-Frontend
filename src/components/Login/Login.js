import React from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";

import classes from "./Login.module.css";

const isEmail = (value) => value.includes("@");
const isNotEmpty = (value) => value.trim() !== "";

const Login = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: pwValue,
    isValid: pwIsValid,
    hasError: pwHasError,
    valueChangeHandler: pwChangeHandler,
    inputBlurHandler: pwBlurHandler,
    reset: resetPw,
  } = useInput(isNotEmpty);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!emailIsValid) {
      emailBlurHandler()
      return
    }

    if (!pwIsValid) {
      pwBlurHandler()
      return
    }

    resetEmail();
    resetPw();
  };

  return (
    <section>
      <div>로고</div>
      <form onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p className={classes["error-text"]}>유효한 이메일을 입력해주세요.</p>}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            value={pwValue}
            onChange={pwChangeHandler}
            onBlur={pwBlurHandler}
          />
          {pwHasError && <p className={classes['error-text']}>비밀번호를 입력해주세요.</p>}
        </div>
        <div className={classes["button-wrapper"]}>
          <button>Login</button>
        </div>
        <div className={classes["link-wrapper"]}>
          <Link className={classes["a-style"]} to="/signup">
            RountineWave 가입하기
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
