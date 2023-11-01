import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parse } from 'papaparse';
import BlankSlot from './Com/BlankSlot';
import Logo from './Com/Logo';
import './App.css';

function App() {
const [data, setData] = useState([]);
const [namedUsersData, setNamedUsersData] = useState([]);

  const [refreshTime, setRefreshTime] = useState(120);

  const fetchData = () => {

    //Chippers URL
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZ88nEq5vzLNdVE68AR5kMzS5HveQgQUxXF9rNX-9yhmv2jf2Bohwja3j-vDzUcGbO2ziCZ-Mv3v4J/pub?gid=1125870162&single=true&output=csv';
    //My URL
    //const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlxbP9LCC2H8GtdoElld1Xz2lHaqYOt58F6YMuW__2hA-Rv_Id793xuIWz-RqBUWBR5lSjelbYdDc-/pub?output=csv';
    //const sheetUrl = 'Link-To-Uploaded-CVS-Sheet';

    axios.get(sheetUrl)
      .then((response) => {
        const parsedData = parse(response.data, { header: true });
        setData(parsedData.data);
        setRefreshTime(120); 
      })
      .catch((error) => {
        console.error(error);
      });
  };



  
  useEffect(() => {
    fetchData();  

    const intervalId = setInterval(() => {
      fetchData();
    }, 120000); // 2 minute

  
    const timerInterval = setInterval(() => {
      setRefreshTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className='title-Box'>
        <div className="title-bar">
          <div className="logo">
            <Logo /> 
          </div>
          <div className="title">
            <h1>Make Way Stat's</h1>
          </div>
          <div className="author">
            <p>Made by DiccChops</p>       
          </div>
          <div className='timer'>
            <p>Time until refresh: {refreshTime} seconds</p>
          </div>
        </div>

  <div className="pageHollder">
    <div className="CenterCharts">
        <div className="chart-grid">
          <div className="chart-row">
            
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas1" chartType="firstPlaceWins" />
            </div>
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas2" chartType="secondPlaceWins" />
            </div>
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas3" chartType="thirdPlaceWins" />
            </div>
          </div>

          <div className="chart-row">
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas4" chartType="fourthPlaceWins" />
            </div>
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas5" chartType="overtimeWins" />
            </div>
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas6" chartType="OTClutch" />
            </div>
          </div>

          <div className="chart-row">
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas7" chartType="PointsPerGame" />
            </div>
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas8" chartType="TotalPoints" />
            </div>
            <div className="chart">
              <BlankSlot data={data} canvasId="canvas9" chartType="everybodysStats" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;