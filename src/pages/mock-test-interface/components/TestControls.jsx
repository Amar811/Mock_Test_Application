import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TestControls = ({ 
  currentQuestion = 1,
  totalQuestions = 50,
  onPrevious,
  onNext,
  onMarkForReview,
  onClearAnswer,
  onSubmitTest,
  hasAnswer = false,
  isMarkedForReview = false,
  showSubmit = false
}) => {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="bg-surface border-t border-border">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Controls */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={isFirstQuestion}
              iconName="ChevronLeft"
              iconPosition="left"
              iconSize={16}
            >
              Previous
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAnswer}
              disabled={!hasAnswer}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Clear Answer
            </Button>
          </div>

          {/* Center Info */}
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="HelpCircle" size={16} />
              <span>Question {currentQuestion} of {totalQuestions}</span>
            </div>
            {hasAnswer && (
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={14} />
                <span className="text-xs">Answered</span>
              </div>
            )}
            {isMarkedForReview && (
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="Flag" size={14} />
                <span className="text-xs">Marked</span>
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkForReview}
              iconName="Flag"
              iconPosition="left"
              iconSize={16}
              className={isMarkedForReview ? 'text-warning' : ''}
            >
              {isMarkedForReview ? 'Unmark' : 'Mark for Review'}
            </Button>

            {showSubmit ? (
              <Button
                variant="default"
                size="sm"
                onClick={onSubmitTest}
                iconName="Send"
                iconPosition="left"
                iconSize={16}
                className="bg-accent hover:bg-accent/90"
              >
                Submit Test
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={onNext}
                disabled={isLastQuestion}
                iconName="ChevronRight"
                iconPosition="right"
                iconSize={16}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="sm:hidden space-y-3">
          {/* Top Row - Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={isFirstQuestion}
              iconName="ChevronLeft"
              iconSize={16}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>{currentQuestion} / {totalQuestions}</span>
              {hasAnswer && (
                <Icon name="CheckCircle" size={16} className="text-success" />
              )}
              {isMarkedForReview && (
                <Icon name="Flag" size={16} className="text-warning" />
              )}
            </div>

            {showSubmit ? (
              <Button
                variant="default"
                size="sm"
                onClick={onSubmitTest}
                iconName="Send"
                iconSize={16}
                className="bg-accent hover:bg-accent/90"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={onNext}
                disabled={isLastQuestion}
                iconName="ChevronRight"
                iconSize={16}
              >
                Next
              </Button>
            )}
          </div>

          {/* Bottom Row - Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={onClearAnswer}
              disabled={!hasAnswer}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Clear Answer
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={onMarkForReview}
              iconName="Flag"
              iconPosition="left"
              iconSize={16}
              className={isMarkedForReview ? 'text-warning' : ''}
            >
              {isMarkedForReview ? 'Unmark' : 'Mark'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestControls;