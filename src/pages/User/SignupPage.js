import React from "react";

import Signup from '../../components/Signup/Signup'
import styled from 'styled-components' 

const SignupPage = () => {
  return (
    <SignupWrapper>
      <Signup />
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
  margin: 119px auto 0 auto;
  max-width: 980px;
`

export default SignupPage;