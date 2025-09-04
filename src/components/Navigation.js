// components/Navigation.js
import React from 'react';

const Navigation = ({ 
  onPrevious, 
  onNext, 
  isPreviousDisabled, 
  isNextDisabled, 
  isLastQuestion 
}) => {
  return (
    <div className="navigation-container">
      <button 
        className="nav-button prev-button" 
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        Previous
      </button>
      
      <button 
        className="nav-button next-button" 
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {isLastQuestion ? 'Finish Quiz' : 'Next'}
      </button>
    </div>
  );
};

export default Navigation;