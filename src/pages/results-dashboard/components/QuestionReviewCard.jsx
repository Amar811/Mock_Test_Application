import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const QuestionReviewCard = ({ question, index, isExpanded, onToggleExpand }) => {
  const isCorrect = question.userAnswer === question.correctAnswer;
  const isAnswered = question.userAnswer !== null;

  const getStatusIcon = () => {
    if (!isAnswered) return { name: 'Minus', color: 'text-muted-foreground', bgColor: 'bg-muted' };
    if (isCorrect) return { name: 'Check', color: 'text-success', bgColor: 'bg-success' };
    return { name: 'X', color: 'text-destructive', bgColor: 'bg-destructive' };
  };

  const statusIcon = getStatusIcon();

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-150"
        onClick={() => onToggleExpand(index)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`w-8 h-8 ${statusIcon.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon name={statusIcon.name} size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-text-primary">
                  Question {index + 1}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isCorrect ? 'bg-success/10 text-success' : isAnswered ?'bg-destructive/10 text-destructive': 'bg-muted text-muted-foreground'
                }`}>
                  {isCorrect ? 'Correct' : isAnswered ? 'Incorrect' : 'Unanswered'}
                </span>
              </div>
              <p className="text-sm text-text-primary line-clamp-2">
                {question.text}
              </p>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-secondary flex-shrink-0 ml-2"
          />
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border p-4 bg-muted/30 animate-slide-down">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Question:</h4>
              <p className="text-sm text-text-secondary">{question.text}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Options
                </h5>
                {question.options.map((option, optionIndex) => {
                  const optionLetter = String.fromCharCode(65 + optionIndex);
                  const isUserAnswer = question.userAnswer === optionLetter;
                  const isCorrectOption = question.correctAnswer === optionLetter;
                  
                  let optionClass = "p-2 rounded border text-sm";
                  if (isCorrectOption) {
                    optionClass += " bg-success/10 border-success text-success";
                  } else if (isUserAnswer && !isCorrectOption) {
                    optionClass += " bg-destructive/10 border-destructive text-destructive";
                  } else {
                    optionClass += " bg-surface border-border text-text-secondary";
                  }

                  return (
                    <div key={optionIndex} className={optionClass}>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-medium">{optionLetter}.</span>
                        <span>{option}</span>
                        {isCorrectOption && (
                          <Icon name="Check" size={14} className="text-success ml-auto" />
                        )}
                        {isUserAnswer && !isCorrectOption && (
                          <Icon name="X" size={14} className="text-destructive ml-auto" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1">
                    Your Answer
                  </h5>
                  <div className={`p-2 rounded text-sm ${
                    isAnswered 
                      ? isCorrect 
                        ? 'bg-success/10 text-success' :'bg-destructive/10 text-destructive' :'bg-muted text-muted-foreground'
                  }`}>
                    {isAnswered ? `Option ${question.userAnswer}` : 'Not answered'}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1">
                    Correct Answer
                  </h5>
                  <div className="p-2 rounded text-sm bg-success/10 text-success">
                    Option {question.correctAnswer}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1">
                    Time Spent
                  </h5>
                  <div className="p-2 rounded text-sm bg-muted text-text-primary">
                    {question.timeSpent}
                  </div>
                </div>
              </div>
            </div>

            {question.explanation && (
              <div>
                <h5 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
                  Explanation
                </h5>
                <div className="p-3 bg-surface rounded border border-border">
                  <p className="text-sm text-text-primary">{question.explanation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionReviewCard;