import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function FourthWins({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('FourthPlace').getContext('2d');

      const backgroundColors = data.map(item => hexToRgba(item.PlayerColor, 0.5)); 
      const borderColors = data.map(item => hexToRgba(item.PlayerColor, 0.7)); 

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.PlayerName),
          datasets: [
            {
              label: 'Bars',
              data: data.map(item => item.FourthPlace),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 4,
              type: 'bar',
              hidden: false,
            },
            {
              label: 'Scatter',
              data: data.map(item => item.FourthPlace),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              type: 'scatter',
              borderWidth: 4,
              hidden: true,
            },
            {
              label: 'Line',
              data: data.map(item => item.FourthPlace),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              type: 'line',
              borderWidth: 4,
              lineTension: 0.4,
              hidden: true,
            },
            {
              label: 'Doughnut',
              data: data.map(item => item.FourthPlace),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              type: 'doughnut',
              borderWidth: 4,
              hidden: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: backgroundColors,
              },
              grid: {
                color: 'white',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
              grid: {
                color: 'white',
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Fourth Place Wins',
              color: 'white',
              font: {
                size: 16,
              },
            },
            legend: {
              display: true,
              labels: {
                color: 'white', 
              },
            },         
          },
        },
      });
    }
  }, [data]);

  function hexToRgba(hex, alpha) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return <canvas id="FourthPlace" width="400" height="400" />;
}

export default FourthWins;