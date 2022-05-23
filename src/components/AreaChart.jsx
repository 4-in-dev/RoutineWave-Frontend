// import React from 'react';
// import Chart from '@toast-ui/chart';
//
// import AreaChart from '@toast-ui/chart/area';
// import '@toast-ui/chart/dist/toastui-chart.min.css';
//
//
// import { useRef } from 'react';
//
//
// const el = document.getElementById('chart');
// const data = {
//   categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   series: [
//     {
//       name: 'Budget',
//       data: [5000, 3000, 5000, 7000, 6000, 4000, 1000],
//     },
//     {
//       name: 'Income',
//       data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
//     },
//   ],
// };
// const options = {
//   chart: { width: 700, height: 400 },
// };
//
// const chart = Chart.AreaChart({ el, data, options });
//
// function MyComponent() {
//   const chartRef = useRef(null);
//
//   const handleClickButton = () => {
//     console.log('type:', chartRef.current.getInstance().showSeriesDataLabel());
//   };
//
//   return (
//     <>
//       <AreaChart ref={chartRef} data={data} options={options} />
//       <button onClick={handleClickButton}>showSeriesDataLabel</button>
//     </>
//   );
// }
//
//
//
//
//
// function Area() {
//   return (
//     <div id="main">
//
//     </div>
//   );
// }
//
// export default Area;
