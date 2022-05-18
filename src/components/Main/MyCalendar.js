import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from "moment"
import styled from 'styled-components'

import { jobActions } from '../../store/job'

const MyCalendar = () => {
  const dispatch = useDispatch()
  const [currDate, setCurrDate] = useState(new Date());

  const dateChangeHandler = (value, event) => {
    setCurrDate(value);
    dispatch(jobActions.setCurrDate(moment(value).format('YYYY-MM-DD')));
  }

  return (
    <CalendarWrapper>
        <h1>CALENDAR</h1>
      <Calendar onChange={dateChangeHandler} value={currDate} />
    </CalendarWrapper>
  )
}

const CalendarWrapper = styled.div`
  width: 30%;
`

export default MyCalendar
