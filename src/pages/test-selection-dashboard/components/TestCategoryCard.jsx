import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TestCategoryCard = ({
  testType,
  title,
  description,
  duration,
  totalQuestions,
  iconName,
  difficulty,
  lastScore,
  isRecommended = false,
  isdisabled = false,
}) => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate("/mock-test-interface", {
      state: {
        testType,
        title,
        duration,
        totalQuestions,
      },
    });
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy":
        return "text-success bg-success/10";
      case "Medium":
        return "text-warning bg-warning/10";
      case "Hard":
        return "text-destructive bg-destructive/10";
      default:
        return "text-text-secondary bg-muted";
    }
  };

  return (
    <div className="relative bg-card border border-border rounded-lg p-6 hover:border-primary/20 hover:shadow-moderate transition-all duration-200 group">
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
          Recommended
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
            <Icon name={iconName} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              {title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                  difficulty
                )}`}
              >
                {difficulty}
              </span>
              {lastScore && (
                <span className="text-xs text-text-secondary">
                  Last: {lastScore}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-6 leading-relaxed">
        {description}
      </p>

      {/* Test Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <div>
            <p className="text-xs text-text-secondary">Duration</p>
            <p className="text-sm font-medium text-text-primary">{duration}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} className="text-text-secondary" />
          <div>
            <p className="text-xs text-text-secondary">Questions</p>
            <p className="text-sm font-medium text-text-primary">
              {totalQuestions}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="default"
        size="default"
        fullWidth
        onClick={handleStartTest}
        iconName="Play"
        iconPosition="left"
        iconSize={18}
        className="group-hover:bg-primary/90 transition-colors duration-200"
        disabled={isdisabled}
      >
        {isdisabled ? "Start Test" : "Start Test"}
      </Button>
    </div>
  );
};

export default TestCategoryCard;
