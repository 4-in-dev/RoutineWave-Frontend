import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSeriesData, getRoutineTableOptions } from "./MyRoutineHelper";
import { jobActions } from "../../store/job";
import { reqDeleteJob } from "../../lib/request-schedule";

import { PieChart } from "@toast-ui/react-chart";

import "./DayRoutine.css";
import Modal from "../UI/Modal";
import DayRoutineMaker from "./DayRoutineMaker";
import styled from "styled-components";

const INIT_JOB_INDEX = -1;
const JOB_ID_INDEX = 2;

const DayRoutine = () => {
  const [hourText, setHourText] = useState([]);
  const [chartReRenderHelper, setChartReRenderHelper] = useState([1]);
  const [addRoutineModalIsShown, setAddRoutineModalIsShown] = useState(false);
  const [isSelectedJob, setIsSelectedJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(INIT_JOB_INDEX);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const entireJobs = useSelector((state) => state.job.jobs);
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
    reRenderAndDestroyPreviousChart();
  };

  const selectSeriesHandler = (selectedJob) => {
    const selectedId = selectedJob.pie[0].seriesIndex;
    setSelectedJob(selectedId);
    setIsSelectedJob(true);
  };

  const unselectSeriesHandler = () => {
    setSelectedJob(INIT_JOB_INDEX);
    setIsSelectedJob(false);
  };

  const clickedRemoveButton = async () => {
    const isOkayForRemove = window.confirm("이 일정을 삭제하시겠습니까?");
    if (isOkayForRemove) {
      try {
        const resultDelete = await reqDeleteJob(entireJobs[selectedJob][JOB_ID_INDEX]);
        if (!resultDelete) throw new Error("Delete job fail");
        dispatch(jobActions.removeJob(selectedJob));
        reRenderAndDestroyPreviousChart();
      } catch (error) {
        console.log(error.message);
        alert("일정 삭제를 실패하였습니다.");
      }
    }
    unselectSeriesHandler();
  };

  const reRenderAndDestroyPreviousChart = () => {
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
            {!isSelectedJob && (
              <button className="add-btn-job" onClick={showAddRountineHandler}>
                일정 추가
              </button>
            )}
            {isSelectedJob && (
              <RemoveJobButton onClick={clickedRemoveButton}>일정 삭제</RemoveJobButton>
            )}
          </div>
          <div className="day-routine-wrapper">
            {chartReRenderHelper.map((t, i) => (
              <PieChart
                ref={chartRef}
                data={data}
                options={options}
                key={i}
                onSelectSeries={selectSeriesHandler}
                onUnselectSeries={unselectSeriesHandler}
              />
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
`;

const MyRoutineWrapper = styled.div`
  width: 70%;
`;

const RemoveJobButton = styled.button`
  width: 20%;
  margin-top: 1rem;
  margin-right: 1rem;
  background-color: rgb(240, 109, 6);
  border: 1px solid rgb(240, 109, 6);
  border-color: rgb(240, 109, 6);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(240, 109, 6);
    border-color: rgb(240, 109, 6);
  }
`;

export default DayRoutine;
