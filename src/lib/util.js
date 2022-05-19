export const getHHmmFormat = (time) => {
  return `${time.slice(0, 2)}:${time.slice(-2)}`;
};

export const removeElementFromArray = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

export const jobToDayRoutine = (jobs) => {
  const series = [];
  let totalTime = 0;
  
  if (jobs.length !== 0) {
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
  }
  return series;
};