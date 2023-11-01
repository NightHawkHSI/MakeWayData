import React from 'react';
import FirstWins from './FirstWins';
import SecondWins from './SecondWins';
import ThirdWins from './ThirdWins';
import FourthWins from './FourthWins';
import OvertimeWins from './OTWinsChart';
import All from './AllPie';
import OverAll from './OverAllBest';
import TotalPoints from './TotalPoints';
import OTClutchPer from './OTClutch';



function BlankSlot({ data, chartType }) {
  const renderChart = () => {
    switch (chartType) {
      case 'firstPlaceWins':
        return <FirstWins data={data} />;
      case 'secondPlaceWins':
        return <SecondWins data={data} />;
      case 'thirdPlaceWins':
        return <ThirdWins data={data} />;
      case 'fourthPlaceWins':
        return <FourthWins data={data} />;
      case 'overtimeWins':
        return <OvertimeWins data={data} />;
      case 'everybodysStats':
        return <All data={data} />;
      case 'PointsPerGame':
        return <OverAll data={data} />;
      case 'TotalPoints':
          return <TotalPoints data={data} />;
      case 'OTClutch':
          return <OTClutchPer data={data} />;

      default:
        return <p>Blank Area</p>;
    }
  };

  return (
    <div className="blank-slot">
      {renderChart()}
    </div>
  );
}

export default BlankSlot;