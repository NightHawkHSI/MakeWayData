import React from 'react';

function Player({ player }) {
  return (
    <div className="player-card">
      <h3>{player.PlayerName}</h3>
      <p>First Place Wins: {player.FirstPlace}</p>
      <p>Player Color: {player.PlayerColor}</p>
    </div>
  );
}

export default Player;