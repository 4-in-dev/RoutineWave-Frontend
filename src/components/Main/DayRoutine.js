import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSeriesData, getRoutineTableOptions } from "./MyRoutineHelper";

import { PieChart } from "@toast-ui/react-chart";

import "./DayRoutine.css";
import Modal from "../UI/Modal";
import DayRoutineMaker from "./DayRoutineMaker";
import styled from 'styled-components'

const DayRoutine = () => {
  const [hourText, setHourText] = useState([]);
  const [chartReRenderHelper, setChartReRenderHelper] = useState([1]);
  const [addRoutineModalIsShown, setAddRoutineModalIsShown] = useState(false);
  const navigate = useNavigate();

  const currDate = useSelector((state) => state.job.date);
  const myRountineSeries = useSelector((state) => state.job.series);
  const myRountineStartAngle = useSelector((state) => state.job.angleRange);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const data = getSeriesData(myRountineSeries);
  const options = getRoutineTableOptions(myRountineStartAngle);

  const chartRef = useRef(null);

  useEffect(() => {
    // 시간 텍스트 세팅
    if (!isAuth) {
      navigate("/login");
    }

    const numArr = Array.from({ length: 24 }, (v, i) => i + 1);
    numArr[23] = 0;
    setHourText(numArr);

    // API 호출 (해당 날짜 전체 일과)
  }, []);

  const showAddRountineHandler = () => {
    setAddRoutineModalIsShown(true);
  };
  const hideAddRountineHandler = () => {
    setAddRoutineModalIsShown(false);

    setChartReRenderHelper([...chartReRenderHelper, 1]);
    chartRef.current.getInstance().destroy();
    document
      .querySelector(".day-routine-wrapper")
      .removeChild(document.querySelector(".day-routine-wrapper > div"));
  };

  return (
    <>
      {addRoutineModalIsShown && (
        <Modal onClose={hideAddRountineHandler}>
          <DayRoutineMaker onClose={hideAddRountineHandler} />
        </Modal>
      )}
      <MyRoutineWrapper>
        <h1>MY ROUTINE</h1>
        <div className="day-routine-container">
          <div className="add-btn-wrapper">
            <CurrentDate>{currDate}</CurrentDate>
            <button className="add-btn-job" onClick={showAddRountineHandler}>
              일과 추가
            </button>
          </div>
          <div className="day-routine-wrapper">
            {chartReRenderHelper.map((t, i) => (
              <PieChart ref={chartRef} data={data} options={options} key={i} />
            ))}
            {hourText.map((hour) => (
              <p key={hour}>{hour}</p>
            ))}
          </div>
        </div>
      </MyRoutineWrapper>
    </>
  );
};

const CurrentDate = styled.span`
  margin-top: 1rem;
  margin-left: 1rem;
`

const MyRoutineWrapper = styled.div`
  width: 70%
`

export default DayRoutine;
