import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function All({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('AllStats').getContext('2d');

      const backgroundColors = data.map(item => hexToRgba(item.PlayerColor, 0.5)); 
      const borderColors = data.map(item => hexToRgba(item.PlayerColor, 0.7)); 

      const labels = data.map(item => item.PlayerName);

      const datasets = [
        {
          label: 'First Place',
          data: data.map(item => item.FirstPlace),
        },
        {
          label: 'Second Place',
          data: data.map(item => item.SecondPlace),
        },
        {
          label: 'Third Place',
          data: data.map(item => item.ThirdPlace),
        },
        {
          label: 'Fourth Place',
          data: data.map(item => item.FourthPlace),
        },
        {
          label: 'Overtime Wins',
          data: data.map(item => item.OverTime),
        },
      ];

      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels, 
          datasets: datasets.map((dataset, index) => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 4,
          })),
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: backgroundColors, 
              },
              grid: { 
              },
            },
            y: {
              ticks: {
                
              },
              grid: {
                
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Everyone', 
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

  function setAlpha(color, alpha) {
    if (color && color.includes('rgba')) {
      const parts = color.split(',');
      parts[3] = alpha.toString() + ')';
      return parts.join(',');
    }
    return color;
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  return <canvas id="AllStats" width="400" height="400" />;
}

export default All;