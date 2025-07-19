import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const RecentTestCard = ({ 
  testType, 
  title, 
  score, 
  completedAt, 
  status, 
  duration,
  correctAnswers,
  totalQuestions 
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'not-started': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const handleViewResults = () => {
    navigate('/results-dashboard', { 
      state: { 
        testType, 
        title, 
        score, 
        correctAnswers, 
        totalQuestions 
      } 
    });
  };

  const handleRetakeTest = () => {
    navigate('/mock-test-interface', { 
      state: { 
        testType, 
        title, 
        duration, 
        totalQuestions,
        isRetake: true 
      } 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/20 hover:shadow-subtle transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-text-primary mb-1">
            {title}
          </h4>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Not Started'}
            </span>
            <span className="text-xs text-text-secondary">
              {completedAt}
            </span>
          </div>
        </div>
        {status === 'completed' && (
          <div className="text-right">
            <div className={`text-lg font-mono font-semibold ${getScoreColor(score)}`}>
              {score}%
            </div>
            <div className="text-xs text-text-secondary">
              {correctAnswers}/{totalQuestions}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {status === 'completed' && (
        <div className="mb-3">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                score >= 80 ? 'bg-success' : score >= 60 ? 'bg-warning' : 'bg-destructive'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {status === 'completed' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewResults}
            iconName="BarChart3"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            View Results
          </Button>
        )}
        <Button
          variant={status === 'completed' ? 'ghost' : 'default'}
          size="sm"
          onClick={handleRetakeTest}
          iconName={status === 'completed' ? 'RotateCcw' : 'Play'}
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          {status === 'completed' ? 'Retake' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default RecentTestCard;