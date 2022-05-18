import React from 'react'

import DayRoutine from '../../components/Main/DayRoutine'
import MyCalendar from '../../components/Main/MyCalendar'

import styled from 'styled-components'

const MainPage = () => {
  return (
    <RoutineWrapper>
      <DayRoutine />
      <MyCalendar />
    </RoutineWrapper>
  )
}

const RoutineWrapper = styled.div`
  display: flex;
  flex-direciton: row;
`

export default MainPage
