import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getSeriesData, getRoutineTableOptions } from "./MyRoutineHelper";
import { jobActions } from "../../store/job";
import { reqDeleteJob, reqDayJob, reqMonthJob } from "../../lib/request-schedule";
import { getJobsDateForMonth } from "../../lib/util"

import { PieChart } from "@toast-ui/react-chart";
import { useCookies } from "react-cookie";

import "./DayRoutine.css";
import Modal from "../UI/Modal";
import DayRoutineMaker from "./DayRoutineMaker";
import styled from "styled-components";
import DayRoutineUpdater from "./DayRoutineUpdater";

const INIT_JOB_INDEX = -1;
const JOB_ID_INDEX = 2;

const DayRoutine = () => {
  const [hourText, setHourText] = useState([]);
  const [chartReRenderHelper, setChartReRenderHelper] = useState([1]);
  const [addRoutineModalIsShown, setAddRoutineModalIsShown] = useState(false);
  const [updateRoutineModalIsShown, setUpdateRoutineModalIsShown] = useState(false);
  const [isSelectedJob, setIsSelectedJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(INIT_JOB_INDEX);
  const dispatch = useDispatch();

  const entireJobs = useSelector((state) => state.job.jobs);
  const currDate = useSelector((state) => state.job.date);
  const currMonth = useSelector((state) => state.job.currMonth);
  const myRountineSeries = useSelector((state) => state.job.series);
  const myRountineStartAngle = useSelector((state) => state.job.angleRange);
  const data = getSeriesData(myRountineSeries);
  const options = getRoutineTableOptions(myRountineStartAngle);
  const [cookies, setCookie, removeCookie] = useCookies(["is_login"]);

  const chartRef = useRef(null);

  useEffect(() => {
    const numArr = Array.from({ length: 24 }, (v, i) => i + 1);
    numArr[23] = 0;
    setHourText(numArr);

    // API 호출 (해당 월 전체 일정)
    const fetchMonthJob = async () => {
      const jobDataOfMonth = await reqMonthJob(currMonth, cookies.is_login);
      const dateListOfMonth = getJobsDateForMonth(jobDataOfMonth);
      dispatch(jobActions.setJobListOfMonth(dateListOfMonth));
    }

    // API 호출 (해당 날짜 전체 일정)
    const fetchDayJob = async () => {
      const jobData = await reqDayJob(currDate, cookies.is_login);
      dispatch(jobActions.loadAllJob(jobData));
      reRenderAndDestroyPreviousChart();
    }
    
    fetchMonthJob();
    fetchDayJob();
  }, []);

  // 파이차트 각도 변화가 일어나면 차트 다시 그려주기
  useEffect(() => {
    if (chartReRenderHelper.length > 1 ){
      reRenderAndDestroyPreviousChart();
    }
  }, [myRountineStartAngle]);

  const showAddRountineHandler = () => {
    setAddRoutineModalIsShown(true);
  };
  const showUpdateRountineHandler = () => {
    setUpdateRoutineModalIsShown(true);
  };
  const hideModalHandler = () => {
    setAddRoutineModalIsShown(false);
    setUpdateRoutineModalIsShown(false);
    setIsSelectedJob(false);
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
        const resultDelete = await reqDeleteJob(entireJobs[selectedJob][JOB_ID_INDEX], cookies.is_login);
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
    chartRef.current.getInstance().destroy();
    document
      .querySelector(".day-routine-wrapper")
      .removeChild(document.querySelector(".day-routine-wrapper > div"));
    setChartReRenderHelper([...chartReRenderHelper, 1]);
  };

  return (
    <>
      {addRoutineModalIsShown && (
        <Modal onClose={hideModalHandler}>
          <DayRoutineMaker onClose={hideModalHandler} />
        </Modal>
      )}
      {updateRoutineModalIsShown && (
        <Modal onClose={hideModalHandler}>
          <DayRoutineUpdater
            onClose={hideModalHandler}
            selectedJob={entireJobs[selectedJob]}
            selectedJobIndexInSeries={selectedJob}
          />
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
              <UpdateAndDeleteBtnWrapper>
                <OrangeButton onClick={showUpdateRountineHandler}>일정 변경</OrangeButton>
                <OrangeButton onClick={clickedRemoveButton}>일정 삭제</OrangeButton>
              </UpdateAndDeleteBtnWrapper>
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

const UpdateAndDeleteBtnWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: right;
`;

const MyRoutineWrapper = styled.div`
  width: 70%;
`;

const OrangeButton = styled.button`
  width: 7rem;
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
