import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ testResults, onRetakeTest, onSwitchCategory }) => {
  const navigate = useNavigate();

  const handleRetakeTest = () => {
    if (onRetakeTest) {
      onRetakeTest();
    }
    navigate('/mock-test-interface');
  };

  const handleSwitchCategory = () => {
    if (onSwitchCategory) {
      onSwitchCategory();
    }
    navigate('/test-selection-dashboard');
  };

  const handleDownloadReport = () => {
    // Mock download functionality
    const reportData = {
      testName: testResults.testName,
      score: testResults.score,
      percentage: testResults.percentage,
      timeTaken: testResults.timeTaken,
      completedDate: testResults.completedDate
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `test-report-${testResults.completedDate}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MockTest Pro Results',
        text: `I scored ${testResults.percentage}% on ${testResults.testName}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `I scored ${testResults.percentage}% on ${testResults.testName} using MockTest Pro!`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          What's Next?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleRetakeTest}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={18}
            className="bg-primary hover:bg-primary/90"
          >
            Retake This Test
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleSwitchCategory}
            iconName="Grid3X3"
            iconPosition="left"
            iconSize={18}
          >
            Try Different Category
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            Practice makes perfect! Keep improving your scores.
          </p>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Share & Export
        </h4>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShareResults}
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
          >
            Share Results
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownloadReport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Download Report
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.print()}
            iconName="Printer"
            iconPosition="left"
            iconSize={16}
          >
            Print Results
          </Button>
        </div>
      </div>

      {/* Study Resources */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
          <Icon name="BookOpen" size={16} className="mr-2" />
          Recommended Study Resources
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  General Knowledge Practice
                </p>
                <p className="text-xs text-text-secondary">
                  Focus on your weakest area
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={14}
            >
              Study
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Time Management Tips
                </p>
                <p className="text-xs text-text-secondary">
                  Improve your test-taking speed
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={14}
            >
              Learn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;