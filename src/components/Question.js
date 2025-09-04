import React from 'react';
import './Question.css';

const Question = ({ question, selectedAnswer, onAnswerSelect, questionNumber, totalQuestions }) => {
  return (
    <div className="question-container">
      <div className="question-header">
        <h2>Question {questionNumber} of {totalQuestions}</h2>
        <p className="difficulty">Difficulty: {question.difficulty}</p>
      </div>
      
      <div className="question-text">
        <h3>{question.question}</h3>
      </div>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <div 
            key={index} 
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(option)}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;