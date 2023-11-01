import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function OTClutch({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('OTClutch').getContext('2d');

      const otWinsPercentages = data.map((item) => {
        const otWins = item.OTWins;
        const otGames = item.OTGames;
        const totalGames = otWins + item.OTLoss;
        return totalGames > 0 ? (otWins / totalGames) * 100 : 0; 
      });

      const otLossPercentages = data.map((item) => {
        const otLoss = item.OTLoss;
        const otGames = item.OTGames;
        const totalGames = item.OTWins + otLoss;
        return totalGames > 0 ? (otLoss / totalGames) * 100 : 0;
      });

      const backgroundColors = data.map((item) => hexToRgba(item.PlayerColor, 0.5));
      const borderColors = data.map((item) => hexToRgba(item.PlayerColor, 0.7));

      chartRef.current = new Chart(ctx, {
        type: 'bar', // Change the chart type to 'bar'
        data: {
          labels: data.map((item) => item.PlayerName),
          datasets: [
            {
              label: 'OTWins Percentage',
              data: otWinsPercentages,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 4,
              hidden: false,
            },
            {
              label: 'OTLoss Percentage',
              data: otLossPercentages,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 4,
              hidden: true,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'OTWins and OTLoss Percentages',
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
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toFixed(2) + '%';
                },
              },
            },
          },
        },
      });
    }
  }, [data]);

  function hexToRgba(hex, alpha) {
    hex = hex.replace(/^#/, ''); // Corrected line
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return <canvas id="OTClutch" width="400" height="400" />;
}

export default OTClutch;