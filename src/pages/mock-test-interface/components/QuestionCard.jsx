import React from 'react';

import Icon from '../../../components/AppIcon';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showFeedback = false,
  isReviewMode = false 
}) => {
  const getOptionStyle = (optionKey) => {
    if (!showFeedback) {
      return selectedAnswer === optionKey 
        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-primary/5';
    }

    // Show feedback mode
    const isSelected = selectedAnswer === optionKey;
    const isCorrect = optionKey === question.correctAnswer;
    
    if (isCorrect) {
      return 'border-success bg-success/10 text-success';
    } else if (isSelected && !isCorrect) {
      return 'border-destructive bg-destructive/10 text-destructive';
    } else {
      return 'border-border bg-muted/50 text-muted-foreground';
    }
  };

  const getOptionIcon = (optionKey) => {
    if (!showFeedback) {
      return selectedAnswer === optionKey ? 'CheckCircle' : 'Circle';
    }

    const isCorrect = optionKey === question.correctAnswer;
    const isSelected = selectedAnswer === optionKey;
    
    if (isCorrect) {
      return 'CheckCircle';
    } else if (isSelected && !isCorrect) {
      return 'XCircle';
    } else {
      return 'Circle';
    }
  };

  const getOptionIconColor = (optionKey) => {
    if (!showFeedback) {
      return selectedAnswer === optionKey ? 'var(--color-primary)' : 'var(--color-muted-foreground)';
    }

    const isCorrect = optionKey === question.correctAnswer;
    const isSelected = selectedAnswer === optionKey;
    
    if (isCorrect) {
      return 'var(--color-success)';
    } else if (isSelected && !isCorrect) {
      return 'var(--color-destructive)';
    } else {
      return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-subtle">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
            <span className="text-sm font-mono font-semibold text-primary">
              {question.id}
            </span>
          </div>
          <div>
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
              {question.category}
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-text-secondary">
                Difficulty: {question.difficulty}
              </span>
              <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
              <span className="text-xs text-text-secondary">
                {question.marks} marks
              </span>
            </div>
          </div>
        </div>
        
        {showFeedback && (
          <div className="flex items-center space-x-2">
            {selectedAnswer === question.correctAnswer ? (
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-xs font-medium">Correct</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-destructive">
                <Icon name="XCircle" size={16} />
                <span className="text-xs font-medium">Incorrect</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-text-primary leading-relaxed">
          {question.text}
        </h3>
        {question.description && (
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            {question.description}
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => !isReviewMode && onAnswerSelect(key)}
            disabled={isReviewMode}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all duration-200
              ${getOptionStyle(key)}
              ${isReviewMode ? 'cursor-default' : 'cursor-pointer'}
              focus:outline-none focus:ring-2 focus:ring-primary/20
            `}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={getOptionIcon(key)} 
                size={20} 
                color={getOptionIconColor(key)}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {key.toUpperCase()}.
                  </span>
                  <span className="text-sm">
                    {value}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Explanation (shown in review mode) */}
      {showFeedback && question.explanation && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">
                Explanation
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;