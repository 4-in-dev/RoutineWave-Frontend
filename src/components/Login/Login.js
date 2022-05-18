import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";

import classes from "./Login.module.css";
import logo from "../../assets/logo-small.png";
import { authActions } from "../../store/auth";
import styled from 'styled-components';

const isEmail = (value) => value.includes("@");
const isNotEmpty = (value) => value.trim() !== "";

const Login = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailIsValid) {
      emailBlurHandler();
      return;
    }

    if (!pwIsValid) {
      pwBlurHandler();
      return;
    }

    const serverUrl = process.env.REACT_APP_SERVER_URL + "login/";
    const reqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: pwValue,
      }),
    };
    try {
      const response = await fetch(serverUrl, reqData);
      const responseData = await response.json();

      // 로그인 요청 결과: 이메일, 패스워드가 잘못된 경우
      if (responseData.non_field_errors) {
        alert("이메일과 패스워드를 확인해주세요.");
        return;
      }
      // access Token
      setCookie("is_login", responseData.access_token);
      dispatch(authActions.login());
      navigate('/main');
    } catch (error) {
      alert("로그인 실패. 관리자에게 문의 해주세요.");
      return;
    }

    resetEmail();
    resetPw();
  };

  return (
    <section>
      <div>
        <img src={logo} alt="logo" />
      </div>
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
          {pwHasError && <p className={classes["error-text"]}>비밀번호를 입력해주세요.</p>}
        </div>
        <div className={classes["button-wrapper"]}>
          <CustomButton>Login</CustomButton>
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

const CustomButton = styled.button`
  font: inherit;
  background-color: #240370;
  color: white;
  border: 1px solid #240370;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  width: 20rem;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: #33059e;
    border-color: #33059e;
  }
`

export default Login;
