export const getHighScores = () => {
  try {
    const scores = localStorage.getItem('quizHighScores');
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error retrieving high scores:', error);
    return [];
  }
};

export const saveHighScore = (score, totalQuestions) => {
  try {
    const highScores = getHighScores();
    const newScore = {
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      date: new Date().toISOString()
    };
    
    highScores.push(newScore);
    highScores.sort((a, b) => b.percentage - a.percentage);
    
    // Keep only top 10 scores
    const topScores = highScores.slice(0, 10);
    
    localStorage.setItem('quizHighScores', JSON.stringify(topScores));
    return topScores;
  } catch (error) {
    console.error('Error saving high score:', error);
    return [];
  }
};