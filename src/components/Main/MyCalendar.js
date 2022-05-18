import React from 'react'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'

const MyCalendar = () => {
  return (
    <CalendarWrapper>
        <h1>CALENDAR</h1>
      <Calendar />
    </CalendarWrapper>
  )
}

const CalendarWrapper = styled.div`
  width: 30%;
`

export default MyCalendar
