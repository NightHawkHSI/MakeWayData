import React, { useEffect, useRef } from 'react';
import Chart, { Legend } from 'chart.js/auto';

function FirstWins({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('Tester2').getContext('2d');

      // Create a mapping of player names to specific colors
      const playerColors = generatePlayerColors(data);
      const backgroundColors = playerColors.map(color => setAlpha(color, 0.5));
      const borderColors = playerColors.map(color => setAlpha(color, 0.7));

    
      chartRef.current = new Chart(ctx, {
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
            {
              label: 'Scatter',
              data: data.map(item => item.FirstPlace),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              type: 'scatter',
              borderWidth: 4,
              hidden: true,
            },
            {
              label: 'Line',
              data: data.map(item => item.FirstPlace),
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              type: 'line',
              borderWidth: 4,
              lineTension: 0.4, 
              hidden: true,
            },
            {
              label: 'Doughnut',
              data: data.map(item => item.FirstPlace),
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
                color: playerColors, 
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
              text: 'First Place Wins', 
              color: 'white', 
              font: {
                size: 16,
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

  return <canvas id="FirstPlace" width="400" height="400" />;
}

export default FirstWins;