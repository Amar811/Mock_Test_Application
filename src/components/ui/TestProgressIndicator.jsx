import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const TestProgressIndicator = ({ 
  currentQuestion = 1, 
  totalQuestions = 50, 
  answeredQuestions = 12,
  markedQuestions = 3,
  timeRemaining = "45:30",
  onQuestionSelect,
  onSubmitTest 
}) => {
  const location = useLocation();
  const isTestingMode = location.pathname === '/mock-test-interface';

  if (!isTestingMode) return null;

  const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
  const unansweredCount = totalQuestions - answeredQuestions - markedQuestions;

  const handleQuestionClick = (questionNumber) => {
    if (onQuestionSelect) {
      onQuestionSelect(questionNumber);
    }
  };

  const handleSubmit = () => {
    if (onSubmitTest) {
      onSubmitTest();
    }
  };

  return (
    <>
      {/* Mobile Progress Bar */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-surface border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-text-primary">
                Question {currentQuestion} of {totalQuestions}
              </span>
              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                <Icon name="Clock" size={14} />
                <span className="font-mono">{timeRemaining}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="xs"
              onClick={handleSubmit}
              iconName="Send"
              iconPosition="left"
              iconSize={14}
            >
              Submit
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-text-secondary">Answered: {answeredQuestions}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-text-secondary">Marked: {markedQuestions}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span className="text-text-secondary">Remaining: {unansweredCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Panel */}
      <div className="hidden lg:block fixed right-0 top-16 bottom-0 w-80 bg-surface border-l border-border shadow-subtle z-40">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Test Progress
              </h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span className="font-mono text-lg font-medium text-text-primary">
                  {timeRemaining}
                </span>
              </div>
            </div>
            
            {/* Progress Overview */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Progress</span>
                <span className="font-medium text-text-primary">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              
              {/* Status Summary */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <div className="text-lg font-mono font-semibold text-success">
                    {answeredQuestions}
                  </div>
                  <div className="text-xs text-text-secondary">Answered</div>
                </div>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <div className="text-lg font-mono font-semibold text-warning">
                    {markedQuestions}
                  </div>
                  <div className="text-xs text-text-secondary">Marked</div>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <div className="text-lg font-mono font-semibold text-text-secondary">
                    {unansweredCount}
                  </div>
                  <div className="text-xs text-text-secondary">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h4 className="text-sm font-medium text-text-primary mb-4">
              Question Navigator
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: totalQuestions }, (_, index) => {
                const questionNumber = index + 1;
                const isAnswered = questionNumber <= answeredQuestions;
                const isMarked = questionNumber > answeredQuestions && questionNumber <= answeredQuestions + markedQuestions;
                const isCurrent = questionNumber === currentQuestion;
                
                let buttonVariant = "outline";
                let className = "w-10 h-10 text-xs font-mono";
                
                if (isCurrent) {
                  buttonVariant = "default";
                } else if (isAnswered) {
                  className += " bg-success/10 border-success text-success hover:bg-success/20";
                } else if (isMarked) {
                  className += " bg-warning/10 border-warning text-warning hover:bg-warning/20";
                }
                
                return (
                  <Button
                    key={questionNumber}
                    variant={buttonVariant}
                    size="icon"
                    onClick={() => handleQuestionClick(questionNumber)}
                    className={className}
                  >
                    {questionNumber}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border space-y-3">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Flag"
                iconPosition="left"
                iconSize={16}
              >
                Mark for Review
              </Button>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                iconName="SkipForward"
                iconPosition="left"
                iconSize={16}
              >
                Skip
              </Button>
            </div>
            <Button
              variant="default"
              size="default"
              fullWidth
              onClick={handleSubmit}
              iconName="Send"
              iconPosition="left"
              iconSize={18}
              className="bg-accent hover:bg-accent/90"
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestProgressIndicator;