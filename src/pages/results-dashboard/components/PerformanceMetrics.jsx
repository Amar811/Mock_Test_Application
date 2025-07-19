import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ testResults, previousAttempts }) => {
  const accuracyData = [
    { category: 'Mathematics', accuracy: 85, total: 15 },
    { category: 'Science', accuracy: 78, total: 12 },
    { category: 'English', accuracy: 92, total: 10 },
    { category: 'General Knowledge', accuracy: 70, total: 13 }
  ];

  const timeAnalysisData = [
    { range: '0-30s', count: 12 },
    { range: '31-60s', count: 18 },
    { range: '61-90s', count: 15 },
    { range: '91-120s', count: 8 },
    { range: '120s+', count: 7 }
  ];

  const progressData = [
    { attempt: 'Attempt 1', score: 65, date: '2025-01-10' },
    { attempt: 'Attempt 2', score: 72, date: '2025-01-15' },
    { attempt: 'Attempt 3', score: 78, date: '2025-01-18' },
    { attempt: 'Current', score: testResults.percentage, date: testResults.completedDate }
  ];

  const pieData = [
    { name: 'Correct', value: testResults.correctAnswers, color: '#059669' },
    { name: 'Incorrect', value: testResults.incorrectAnswers, color: '#DC2626' },
    { name: 'Unanswered', value: testResults.unanswered, color: '#64748B' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Performance Analytics
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category-wise Accuracy */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Category-wise Accuracy
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    stroke="#64748B"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#64748B"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="accuracy" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Answer Distribution */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
              <Icon name="PieChart" size={16} className="mr-2" />
              Answer Distribution
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-xs text-text-secondary">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Analysis */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Clock" size={16} className="mr-2" />
            Time per Question Analysis
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Trend */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Progress Trend
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="attempt" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748B"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563EB" 
                  strokeWidth={3}
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="text-sm font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          Key Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Strength</span>
            </div>
            <p className="text-sm text-text-secondary">
              Excellent performance in English with 92% accuracy
            </p>
          </div>
          
          <div className="p-4 bg-warning/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Focus Area</span>
            </div>
            <p className="text-sm text-text-secondary">
              General Knowledge needs improvement (70% accuracy)
            </p>
          </div>
          
          <div className="p-4 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Progress</span>
            </div>
            <p className="text-sm text-text-secondary">
              13% improvement from your first attempt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;