import { createSlice } from "@reduxjs/toolkit";

import moment from "moment";

const jobToDayRoutine = (state, action) => {
  const { content, startTime } = action.payload;

  let jobs = [...state.jobs, [content, Number(startTime)]];
  jobs = jobs.sort((a, b) => {
    return a[1] - b[1];
  });

  const series = [];
  let totalTime = 0;
  if (jobs.length > 1) {
    for (let i = 0; i < jobs.length - 1; i++) {
      let timeGap = jobs[i + 1][1] - jobs[i][1];
      let periodTime = Math.floor(timeGap / 100) + (timeGap % 100 > 0 ? 0.5 : 0);

      series.push({ name: jobs[i][0], data: periodTime });
      totalTime += periodTime;
    }
    series.push({ name: jobs[jobs.length - 1][0], data: 24 - totalTime });
  } else {
    series.push({ name: jobs[0][0], data: jobs[0][1] });
  }

  state.jobs = jobs;
  return series;
};

const getStartEndAngle = (state) => {
  const startTime = state.jobs[0][1];
  const startAngle = Math.floor(startTime / 100) + (startTime % 100 > 0 ? 0.5 : 0);

  return {
    start: 15 * startAngle,
    end: 360 + 15 * startAngle,
  };
};

const initialJobState = {
  currItem: {
    id: 0,
    data: {
      content: "",
      isFinish: false,
      startTime: moment().format("HH:mm"),
      endTime: moment().format("HH:mm"),
    },
  },
  series: [],
  jobs: [],
  angleRange: { start: 0, end: 360 },
  date: moment().format("YYYY-MM-DD"),
};

const jobSlice = createSlice({
  name: "job",
  initialState: initialJobState,
  reducers: {
    addJob(state, action) {
      state.series = jobToDayRoutine(state, action);
      state.angleRange = getStartEndAngle(state);
    },
    setContent(state, action) {
      state.currItem.data.content = action.payload;
    },
    setStartTime(state, action) {
      state.currItem.data.startTime = action.payload;
    },
    setEndTime(state, action) {
      state.currItem.data.endTime = action.payload;
    },
    setIsFinished(state, action) {
      state.currItem.data.isFinish = action.payload;
    },
    setCurrDate(state, action) {
      state.date = action.payload;
    }
  },
});

export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
