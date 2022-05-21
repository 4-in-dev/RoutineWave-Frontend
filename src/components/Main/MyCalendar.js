import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCookies } from "react-cookie";

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from "moment"
import styled from 'styled-components'

import { jobActions } from '../../store/job'
import { reqDayJob } from "../../lib/request-schedule";

const MyCalendar = () => {
  const dispatch = useDispatch()
  const [currCalendarDate, setCurrCalendarDate] = useState(new Date());
  const [cookies, setCookie, removeCookie] = useCookies(["is_login"]);

  const dateChangeHandler = async (value, event) => {
    const currDate = moment(value).format('YYYY-MM-DD');
    setCurrCalendarDate(value);
    dispatch(jobActions.setCurrDate(currDate));

    const jobData = await reqDayJob(currDate, cookies.is_login);
    dispatch(jobActions.loadAllJob(jobData));
  }

  return (
    <CalendarWrapper>
        <h1>CALENDAR</h1>
      <Calendar onChange={dateChangeHandler} value={currCalendarDate} />
    </CalendarWrapper>
  )
}

const CalendarWrapper = styled.div`
  width: 30%;
`

export default MyCalendar
