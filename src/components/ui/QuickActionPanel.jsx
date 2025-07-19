import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionPanel = ({ 
  testState = null,
  onRestartTest,
  onSwitchCategory,
  onViewProfile 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isDashboard = currentPath === '/test-selection-dashboard';
  const isTestingMode = currentPath === '/mock-test-interface';
  const isResults = currentPath === '/results-dashboard';

  const handleAction = (actionType) => {
    switch (actionType) {
      case 'restart':
        if (onRestartTest) onRestartTest();
        break;
      case 'category':
        if (onSwitchCategory) onSwitchCategory();
        navigate('/test-selection-dashboard');
        break;
      case 'profile':
        if (onViewProfile) onViewProfile();
        break;
      case 'newTest': navigate('/test-selection-dashboard');
        break;
      case 'retakeTest': navigate('/mock-test-interface');
        break;
      case 'viewAnalytics': navigate('/results-dashboard');
        break;
      default:
        break;
    }
    setIsExpanded(false);
  };

  // Don't show during active testing
  if (isTestingMode) {
    return null;
  }

  // Dashboard Actions
  const dashboardActions = [
    {
      id: 'quickStart',
      label: 'Quick Start Test',
      icon: 'Zap',
      description: 'Start with recommended settings',
      variant: 'default'
    },
    {
      id: 'customTest',
      label: 'Custom Test',
      icon: 'Settings',
      description: 'Configure test parameters',
      variant: 'outline'
    },
    {
      id: 'previousResults',
      label: 'View Results',
      icon: 'BarChart3',
      description: 'Check past performance',
      variant: 'ghost'
    },
    {
      id: 'studyMaterial',
      label: 'Study Material',
      icon: 'BookOpen',
      description: 'Access learning resources',
      variant: 'ghost'
    }
  ];

  // Results Actions
  const resultsActions = [
    {
      id: 'retakeTest',
      label: 'Retake Test',
      icon: 'RotateCcw',
      description: 'Attempt the same test again',
      variant: 'default'
    },
    {
      id: 'newTest',
      label: 'New Test',
      icon: 'Plus',
      description: 'Start a different test',
      variant: 'outline'
    },
    {
      id: 'shareResults',
      label: 'Share Results',
      icon: 'Share2',
      description: 'Share your performance',
      variant: 'ghost'
    },
    {
      id: 'downloadReport',
      label: 'Download Report',
      icon: 'Download',
      description: 'Get detailed PDF report',
      variant: 'ghost'
    }
  ];

  const currentActions = isDashboard ? dashboardActions : resultsActions;

  return (
    <>
      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Expanded Actions */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 w-64 bg-surface border border-border rounded-lg shadow-elevated animate-scale-in">
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Quick Actions
                </h4>
                {currentActions.slice(0, 3).map((action) => (
                  <Button
                    key={action.id}
                    variant={action.variant}
                    size="sm"
                    fullWidth
                    onClick={() => handleAction(action.id)}
                    iconName={action.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    <div className="flex flex-col items-start">
                      <span>{action.label}</span>
                      <span className="text-xs text-text-secondary">
                        {action.description}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* FAB Button */}
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "X" : "Zap"}
            iconSize={20}
            className="w-14 h-14 rounded-full shadow-elevated bg-primary hover:bg-primary/90"
          >
            <span className="sr-only">Quick actions</span>
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar Panel */}
      <div className="hidden lg:block">
        {/* Dashboard Sidebar */}
        {isDashboard && (
          <div className="fixed left-0 top-16 bottom-0 w-80 bg-surface border-r border-border shadow-subtle z-40">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  Quick Actions
                </h3>
                <p className="text-sm text-text-secondary">
                  Get started with your test preparation
                </p>
              </div>

              <div className="flex-1 p-6 space-y-4">
                {dashboardActions.map((action) => (
                  <div
                    key={action.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/20 hover:bg-primary/5 transition-all duration-150 cursor-pointer group"
                    onClick={() => handleAction(action.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-150">
                        <Icon 
                          name={action.icon} 
                          size={20} 
                          className="text-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-150">
                          {action.label}
                        </h4>
                        <p className="text-xs text-text-secondary mt-1">
                          {action.description}
                        </p>
                      </div>
                      <Icon 
                        name="ChevronRight" 
                        size={16} 
                        className="text-text-secondary group-hover:text-primary transition-colors duration-150"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="p-6 border-t border-border">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Recent Activity
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Completed Mathematics Test - 85%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span>Physics Test in progress</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span>Chemistry Test scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Footer Panel */}
        {isResults && (
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-subtle z-40">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h4 className="text-sm font-medium text-text-primary">
                    What's next?
                  </h4>
                  <div className="flex items-center space-x-2">
                    {resultsActions.slice(0, 2).map((action) => (
                      <Button
                        key={action.id}
                        variant={action.variant}
                        size="sm"
                        onClick={() => handleAction(action.id)}
                        iconName={action.icon}
                        iconPosition="left"
                        iconSize={16}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {resultsActions.slice(2).map((action) => (
                    <Button
                      key={action.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(action.id)}
                      iconName={action.icon}
                      iconPosition="left"
                      iconSize={16}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuickActionPanel;