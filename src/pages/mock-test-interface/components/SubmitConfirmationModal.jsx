import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubmitConfirmationModal = ({ 
  isOpen = false, 
  onClose, 
  onConfirm,
  answeredCount = 0,
  totalQuestions = 50,
  markedCount = 0
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;
  const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-surface rounded-lg border border-border shadow-elevated max-w-md w-full mx-4 animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Submit Test?
              </h3>
              <p className="text-sm text-text-secondary">
                Are you sure you want to submit your test?
              </p>
            </div>
          </div>

          {/* Test Summary */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-text-primary mb-3">
              Test Summary
            </h4>
            
            <div className="space-y-3">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>Completion</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <div className="text-lg font-mono font-semibold text-success">
                    {answeredCount}
                  </div>
                  <div className="text-xs text-text-secondary">Answered</div>
                </div>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <div className="text-lg font-mono font-semibold text-warning">
                    {markedCount}
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

          {/* Warning Message */}
          {unansweredCount > 0 && (
            <div className="flex items-start space-x-2 p-3 bg-warning/10 rounded-lg border border-warning/20 mb-6">
              <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">
                  Incomplete Test
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}. 
                  These will be marked as incorrect.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="default"
              fullWidth
              onClick={onClose}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              Continue Test
            </Button>
            <Button
              variant="default"
              size="default"
              fullWidth
              onClick={onConfirm}
              iconName="Send"
              iconPosition="left"
              iconSize={16}
              className="bg-accent hover:bg-accent/90"
            >
              Submit Now
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-text-secondary">
              Once submitted, you cannot modify your answers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmationModal;