import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TestHeader from './components/TestHeader';
import QuestionCard from './components/QuestionCard';
import QuestionNavigator from './components/QuestionNavigator';
import TestControls from './components/TestControls';
import SubmitConfirmationModal from './components/SubmitConfirmationModal';
import mockQuestions from './mockData'

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
    .padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
};



  // // Mock test data
  // const mockQuestions = [
  //   {
  //     id: 1,
  //     category: "General Knowledge",
  //     difficulty: "Medium",
  //     marks: 2,
  //     text: "Which planet is known as the \'Red Planet\'?",
  //     description: "This planet is famous for its reddish appearance due to iron oxide on its surface.",
  //     options: {
  //       a: "Venus",
  //       b: "Mars",
  //       c: "Jupiter",
  //       d: "Saturn"
  //     },
  //     correctAnswer: "b",
  //     explanation: "Mars is called the 'Red Planet' because of iron oxide (rust) on its surface, which gives it a reddish appearance."
  //   },
  //   // {
  //   //   id: 2,
  //   //   category: "Science",
  //   //   difficulty: "Easy",
  //   //   marks: 1,
  //   //   text: "What is the chemical symbol for water?",
  //   //   options: {
  //   //     a: "H2O",
  //   //     b: "CO2",
  //   //     c: "NaCl",
  //   //     d: "O2"
  //   //   },
  //   //   correctAnswer: "a",
  //   //   explanation: "Water is composed of two hydrogen atoms and one oxygen atom, hence H2O."
  //   // },
  //   // {
  //   //   id: 3,
  //   //   category: "Mathematics",
  //   //   difficulty: "Medium",
  //   //   marks: 2,
  //   //   text: "What is the value of π (pi) approximately?",
  //   //   options: {
  //   //     a: "3.14159",
  //   //     b: "2.71828",
  //   //     c: "1.41421",
  //   //     d: "1.73205"
  //   //   },
  //   //   correctAnswer: "a",
  //   //   explanation: "Pi (π) is approximately 3.14159, representing the ratio of a circle's circumference to its diameter."
  //   // },
  //   // {
  //   //   id: 4,
  //   //   category: "History",
  //   //   difficulty: "Hard",
  //   //   marks: 3,
  //   //   text: "In which year did World War II end?",
  //   //   options: {
  //   //     a: "1944",
  //   //     b: "1945",
  //   //     c: "1946",
  //   //     d: "1947"
  //   //   },
  //   //   correctAnswer: "b",
  //   //   explanation: "World War II ended in 1945 with the surrender of Japan in September, following the atomic bombings and Soviet invasion."
  //   // },
  //   // {
  //   //   id: 5,
  //   //   category: "Geography",
  //   //   difficulty: "Easy",
  //   //   marks: 1,
  //   //   text: "Which is the largest continent by area?",
  //   //   options: {
  //   //     a: "Africa",
  //   //     b: "North America",
  //   //     c: "Asia",
  //   //     d: "Europe"
  //   //   },
  //   //   correctAnswer: "c",
  //   //   explanation: "Asia is the largest continent, covering about 30% of Earth's total land area and 8.7% of Earth's total surface area."
  //   // },
  //   // {
  //   //   id: 6,
  //   //   category: "Literature",
  //   //   difficulty: "Medium",
  //   //   marks: 2,
  //   //   text: "Who wrote the novel \'Pride and Prejudice\'?",
  //   //   options: {
  //   //     a: "Charlotte Brontë",
  //   //     b: "Jane Austen",
  //   //     c: "Emily Dickinson",
  //   //     d: "Virginia Woolf"
  //   //   },
  //   //   correctAnswer: "b",
  //   //   explanation: "Jane Austen wrote 'Pride and Prejudice', published in 1813, which is considered one of the greatest novels in English literature."
  //   // },
  //   // {
  //   //   id: 7,
  //   //   category: "Physics",
  //   //   difficulty: "Hard",
  //   //   marks: 3,
  //   //   text: "What is the speed of light in vacuum?",
  //   //   options: {
  //   //     a: "299,792,458 m/s",
  //   //     b: "300,000,000 m/s",
  //   //     c: "299,000,000 m/s",
  //   //     d: "298,792,458 m/s"
  //   //   },
  //   //   correctAnswer: "a",
  //   //   explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second, a fundamental physical constant."
  //   // },
  //   // {
  //   //   id: 8,
  //   //   category: "Biology",
  //   //   difficulty: "Medium",
  //   //   marks: 2,
  //   //   text: "What is the powerhouse of the cell?",
  //   //   options: {
  //   //     a: "Nucleus",
  //   //     b: "Ribosome",
  //   //     c: "Mitochondria",
  //   //     d: "Endoplasmic Reticulum"
  //   //   },
  //   //   correctAnswer: "c",
  //   //   explanation: "Mitochondria are called the powerhouse of the cell because they produce ATP, the energy currency of cells."
  //   // },
  //   // {
  //   //   id: 9,
  //   //   category: "Chemistry",
  //   //   difficulty: "Easy",
  //   //   marks: 1,
  //   //   text: "What is the atomic number of carbon?",
  //   //   options: {
  //   //     a: "4",
  //   //     b: "6",
  //   //     c: "8",
  //   //     d: "12"
  //   //   },
  //   //   correctAnswer: "b",
  //   //   explanation: "Carbon has an atomic number of 6, meaning it has 6 protons in its nucleus."
  //   // },
  //   // {
  //   //   id: 10,
  //   //   category: "Sports",
  //   //   difficulty: "Easy",
  //   //   marks: 1,
  //   //   text: "How many players are there in a basketball team on the court?",
  //   //   options: {
  //   //     a: "4",
  //   //     b: "5",
  //   //     c: "6",
  //   //     d: "7"
  //   //   },
  //   //   correctAnswer: "b",
  //   //   explanation: "A basketball team has 5 players on the court at any given time during play."
  //   // }
  // ];

  const totalQuestions = mockQuestions.length;
  const currentQuestionData = mockQuestions.find(q => q.id === currentQuestion);
  const answeredCount = Object.keys(answers).length;
  const markedCount = markedQuestions.size;

  // Handle answer selection
  const handleAnswerSelect = (optionKey) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionKey
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
    setMarkedQuestions(prev => {
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
    setAnswers(prev => {
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
    debugger;
    // Calculate results and navigate to results page
    const results = {
      answers,
      questions: mockQuestions,
      totalQuestions,
      answeredCount,
      markedCount,
      submittedAt: new Date().toISOString(),
     timeTaken: formatTime(secondsElapsed), 
      timeLimit: "60:00"   
    };
    
    // Store results in localStorage for the results page
    localStorage.setItem('testResults', JSON.stringify(results));
    navigate('/results-dashboard');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentQuestion > 1) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && currentQuestion < totalQuestions) {
        handleNext();
      } else if (e.key === 'Escape') {
        setShowNavigator(false);
        setShowSubmitModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, totalQuestions]);

  // Auto-save answers to localStorage
  useEffect(() => {
    const testState = {
      currentQuestion,
      answers,
      markedQuestions: Array.from(markedQuestions),
      timestamp: Date.now()
    };
    localStorage.setItem('mockTestState', JSON.stringify(testState));
  }, [currentQuestion, answers, markedQuestions]);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('mockTestState');
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
        console.error('Error loading saved test state:', error);
      }
    }
  }, []);

  const hasCurrentAnswer = answers[currentQuestion] !== undefined;
  const isCurrentMarked = markedQuestions.has(currentQuestion);
  const shouldShowSubmit = currentQuestion === totalQuestions && answeredCount > 0;

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
        <div className={`flex-1 ${showNavigator ? 'lg:mr-80' : ''} transition-all duration-300`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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