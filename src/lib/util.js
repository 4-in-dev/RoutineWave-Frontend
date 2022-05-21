import moment from "moment";
import * as CONSTANT from '../lib/constants'

export const getHHmmFormat = (time) => {
  return `${time.slice(0, 2)}:${time.slice(-2)}`;
};

export const removeElementFromArray = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

export const updateElementFromArray = (arr, selectedJob) => {
  arr[selectedJob.seriesId][CONSTANT.INDEX_OF_CONTENT] = selectedJob.data.content;
  arr[selectedJob.seriesId][CONSTANT.INDEX_OF_STARTTIME] = selectedJob.data.start_time.split(':').splice(0,2).join('');
  arr[selectedJob.seriesId][CONSTANT.INDEX_OF_IS_FINISH] = selectedJob.data.is_finished;

  return arr;
};

export const jobToDayRoutine = (jobs) => {
  const series = [];
  let totalTime = 0;
  
  jobs = jobs.sort((a, b) => {
    return a[CONSTANT.INDEX_OF_STARTTIME] - b[CONSTANT.INDEX_OF_STARTTIME];
  }
  );
  if (jobs.length !== 0) {
    if (jobs.length > 1) {
      for (let i = 0; i < jobs.length - 1; i++) {
        let timeGap = jobs[i + 1][CONSTANT.INDEX_OF_STARTTIME] - jobs[i][CONSTANT.INDEX_OF_STARTTIME];
        let periodTime = Math.floor(timeGap / 100) + (timeGap % 100 > 0 ? 0.5 : 0);

        series.push({ name: jobs[i][CONSTANT.INDEX_OF_CONTENT], data: periodTime });
        totalTime += periodTime;
      }
      series.push({ name: jobs[jobs.length - 1][CONSTANT.INDEX_OF_CONTENT], data: 24 - totalTime });
    } else {
      series.push({ name: jobs[0][CONSTANT.INDEX_OF_CONTENT], data: jobs[0][CONSTANT.INDEX_OF_STARTTIME] });
    }
  }
  return series;
};

export const loadJobServer2Chart = (allJob) => {
  return allJob.map(job => {
    let content = job.content;
    let startTime = job.start_time.split(":").splice(0, 2).join("");
    let id = job.id;
    let isFinished = job.is_finished;
    return [content, Number(startTime), id, isFinished];
  })
}