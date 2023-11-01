import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function SecondWins({ data, canvasId }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      // Create a mapping of player names to specific colors
      const playerColors = generatePlayerColors(data);
      const backgroundColors = playerColors.map(color => setAlpha(color, 0.5));
      const borderColors = playerColors.map(color => setAlpha(color, 0.7));

      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.PlayerName),
          datasets: [
            {
              label: 'Bars',
              data: data.map(item => item.FirstPlace),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 4,
              type: 'bar',
              hidden: false,
            },
            // Add other dataset configurations as needed
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: 'white', // Adjust the color here
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
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'white', // Adjust the color here
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      chartInstanceRef.current = newChart;
    }
  }, [data, canvasId]);

  function setAlpha(color, alpha) {
    if (color && color.includes('rgba')) {
      const parts = color.split(',');
      parts[3] = alpha.toString() + ')';
      return parts.join(',');
    }
    return color;
  }

  function generatePlayerColors(data) {
    const playerColorMapping = {
      'Chip': 'rgba(255, 0, 0, 1)',  // Red
      'Hunter': 'rgba(0, 255, 0, 1)',  // Green
      'Funk': 'rgba(255, 0, 255, 1)',  // Pink
      'Brady': 'rgba(0, 100, 255, 1)',  // LightBlue
      'Chase': 'rgba(255, 100, 0, 1)',  // Orange
    };

    return data.map(item => playerColorMapping[item.PlayerName] || 'rgba(0, 255, 255, 1)');
  }

  return <canvas id={canvasId} ref={chartRef}></canvas>;
}

export default SecondWins;