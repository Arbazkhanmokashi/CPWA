import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: black;
  padding: 20px;
  padding-bottom: 50px; /* Add bottom padding to create space between chart and footer */
  width: 100%;
  height: 100%;
`;

const ChartHeading = styled.h2`
  color: yellow;
  font-size: 24px; /* Increase font size */
  font-weight: bold; /* Make the font bold */
`;

function ShareMarketChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Share Market Performance',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            display: true,
            color: 'red', // Color for x-axis labels
          },
          y: {
            display: true,
            color: 'blue', // Color for y-axis labels
          }
        }
      }
    });
  }, []);

  return (
    <ChartContainer>
      <ChartHeading>Share Market Chart</ChartHeading>
      <canvas ref={chartRef} />
    </ChartContainer>
  );
}

export default ShareMarketChart;
