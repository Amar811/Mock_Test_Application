import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowBreadcrumb from '../../components/ui/WorkflowBreadcrumb';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import TestCategoryCard from './components/TestCategoryCard';
import RecentTestCard from './components/RecentTestCard';
import QuickStatsCard from './components/QuickStatsCard';
import ProgressChart from './components/ProgressChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TestSelectionDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for test categories
  const testCategories = [
    {
      testType: 'paper1',
      title: 'Paper 1 - General Knowledge',
      description: `Comprehensive assessment covering current affairs, history, geography, science, and general awareness. Perfect for competitive exam preparation with questions from diverse domains.`,
      duration: '90 minutes',
      totalQuestions: 100,
      iconName: 'BookOpen',
      difficulty: 'Medium',
      lastScore: 78,
      isRecommended: true
    },
    {
      testType: 'paper2',
      title: 'Paper 2 - Management Studies',
      description: `Advanced management concepts including organizational behavior, strategic planning, human resources, and business analytics. Ideal for MBA and management certification preparation.`,
      duration: '120 minutes',
      totalQuestions: 80,
      iconName: 'Briefcase',
      difficulty: 'Hard',
      lastScore: 85,
      isRecommended: false
    }
  ];

  // Mock data for recent tests
  const recentTests = [
    {
      testType: 'paper1',
      title: 'Paper 1 - General Knowledge',
      score: 85,
      completedAt: '2 days ago',
      status: 'completed',
      duration: '90 minutes',
      correctAnswers: 85,
      totalQuestions: 100
    },
    {
      testType: 'paper2',
      title: 'Paper 2 - Management Studies',
      score: 78,
      completedAt: '5 days ago',
      status: 'completed',
      duration: '120 minutes',
      correctAnswers: 62,
      totalQuestions: 80
    },
    {
      testType: 'paper1',
      title: 'Paper 1 - Practice Test',
      score: 0,
      completedAt: 'Started yesterday',
      status: 'in-progress',
      duration: '90 minutes',
      correctAnswers: 0,
      totalQuestions: 100
    }
  ];

  // Mock data for quick stats
  const quickStats = [
    {
      title: 'Tests Completed',
      value: '24',
      subtitle: 'This month',
      iconName: 'CheckCircle',
      trend: 'up',
      trendValue: '+12%',
      color: 'success'
    },
    {
      title: 'Average Score',
      value: '82%',
      subtitle: 'Last 10 tests',
      iconName: 'Target',
      trend: 'up',
      trendValue: '+5%',
      color: 'primary'
    },
    {
      title: 'Study Streak',
      value: '7',
      subtitle: 'Days in a row',
      iconName: 'Flame',
      trend: 'up',
      trendValue: '+2',
      color: 'warning'
    },
    {
      title: 'Time Spent',
      value: '45h',
      subtitle: 'This month',
      iconName: 'Clock',
      trend: 'up',
      trendValue: '+8h',
      color: 'primary'
    }
  ];

  const handleQuickStart = () => {
    // Start with recommended test (Paper 1)
    navigate('/mock-test-interface', { 
      state: { 
        testType: 'paper1',
        title: 'Paper 1 - General Knowledge',
        duration: '90 minutes',
        totalQuestions: 100
      } 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowBreadcrumb />
      <QuickActionPanel />

      {/* Main Content */}
      <main className="pt-4 pb-20 lg:pl-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-2">
                  Welcome back, Student!
                </h1>
                <p className="text-text-secondary">
                  Ready to continue your test preparation journey?
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <div className="text-lg font-mono font-semibold text-text-primary">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-text-secondary">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Zap" size={20} color="var(--color-primary-foreground)" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary">
                    Quick Start Recommendation
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Continue with Paper 1 - General Knowledge
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={handleQuickStart}
                iconName="Play"
                iconPosition="left"
                iconSize={16}
              >
                Start Now
              </Button>
            </div>
          </div>

          {/* Test Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Choose Your Test
              </h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                iconSize={16}
              >
                Customize
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testCategories.map((category) => (
                <TestCategoryCard
                  key={category.testType}
                  {...category}
                />
              ))}
            </div>
          </div>

          {/* Stats Overview */}
          {/* <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
              Your Progress
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {quickStats.map((stat, index) => (
                <QuickStatsCard
                  key={index}
                  {...stat}
                />
              ))}
            </div>
          </div> */}

          {/* Recent Activity & Progress Chart */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Tests */}
            {/* <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Recent Tests
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/results-dashboard')}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <RecentTestCard
                    key={index}
                    {...test}
                  />
                ))}
              </div>
            </div> */}

            {/* Progress Chart */}
            {/* <div>
              <ProgressChart />
            </div> */}
          {/* </div>  */}

          {/* Study Tips */}
          {/* <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg flex-shrink-0">
                <Icon name="Lightbulb" size={24} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  Today's Study Tip
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Focus on your weak areas identified in previous tests. Review the explanations for incorrect answers to improve your understanding and avoid similar mistakes in future attempts.
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="BookOpen"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Study Material
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="TrendingUp"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Performance Tips
                  </Button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default TestSelectionDashboard;