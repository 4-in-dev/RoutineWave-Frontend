import React, {useRef} from 'react';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import { RadarChart } from "@toast-ui/react-chart";

function Radar() {
  const data = {
    categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
    series: [
      {
        name: 'My Radar',
        data: [5000, 3000, 5000, 7000, 6000, 4000], //백엔드에서 넘겨받는 값
      },
    ],
  };

  const options = {
    chart: {
      width: 1160,
      height: 650,
      title: 'My Radar',
    },
    yAxis: {
      title: '능력치',
    },
    xAxis: {
      title: '기간',
    },
    series: {
    zoomable: true,
      dataLabels : {
        visible: false
      }
    }
  };

  const containerStyle = {
    width: '600px',
    height: '600px',
  };



  let chartRef = useRef(null);
  return (
    <div className="radar">
      <RadarChart ref={chartRef} data={data} options={options} style={containerStyle}/>
    </div>
  );
}



export default Radar;
