import React from 'react';
import './PlayerCard.css';

const PlayerCard = ({ player }) => {
  if (!player) {
    return <div>Loading...</div>; // Handle loading state
  }
  const headerStyle = {
    backgroundColor: player.PlayerColor, // Set the background color to the player's color
  };
  return (
    <div className="player-card">
      <div className="card-header" style={headerStyle}>
        <img src="../Logo/fadein.gif" alt="Player Header Image" className="player-header-image" />
        <h3 className="player-name">{player.PlayerName}</h3>
        <p className="player-color">Player Color: {player.PlayerColor}</p>
      </div>
      <div className="card-body">
        <div className="stat">
          <p className="stat-label">1st Place Wins</p>
          <p className="stat-value">{player.FirstPlace}</p>
        </div>
        <div className="stat">
          <p className="stat-label">2nd Place Wins</p>
          <p className="stat-value">{player.SecondPlace}</p>
        </div>
        <div className="stat">
          <p className="stat-label">3rd Place Wins</p>
          <p className="stat-value">{player.ThirdPlace}</p>
        </div>
        <div className="stat">
          <p className="stat-label">4th Place Wins</p>
          <p className="stat-value">{player.FourthPlace}</p>
        </div>
        <div className="stat">
          <p className="stat-label">OT Wins</p>
          <p className="stat-value">{player.OTWins}</p>
        </div>
        <div className="stat">
          <p className="stat-label">OT Loss</p>
          <p className="stat-value">{player.OTLoss}</p>
        </div>
        <div className="stat">
          <p className="stat-label">OT Games</p>
          <p className="stat-value">{player.OTGames}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;