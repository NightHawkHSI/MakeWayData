import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

function SecondWins({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Extract data from A3 to G10
      const startRow = 2; // A3 corresponds to the third row (0-based index)
      const endRow = 9;   // G10 corresponds to the tenth row (0-based index)
      const extractedData = data.slice(startRow, endRow + 1); // Add 1 to endRow for inclusive slicing

      const ctx = document.getElementById('SecondWins').getContext('2d');
      const playerColors = generatePlayerColors(extractedData);

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: extractedData.map(item => item[0]), // Assuming PlayerName is in the first column
          datasets: [
            {
              label: 'OverTime Wins',
              data: extractedData.map(item => item[6]), // Assuming OTWins is in the seventh column (0-based index)
              backgroundColor: playerColors,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                color: 'white', // Set x-axis grid lines color to white
              },
            },
            y: {
              grid: {
                color: 'white', // Set y-axis grid lines color to white
              },
            },
          },
        },
      });
    }
  }, [data]);

  function generatePlayerColors(extractedData) {
    const playerColorMapping = {
      'Chip': 'rgba(255, 0, 0, 1)', 
      'Hunter': 'rgba(0, 255, 0, 1)', 
      'Funk': 'rgba(0, 0, 255, 1)',  
      'Brady': 'rgba(0, 100, 255, 1)', 
      'Chase': 'rgba(255, 100, 0, 1)',
    };

    return extractedData.map(item => playerColorMapping[item[0]]);
  }

  return <canvas id="SecondWins" width="400" height="400" />;
}

export default SecondWins;




