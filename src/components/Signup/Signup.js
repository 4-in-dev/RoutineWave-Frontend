import React from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";

import classes from "./Signup.module.css";
import logo from "../../assets/logo-small.png";
import styled from "styled-components";

const isEmail = (value) => {
  const emailRegExp =
    /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  return emailRegExp.test(value) ? true : false;
};

const isPassword = (value) => {
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordReg.test(value) ? true : false;
};

const isNotEmpty = (value) => value.trim() !== "";

const Signup = () => {
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
  } = useInput(isPassword);

  const isPasswordSame = (value) => {
    if (value.trim() === "") return false;
    return pwValue === value ? true : false;
  };

  const {
    value: pwConfirmValue,
    isValid: pwConfirmIsValid,
    hasError: pwConfirmHasError,
    valueChangeHandler: pwConfirmChangeHandler,
    inputBlurHandler: pwConfirmBlurHandler,
    reset: resetPwConfirm,
  } = useInput(isPasswordSame);

  const {
    value: nicknameValue,
    isValid: nicknameIsValid,
    hasError: nicknameHasError,
    valueChangeHandler: nicknameChangeHandler,
    inputBlurHandler: nicknameBlurHandler,
    reset: resetNickname,
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

    if (!pwConfirmIsValid) {
      pwConfirmBlurHandler();
      return;
    }

    if (!nicknameIsValid) {
      nicknameBlurHandler();
      return;
    }

    // 회원가입 요청
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const reqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password1: pwValue,
        password2: pwConfirmValue,
        nick_name: nicknameValue
      }),
    };

    try {
      const response = await fetch(serverUrl, reqData);
      const responseData = await response.json();
      if (response.status < 300 && response.status >= 200) {
        alert(`${nicknameValue} 님 환영합니다`);
        navigate("/login");
      } else {
        if (responseData.hasOwnProperty("email")) {
          alert("중복된 이메일이 있습니다.");
        }
      }
    } catch (error) {
      alert("회원가입 실패. 관리자에게 문의 해주세요.");
      return;
    }

    // 회원가입 요청
    resetEmail();
    resetPw();
    resetPwConfirm();
    resetNickname();
  };

  return (
    <section>
      <div>
        <img src={logo} alt="logo" />
        <p>RoutineWave 계정 생성</p>
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
          {pwHasError && (
            <p className={classes["error-text"]}>
              8~16자 영문 대/소문자, 숫자, 특수문자를 꼭 사용해주세요.
            </p>
          )}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="password-confirm">Password Confirm</label>
          <input
            type="password"
            id="password-confirm"
            autoComplete="off"
            value={pwConfirmValue}
            onChange={pwConfirmChangeHandler}
            onBlur={pwConfirmBlurHandler}
          />
          {pwConfirmHasError && (
            <p className={classes["error-text"]}>공란이거나 비밀번호가 같지 않습니다.</p>
          )}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            value={nicknameValue}
            onChange={nicknameChangeHandler}
            onBlur={nicknameBlurHandler}
          />
          {nicknameHasError && <p className={classes["error-text"]}>닉네임을 입력해주세요.</p>}
        </div>
        <div className={classes["button-wrapper"]}>
          <CustomButton className={classes["custom-btn"]}>REGISTER</CustomButton>
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
`;

export default Signup;
