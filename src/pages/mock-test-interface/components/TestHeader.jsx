import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TestHeader = ({ 
  testTitle = "Mock Test", 
  currentQuestion = 1, 
  totalQuestions = 50,
  timeRemaining = 2700, // seconds
  onSubmitTest,
  onToggleNavigator,
  showNavigator = false
}) => {
  const [timeLeft, setTimeLeft] = useState(timeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onSubmitTest) onSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onSubmitTest]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 300) return 'text-destructive'; // Last 5 minutes
    if (timeLeft <= 900) return 'text-warning'; // Last 15 minutes
    return 'text-text-primary';
  };

  const completionPercentage = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <div className="bg-surface border-b border-border shadow-subtle">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Test Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Icon name="FileText" size={18} className="text-primary" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-medium text-text-primary">
                  {testTitle}
                </h1>
                <p className="text-xs text-text-secondary">
                  Question {currentQuestion} of {totalQuestions}
                </p>
              </div>
            </div>
            
            {/* Mobile Question Counter */}
            <div className="sm:hidden">
              <span className="text-sm font-medium text-text-primary">
                {currentQuestion}/{totalQuestions}
              </span>
            </div>
          </div>

          {/* Center Section - Progress (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                <span>Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Section - Timer & Actions */}
          <div className="flex items-center space-x-3">
            {/* Timer */}
            <div className="flex items-center space-x-2">
              <Icon 
                name="Clock" 
                size={16} 
                className={timeLeft <= 300 ? 'text-destructive' : 'text-text-secondary'} 
              />
              <span className={`text-sm font-mono font-medium ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Navigator Toggle (Mobile) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleNavigator}
              iconName={showNavigator ? "X" : "Grid3X3"}
              iconSize={18}
              className="lg:hidden"
            >
              <span className="sr-only">Toggle question navigator</span>
            </Button>

            {/* Submit Button (Desktop) */}
            <div className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                onClick={onSubmitTest}
                iconName="Send"
                iconPosition="left"
                iconSize={16}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Submit Test
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="lg:hidden pb-3">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
            <span>Test Progress</span>
            <span>{completionPercentage}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;