import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function OverAll({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('PointsPerGame').getContext('2d');

      
      const averagePointsPerGame = data.map((item) => {
        const totalPoints = item.FirstPlace * 4 + item.SecondPlace * 3 + item.ThirdPlace * 2;
        const gamesPlayed = item.GamesPlayed; 
        return gamesPlayed ? totalPoints / gamesPlayed : 0; 
      });

      const backgroundColors = data.map((item) => hexToRgba(item.PlayerColor, 0.5)); 
      const borderColors = data.map((item) => hexToRgba(item.PlayerColor, 0.7)); 

      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map((item) => item.PlayerName),
          datasets: [
            {
              label: 'Average Points Per Game',
              data: averagePointsPerGame,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 4,
              type: 'pie', 
              hidden: false,
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
              text: 'Average Points Per Game',
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

  return <canvas id="PointsPerGame" width="400" height="400" />;
}

export default OverAll;