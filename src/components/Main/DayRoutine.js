import React, { useState, useEffect } from "react";

import { PieChart } from "@toast-ui/react-chart";

import "./DayRoutine.css";
import Modal from "../UI/Modal";
import DayRoutineMaker from './DayRoutineMaker'

let data = {
  categories: ["MyRoutine"],
  series: [
    {
      name: "수면",
      data: 8,
    },
    {
      name: "오전 공부",
      data: 4,
    },
    {
      name: "점심",
      data: 1.5,
    },
    {
      name: "오후 공부",
      data: 4,
    },
    {
      name: "저녁",
      data: 1.5,
    },
    {
      name: "운동",
      data: 1,
    },
    {
      name: "밤 공부",
      data: 4,
    },
  ],
};

const options = {
  chart: {
    width: 500,
    height: 500,
  },
  series: {
    dataLabels: {
      visible: true,
      pieSeriesName: {
        visible: true,
      },
      formatter: (data) => {
        const percentage = +data.split("%")[0];
        let hour = Number((24 * (percentage / 100)).toFixed(1));
        if (hour - hour.toFixed(0) === 0) hour = hour.toFixed(0);
        return `${hour} Hours`;
      },
    },
    angleRange: {
      start: -15,
      end: 345,
    },
    // selectable: true
  },
  exportMenu: {
    visible: false,
  },
  legend: {
    visible: false,
  },
  theme: {
    series: {
      hover: {
        lineWidth: 1,
      },
    },
  },
};

const DayRoutine = () => {
  const [hourText, setHourText] = useState([]);
  const [addRoutineModalIsShown, setAddRoutineModalIsShown] = useState(false);

  useEffect(() => {
    const numArr = Array.from({ length: 24 }, (v, i) => i + 1);
    setHourText(numArr);
  }, []);

  const showAddRountineHandler = () => {
    setAddRoutineModalIsShown(true);
  };
  const hideAddRountineHandler = () => {
    setAddRoutineModalIsShown(false);
  };

  return (
    <>
      {addRoutineModalIsShown && <Modal onClose={hideAddRountineHandler}><DayRoutineMaker /></Modal>}
      <h1>MY ROUTINE</h1>
      <div className="day-routine-container">
        <div className="add-btn-wrapper">
          <button onClick={showAddRountineHandler}>일과 추가</button>
        </div>
        <div className="day-routine-wrapper">
          <PieChart data={data} options={options} />
          {hourText.map((hour) => (
            <p key={hour}>{hour}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default DayRoutine;
