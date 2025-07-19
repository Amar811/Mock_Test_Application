import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ data = [], title = "Performance Trend" }) => {
  // Default chart data with safe spread operator usage
  const defaultData = [
    { name: 'Test 1', score: 65, date: '2025-01-10' },
    { name: 'Test 2', score: 72, date: '2025-01-12' },
    { name: 'Test 3', score: 68, date: '2025-01-14' },
    { name: 'Test 4', score: 78, date: '2025-01-16' },
    { name: 'Test 5', score: 85, date: '2025-01-18' },
  ];

  // Safely combine default data with provided data
  const chartData = Array.isArray(data) && data.length > 0 
    ? [...defaultData, ...data] 
    : defaultData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-moderate">
          <p className="text-sm font-medium text-text-primary mb-1">
            {label}
          </p>
          <p className="text-sm text-text-secondary">
            Score: <span className="font-mono font-semibold text-primary">
              {payload[0].value}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {title}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span>Test Scores</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--color-border)"
              opacity={0.5}
            />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ 
                fill: 'var(--color-primary)', 
                strokeWidth: 2, 
                r: 4 
              }}
              activeDot={{ 
                r: 6, 
                fill: 'var(--color-primary)',
                stroke: 'var(--color-surface)',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-mono font-semibold text-success">
              {Math.max(...chartData.map(d => d.score))}%
            </div>
            <div className="text-xs text-text-secondary">Best Score</div>
          </div>
          <div>
            <div className="text-lg font-mono font-semibold text-primary">
              {Math.round(chartData.reduce((acc, d) => acc + d.score, 0) / chartData.length)}%
            </div>
            <div className="text-xs text-text-secondary">Average</div>
          </div>
          <div>
            <div className="text-lg font-mono font-semibold text-accent">
              +{Math.round(((chartData[chartData.length - 1]?.score || 0) - (chartData[0]?.score || 0)) / (chartData[0]?.score || 1) * 100)}%
            </div>
            <div className="text-xs text-text-secondary">Improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;