import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Initialize Chart
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, index) => `${index + 1}`),
        datasets: [
          {
            label: 'Chart Data',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
    });

    return () => {
      // Cleanup on component unmount
      myChart.destroy();
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default ChartComponent;
