import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import TestHeader from "./components/TestHeader";
import QuestionCard from "./components/QuestionCard";
import QuestionNavigator from "./components/QuestionNavigator";
import TestControls from "./components/TestControls";
import SubmitConfirmationModal from "./components/SubmitConfirmationModal";
import mockQuestions from "./mockData";

const MockTestInterface = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [showNavigator, setShowNavigator] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef(null);
  const [selectedYearQuestion, setSelectedYearQuestion] = useState(null);

  // Start timer on mount
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  const totalQuestions = mockQuestions[selectedYearQuestion]?.length || 0;
  const currentQuestionData = mockQuestions[selectedYearQuestion]?.find(
    (q) => q.id === currentQuestion
  );
  const answeredCount = Object.keys(answers).length;
  const markedCount = markedQuestions.size;

  // Handle answer selection
  const handleAnswerSelect = (optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionKey,
    }));
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuestionSelect = (questionId) => {
    setCurrentQuestion(questionId);
    setShowNavigator(false);
  };

  // Mark for review
  const handleMarkForReview = () => {
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  // Clear answer
  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion];
      return newAnswers;
    });
  };

  // Submit test
  const handleSubmitTest = () => {
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = () => {
    // Calculate results and navigate to results page
    const results = {
      answers,
      questions: mockQuestions,
      totalQuestions,
      answeredCount,
      markedCount,
      submittedAt: new Date().toISOString(),
      timeTaken: formatTime(secondsElapsed),
      timeLimit: "60:00",
    };

   

    // Store results in localStorage for the results page
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("mock result",results)
    navigate("/results-dashboard");
  };

 const handleYearQuestionChange = (e) => {
  const year = e.target.value;

  if (mockQuestions[year]) {
    setSelectedYearQuestion(year);      
    setCurrentQuestion(1);              
  }
};


useEffect(()=>{
   const year="2022";
   if(mockQuestions[year]){
    setSelectedYearQuestion(year);
    setCurrentQuestion(1);
   }

},[mockQuestions])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && currentQuestion > 1) {
        handlePrevious();
      } else if (e.key === "ArrowRight" && currentQuestion < totalQuestions) {
        handleNext();
      } else if (e.key === "Escape") {
        setShowNavigator(false);
        setShowSubmitModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestion, totalQuestions]);

  // Auto-save answers to localStorage
  useEffect(() => {
    const testState = {
      currentQuestion,
      answers,
      markedQuestions: Array.from(markedQuestions),
      timestamp: Date.now(),
    };
    localStorage.setItem("mockTestState", JSON.stringify(testState));
  }, [currentQuestion, answers, markedQuestions]);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem("mockTestState");
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        // Only restore if saved within last 4 hours
        if (Date.now() - state.timestamp < 4 * 60 * 60 * 1000) {
          setCurrentQuestion(state.currentQuestion || 1);
          setAnswers(state.answers || {});
          setMarkedQuestions(new Set(state.markedQuestions || []));
        }
      } catch (error) {
        console.error("Error loading saved test state:", error);
      }
    }
  }, []);

  const hasCurrentAnswer = answers[currentQuestion] !== undefined;
  const isCurrentMarked = markedQuestions.has(currentQuestion);
  const shouldShowSubmit =
    currentQuestion === totalQuestions && answeredCount > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <TestHeader
        testTitle="General Knowledge Mock Test"
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        timeRemaining={2700} // 45 minutes
        onSubmitTest={handleSubmitTest}
        onToggleNavigator={() => setShowNavigator(!showNavigator)}
        showNavigator={showNavigator}
      />

      <div className="flex">
        {/* Main Content */}
        <div
          className={`flex-1 ${
            showNavigator ? "lg:mr-80" : ""
          } transition-all duration-300`}
        >
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Question Content */}
            <div className="w-full lg:w-3/4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {currentQuestionData && (
                <QuestionCard
                  question={currentQuestionData}
                  selectedAnswer={answers[currentQuestion]}
                  onAnswerSelect={handleAnswerSelect}
                  showFeedback={showFeedback}
                  isReviewMode={false}
                />
              )}
            </div>

            <div className="w-full lg:w-1/4 px-4 py-4 lg:py-6">
              <label
                htmlFor="previousQuestions"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Select Previous Year Question
              </label>
              <select
                id="previousQuestions"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                onChange={handleYearQuestionChange} // Replace with actual logic
              >
                <option value="">-- Choose --</option>
                {Object.keys(mockQuestions).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Question Navigator */}
        <QuestionNavigator
          questions={mockQuestions}
          currentQuestion={currentQuestion}
          answers={answers}
          onQuestionSelect={handleQuestionSelect}
          onClose={() => setShowNavigator(false)}
          isVisible={showNavigator}
        />
      </div>

      {/* Test Controls */}
      <TestControls
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onMarkForReview={handleMarkForReview}
        onClearAnswer={handleClearAnswer}
        onSubmitTest={handleSubmitTest}
        hasAnswer={hasCurrentAnswer}
        isMarkedForReview={isCurrentMarked}
        showSubmit={shouldShowSubmit}
      />

      {/* Submit Confirmation Modal */}
      <SubmitConfirmationModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleConfirmSubmit}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        markedCount={markedCount}
      />
    </div>
  );
};

export default MockTestInterface;
