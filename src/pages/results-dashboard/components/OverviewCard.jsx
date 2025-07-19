import React from 'react';
import Icon from '../../../components/AppIcon';

const OverviewCard = ({ testResults }) => {
  if (!testResults) return null; // 🔥 Prevent rendering until data is available

  const getPerformanceRating = (percentage) => {
    if (percentage >= 90) return { label: 'Excellent', color: 'text-success', bgColor: 'bg-success/10' };
    if (percentage >= 80) return { label: 'Very Good', color: 'text-success', bgColor: 'bg-success/10' };
    if (percentage >= 70) return { label: 'Good', color: 'text-warning', bgColor: 'bg-warning/10' };
    if (percentage >= 60) return { label: 'Average', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { label: 'Needs Improvement', color: 'text-destructive', bgColor: 'bg-destructive/10' };
  };

  const rating = getPerformanceRating(testResults.percentage);
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Test Results
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {testResults.testName} - Completed on {testResults.completedDate}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full ${rating.bgColor}`}>
          <span className={`text-sm font-medium ${rating.color}`}>
            {rating.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {testResults.score}
          </div>
          <div className="text-xs text-text-secondary mt-1">Score</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-mono font-bold text-primary">
            {testResults.percentage}%
          </div>
          <div className="text-xs text-text-secondary mt-1">Accuracy</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {testResults.timeTaken}
          </div>
          <div className="text-xs text-text-secondary mt-1">Time Taken</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {testResults.totalQuestions}
          </div>
          <div className="text-xs text-text-secondary mt-1">Questions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} color="white" />
          </div>
          <div>
            <div className="text-lg font-mono font-semibold text-success">
              {testResults.correctAnswers}
            </div>
            <div className="text-xs text-text-secondary">Correct</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-destructive/10 rounded-lg">
          <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
            <Icon name="X" size={16} color="white" />
          </div>
          <div>
            <div className="text-lg font-mono font-semibold text-destructive">
              {testResults.incorrectAnswers}
            </div>
            <div className="text-xs text-text-secondary">Incorrect</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <div className="w-8 h-8 bg-muted-foreground rounded-full flex items-center justify-center">
            <Icon name="Minus" size={16} color="white" />
          </div>
          <div>
            <div className="text-lg font-mono font-semibold text-text-primary">
              {testResults.unanswered}
            </div>
            <div className="text-xs text-text-secondary">Unanswered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;