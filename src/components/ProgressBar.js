import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, timeRemaining }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="timer">
        Time remaining: {timeRemaining}s
      </div>
    </div>
  );
};

export default ProgressBar;