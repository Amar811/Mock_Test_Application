import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const WorkflowBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Hide breadcrumbs during active testing
  if (currentPath === '/mock-test-interface') {
    return null;
  }

  const workflowSteps = [
    {
      label: 'Test Selection',
      path: '/test-selection-dashboard',
      icon: 'LayoutDashboard',
      stage: 'selection',
      description: 'Choose your test category and difficulty'
    },
    {
      label: 'Mock Test',
      path: '/mock-test-interface',
      icon: 'FileText',
      stage: 'testing',
      description: 'Take your practice examination'
    },
    {
      label: 'Results Analysis',
      path: '/results-dashboard',
      icon: 'BarChart3',
      stage: 'analysis',
      description: 'Review performance and insights'
    }
  ];

  const getCurrentStageIndex = () => {
    return workflowSteps.findIndex(step => step.path === currentPath);
  };

  const currentStageIndex = getCurrentStageIndex();

  const handleStepClick = (path, index) => {
    // Allow navigation to completed steps or current step
    if (index <= currentStageIndex) {
      navigate(path);
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Mobile Breadcrumb */}
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">
                {workflowSteps[currentStageIndex]?.label || 'MockTest Pro'}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {workflowSteps[currentStageIndex]?.description}
            </p>
          </div>

          {/* Desktop Breadcrumb */}
          <div className="hidden md:block">
            <nav className="flex items-center space-x-1" aria-label="Workflow progress">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/test-selection-dashboard')}
                iconName="Home"
                iconPosition="left"
                iconSize={16}
                className="text-text-secondary hover:text-text-primary"
              >
                Home
              </Button>
              
              {workflowSteps.map((step, index) => {
                const isActive = currentPath === step.path;
                const isCompleted = index < currentStageIndex;
                const isAccessible = index <= currentStageIndex;
                const isUpcoming = index > currentStageIndex;

                return (
                  <React.Fragment key={step.path}>
                    <Icon 
                      name="ChevronRight" 
                      size={16} 
                      className="text-text-secondary mx-1" 
                    />
                    
                    <div className="flex items-center space-x-2">
                      {/* Step Icon */}
                      <div className={`
                        flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-colors duration-150
                        ${isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : isCompleted 
                            ? 'bg-success text-success-foreground'
                            : isUpcoming
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        {isCompleted ? (
                          <Icon name="Check" size={12} />
                        ) : (
                          <Icon name={step.icon} size={12} />
                        )}
                      </div>

                      {/* Step Label */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStepClick(step.path, index)}
                        disabled={!isAccessible}
                        className={`
                          px-2 py-1 h-auto font-medium transition-colors duration-150
                          ${isActive 
                            ? 'text-primary hover:text-primary' 
                            : isCompleted 
                              ? 'text-success hover:text-success/80'
                              : isAccessible
                                ? 'text-text-primary hover:text-primary' :'text-muted-foreground cursor-not-allowed'
                          }
                        `}
                      >
                        {step.label}
                      </Button>
                    </div>
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Current Step Description */}
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <p className="text-sm text-text-secondary">
                {workflowSteps[currentStageIndex]?.description}
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
              <span>Workflow Progress</span>
              <span>{Math.round(((currentStageIndex + 1) / workflowSteps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-smooth"
                style={{ 
                  width: `${((currentStageIndex + 1) / workflowSteps.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBreadcrumb;