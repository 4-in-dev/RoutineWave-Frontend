import React from "react";
import { useSelector } from "react-redux";

import DayRoutine from "../../components/Main/DayRoutine";
import MyCalendar from "../../components/Main/MyCalendar";
import RoutineTemplate from "../../components/Main/RoutineTemplate/RoutineTemplate";

import styled from "styled-components";

const MainPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <MainWrapper>
      <UpperSection>
        <RoutineTemplate />
        <InfoWrapper>
          <span>안녕하세요! {user.nickname} 님</span>
        </InfoWrapper>
      </UpperSection>
      <RoutineWrapper>
        <DayRoutine />
        <MyCalendar />
      </RoutineWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  margin: 119px auto 0 auto;
  max-width: 980px;
`

const UpperSection = styled.div`
  width:100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const InfoWrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: right;
  margin-bottom: 1rem;
`;

const RoutineWrapper = styled.div`
  display: flex;
  flex-direciton: row;
`;

export default MainPage;
