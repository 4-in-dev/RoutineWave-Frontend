import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import styled from "styled-components";
import "./MyCalendar.css";

import { jobActions } from "../../store/job";
import { reqDayJob } from "../../lib/request-schedule";

const MyCalendar = () => {
  const dispatch = useDispatch();
  const [currCalendarDate, setCurrCalendarDate] = useState(new Date());
  const [cookies, setCookie, removeCookie] = useCookies(["is_login"]);
  const jobsOfMonth = useSelector((state) => state.job.jobsOfMonth);

  const dateChangeHandler = async (value, event) => {
    const currDate = moment(value).format("YYYY-MM-DD");
    setCurrCalendarDate(value);
    dispatch(jobActions.setCurrDate(currDate));

    const jobData = await reqDayJob(currDate, cookies.is_login);
    dispatch(jobActions.loadAllJob(jobData));
  };

  return (
    <CalendarWrapper>
      <h1>CALENDAR</h1>
      <Calendar
        onChange={dateChangeHandler}
        value={currCalendarDate}
        tileContent={({ date, view }) => {
          if (jobsOfMonth.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <>
                <div className="absoluteDiv">
                  <Dot />
                </div>
              </>
            );
          }
        }}
      />
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  width: 30%;
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
`;


export default MyCalendar;
