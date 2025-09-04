import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveHighScore, getHighScores } from '../utils/storage';
import './ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions, score } = location.state || {};
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    if (questions && score !== undefined) {
      const savedScores = saveHighScore(score, questions.length);
      setHighScores(savedScores);
    }
  }, [questions, score]);

  const handleRestartQuiz = () => {
    navigate('/quiz');
  };

  if (!questions || !answers) {
    return <div className="no-results">No results found. Please take the quiz first.</div>;
  }

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      
      <div className="score-summary">
        <h3>You scored {score} out of {questions.length}</h3>
        <p className="score-percentage">
          {Math.round((score / questions.length) * 100)}%
        </p>
      </div>
      
      {highScores.length > 0 && (
        <div className="high-scores">
          <h3>High Scores</h3>
          <ul>
            {highScores.map((highScore, index) => (
              <li key={index}>
                {highScore.percentage}% ({highScore.score}/{highScore.totalQuestions}) - {new Date(highScore.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="answers-review">
        <h3>Review your answers:</h3>
        
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          
          return (
            <div key={index} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
              <h4>Question {index + 1}: {question.question}</h4>
              
              <div className="answer-comparison">
                <div className="answer-row">
                  <span className="answer-label">Your answer:</span>
                  <span className={`answer-value ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {userAnswer || 'Not answered'}
                  </span>
                </div>
                
                {!isCorrect && (
                  <div className="answer-row">
                    <span className="answer-label">Correct answer:</span>
                    <span className="answer-value correct">{question.correctAnswer}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <button onClick={handleRestartQuiz} className="restart-btn">
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultsPage;