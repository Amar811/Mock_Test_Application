import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import WorkflowBreadcrumb from "../../components/ui/WorkflowBreadcrumb";
import QuickActionPanel from "../../components/ui/QuickActionPanel";
import OverviewCard from "./components/OverviewCard";
import QuestionReviewCard from "./components/QuestionReviewCard";
import FilterChips from "./components/FilterChips";
import PerformanceMetrics from "./components/PerformanceMetrics";
import ActionButtons from "./components/ActionButtons";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const ResultsDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [showMetrics, setShowMetrics] = useState(false);

  const [testResults, setTestResults] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  console.log("testResults", testResults);

  // 🔥 ADDED - Load test data from localStorage
  useEffect(() => {
    const storedResults = localStorage.getItem("testResults");
    if (storedResults) {
      const parsed = JSON.parse(storedResults);

      const questionsWithAnswers = parsed.questions.map((q) => {
        const userAnswer = parsed.answers[q.id] || null;
        return {
          id: q.id,
          text: q.text,
          options: Object.values(q.options),
          correctAnswer: q.correctAnswer.toUpperCase(),
          userAnswer: userAnswer ? userAnswer.toUpperCase() : null,
          timeSpent: "N/A",
          explanation: q.explanation || "",
        };
      });

      setAllQuestions(questionsWithAnswers);

      const correct = questionsWithAnswers.filter(
        (q) => q.userAnswer === q.correctAnswer
      ).length;
      const incorrect = questionsWithAnswers.filter(
        (q) => q.userAnswer && q.userAnswer !== q.correctAnswer
      ).length;
      const unanswered = questionsWithAnswers.filter(
        (q) => !q.userAnswer
      ).length;

      setTestResults({
        testName: "Mock Test - General Knowledge",
        completedDate: new Date(parsed.submittedAt).toLocaleDateString(),
        totalQuestions: parsed.totalQuestions,
        correctAnswers: correct,
        incorrectAnswers: incorrect,
        unanswered: unanswered,
        percentage: Math.round((correct / parsed.totalQuestions) * 100),
        score: correct, // ✅ Add this line
       timeTaken: parsed.timeTaken || "N/A",     
       timeLimit: parsed.timeLimit || "N/A"  
      });
    }
  }, []);

  const handleToggleExpand = (questionIndex) => {
    const newExpanded = new Set(expandedQuestions);
    newExpanded.has(questionIndex)
      ? newExpanded.delete(questionIndex)
      : newExpanded.add(questionIndex);
    setExpandedQuestions(newExpanded);
  };

  const handleRetakeTest = () => {
    navigate("/mock-test-interface");
  };

  const handleSwitchCategory = () => {
    navigate("/test-selection-dashboard");
  };

  const handleExpandAll = () => {
    if (expandedQuestions.size === filteredQuestions.length) {
      setExpandedQuestions(new Set());
    } else {
      setExpandedQuestions(new Set(filteredQuestions.map((_, index) => index)));
    }
  };

  // 🔥 ADDED: Filter logic using real questions
  const filteredQuestions = allQuestions.filter((question) => {
    switch (activeFilter) {
      case "correct":
        return question.userAnswer === question.correctAnswer;
      case "incorrect":
        return (
          question.userAnswer && question.userAnswer !== question.correctAnswer
        );
      case "unanswered":
        return question.userAnswer === null;
      default:
        return true;
    }
  });

  const questionStats = {
    total: allQuestions.length,
    correct: testResults?.correctAnswers || 0,
    incorrect: testResults?.incorrectAnswers || 0,
    unanswered: testResults?.unanswered || 0,
  };

  useEffect(() => {
    setExpandedQuestions(new Set());
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowBreadcrumb />

      <div className="pt-4 pb-20 lg:pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Test Results
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMetrics(!showMetrics)}
                iconName={showMetrics ? "BarChart3" : "FileText"}
                iconPosition="left"
                iconSize={16}
              >
                {showMetrics ? "Questions" : "Analytics"}
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">
                  Test Results
                </h1>
                <p className="text-text-secondary mt-2">
                  Comprehensive analysis of your performance
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMetrics(!showMetrics)}
                  iconName={showMetrics ? "FileText" : "BarChart3"}
                  iconPosition="left"
                  iconSize={16}
                >
                  {showMetrics ? "View Questions" : "View Analytics"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Card */}
              <OverviewCard testResults={testResults} />

              {/* Mobile Analytics Toggle */}
              {showMetrics ? (
                <div className="lg:hidden">
                  <PerformanceMetrics
                    testResults={testResults}
                    previousAttempts={[]}
                  />
                </div>
              ) : (
                <>
                  {/* Question Review Section */}
                  <div className="bg-surface border border-border rounded-lg">
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-heading font-semibold text-text-primary">
                          Question Review
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleExpandAll}
                            iconName={
                              expandedQuestions.size ===
                              filteredQuestions.length
                                ? "ChevronUp"
                                : "ChevronDown"
                            }
                            iconPosition="left"
                            iconSize={16}
                          >
                            {expandedQuestions.size === filteredQuestions.length
                              ? "Collapse All"
                              : "Expand All"}
                          </Button>
                        </div>
                      </div>

                      <FilterChips
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        questionStats={questionStats}
                      />
                    </div>

                    <div className="p-6">
                      {filteredQuestions.length > 0 ? (
                        <div className="space-y-4">
                          {filteredQuestions.map((question, index) => (
                            <QuestionReviewCard
                              key={question.id}
                              question={question}
                              index={index}
                              isExpanded={expandedQuestions.has(index)}
                              onToggleExpand={handleToggleExpand}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Icon
                            name="Search"
                            size={48}
                            className="text-muted-foreground mx-auto mb-4"
                          />
                          <p className="text-text-secondary">
                            No questions found for the selected filter.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            {/* <div className="space-y-6"> */}
            {/* Desktop Analytics */}
            {/* {showMetrics && (
                <div className="hidden lg:block">
                  <PerformanceMetrics 
                    testResults={testResults} 
                    previousAttempts={[]} 
                  />
                </div>
              )} */}

            {/* Action Buttons */}
            {/* <ActionButtons
                testResults={testResults}
                onRetakeTest={handleRetakeTest}
                onSwitchCategory={handleSwitchCategory}
              /> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* <QuickActionPanel
        testState={testResults}
        onRestartTest={handleRetakeTest}
        onSwitchCategory={handleSwitchCategory}
      /> */}
    </div>
  );
};

export default ResultsDashboard;
