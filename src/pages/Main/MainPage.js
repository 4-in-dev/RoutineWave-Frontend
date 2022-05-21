import React from "react";
import { useSelector } from "react-redux";

import DayRoutine from "../../components/Main/DayRoutine";
import MyCalendar from "../../components/Main/MyCalendar";

import styled from "styled-components";

const MainPage = () => {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <>
      <InfoWrapper>
        <span>안녕하세요! {user.nickname} 님</span>
      </InfoWrapper>
      <RoutineWrapper>
        <DayRoutine />
        <MyCalendar />
      </RoutineWrapper>
    </>
  );
};

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-bottom: 1rem;
`;

const RoutineWrapper = styled.div`
  display: flex;
  flex-direciton: row;
`;

export default MainPage;
