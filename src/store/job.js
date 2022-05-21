import { createSlice } from "@reduxjs/toolkit";

import moment from "moment";
import { removeElementFromArray, updateElementFromArray, jobToDayRoutine } from "../lib/util";

const addAndGetSeries = (state, action) => {
  const registeredJob = action.payload;

  const content = registeredJob.content;
  const startTime = registeredJob.start_time.split(':').splice(0,2).join('');
  const id = registeredJob.id;
  const isFinished = registeredJob.is_finished;
  
  let jobs = [...state.jobs, [content, Number(startTime), id, isFinished]];
  state.jobs = jobs;

  return jobToDayRoutine(jobs);
};

const getStartEndAngle = (state) => {
  if (state.jobs.length === 0) return;
  
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
      state.series = addAndGetSeries(state, action);
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
    },
    removeJob(state, action) {
      state.jobs = removeElementFromArray(state.jobs, action.payload);
      state.series = jobToDayRoutine(state.jobs);
      state.angleRange = getStartEndAngle(state);
    },
    updateJob(state, action) {
      state.jobs = updateElementFromArray(state.jobs, action.payload);
      state.series = jobToDayRoutine(state.jobs);
      state.angleRange = getStartEndAngle(state);
    },
  },
});

export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
