import React from 'react';
import Button from '../../../components/ui/Button';


const QuestionNavigator = ({ 
  questions = [], 
  currentQuestion = 1, 
  answers = {}, 
  onQuestionSelect, 
  onClose,
  isVisible = false 
}) => {
  const getQuestionStatus = (questionId) => {
    const hasAnswer = answers[questionId] !== undefined;
    
    if (hasAnswer) {
      return 'answered';
    } else {
      return 'unanswered';
    }
  };

  const getQuestionButtonStyle = (questionId) => {
    const status = getQuestionStatus(questionId);
    const isCurrent = questionId === currentQuestion;
    
    if (isCurrent) {
      return 'bg-primary text-primary-foreground border-primary';
    } else if (status === 'answered') {
      return 'bg-success/10 text-success border-success hover:bg-success/20';
    } else {
      return 'bg-surface text-text-primary border-border hover:border-primary/50 hover:bg-primary/5';
    }
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div 
        className="lg:hidden absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Navigator Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-surface border-l border-border shadow-elevated lg:shadow-none animate-slide-down lg:animate-none">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Question Navigator
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
                iconSize={18}
                className="lg:hidden"
              >
                <span className="sr-only">Close navigator</span>
              </Button>
            </div>
            
            {/* Progress Overview */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Progress</span>
                <span className="font-medium text-text-primary">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              
              {/* Status Summary */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <div className="text-lg font-mono font-semibold text-success">
                    {answeredCount}
                  </div>
                  <div className="text-xs text-text-secondary">Answered</div>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <div className="text-lg font-mono font-semibold text-text-secondary">
                    {totalQuestions - answeredCount}
                  </div>
                  <div className="text-xs text-text-secondary">Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question) => {
                const status = getQuestionStatus(question.id);
                const isCurrent = question.id === currentQuestion;
                
                return (
                  <button
                    key={question.id}
                    onClick={() => onQuestionSelect(question.id)}
                    className={`
                      w-10 h-10 rounded-lg border-2 text-xs font-mono font-medium
                      transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20
                      ${getQuestionButtonStyle(question.id)}
                    `}
                  >
                    {question.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="p-6 border-t border-border">
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Legend
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded border-2 border-primary"></div>
                <span className="text-xs text-text-secondary">Current Question</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success/10 rounded border-2 border-success"></div>
                <span className="text-xs text-text-secondary">Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-surface rounded border-2 border-border"></div>
                <span className="text-xs text-text-secondary">Not Answered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;