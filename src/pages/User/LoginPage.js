import React from "react";

import Login from '../../components/Login/Login'
import styled from 'styled-components' 


const LoginPage = (props) => {
  return (
    <LoginWrapper>
      <Login />
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  margin: 119px auto 0 auto;
  max-width: 980px;
`

export default LoginPage;
