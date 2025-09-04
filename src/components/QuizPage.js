import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import ProgressBar from './ProgressBar';
import questionsData from '../questions.json';
import './QuizPage.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timePerQuestion] = useState(30);
  const [timeRemaining, setTimeRemaining] = useState(timePerQuestion);
  const navigate = useNavigate();

  useEffect(() => {
    // Load questions from JSON file
    setQuestions(questionsData.questions);
  }, []);

  useEffect(() => {
    // Timer for each question
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Time's up, move to next question
      handleNextQuestion();
    }
  }, [timeRemaining]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  // यहाँ calculateScore function add करें
  const calculateScore = () => {
    let calculatedScore = 0;
    console.log("Calculating score...");
    
    questions.forEach((question, index) => {
      console.log(`Question ${index + 1}:`);
      console.log("Correct answer:", question.correctAnswer);
      console.log("User answer:", answers[index]);
      
      // Trim whitespace and convert to same case for accurate comparison
      const userAnswer = answers[index] ? answers[index].toString().trim().toLowerCase() : '';
      const correctAnswer = question.correctAnswer.toString().trim().toLowerCase();
      
      console.log("Match:", userAnswer === correctAnswer);
      
      if (userAnswer === correctAnswer) {
        calculatedScore += 1;
      }
    });
    
    console.log("Final score:", calculatedScore);
    setScore(calculatedScore);
    return calculatedScore;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(timePerQuestion);
    } else {
      const finalScore = calculateScore(); // Calculate score
      navigate('/results', { 
        state: { 
          answers, 
          questions,
          score: finalScore // Pass the calculated score
        } 
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeRemaining(timePerQuestion);
    }
  };

  if (questions.length === 0) {
    return <div className="loading">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <ProgressBar progress={progress} timeRemaining={timeRemaining} />
      
      <Question
        question={currentQuestion}
        selectedAnswer={answers[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      
      <div className="navigation-buttons">
        <button 
          onClick={handlePreviousQuestion} 
          disabled={currentQuestionIndex === 0}
          className="nav-btn prev-btn"
        >
          Previous
        </button>
        
        <button 
          onClick={handleNextQuestion} 
          disabled={!answers[currentQuestionIndex]}
          className="nav-btn next-btn"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;