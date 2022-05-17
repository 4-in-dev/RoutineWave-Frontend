export const getSeriesData = (myRountineSeries) => {
  return {
    categories: ["MyRoutine"],
    series: myRountineSeries,
  };
};

export const getRoutineTableOptions = (angleRange) => {
  return {
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
      angleRange: angleRange
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
    }
  };
};
