import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = ({ 
  title, 
  value, 
  subtitle, 
  iconName, 
  trend, 
  trendValue,
  color = 'primary' 
}) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          icon: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: 'text-warning'
        };
      case 'destructive':
        return {
          bg: 'bg-destructive/10',
          text: 'text-destructive',
          icon: 'text-destructive'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          icon: 'text-primary'
        };
    }
  };

  const getTrendColor = (trendType) => {
    switch (trendType) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getTrendIcon = (trendType) => {
    switch (trendType) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/20 hover:shadow-subtle transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center justify-center w-10 h-10 ${colorClasses.bg} rounded-lg`}>
          <Icon 
            name={iconName} 
            size={20} 
            className={colorClasses.icon}
          />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
            <Icon name={getTrendIcon(trend)} size={14} />
            <span className="text-xs font-medium">
              {trendValue}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <div className={`text-2xl font-mono font-semibold ${colorClasses.text} mb-1`}>
          {value}
        </div>
        <div className="text-xs font-medium text-text-primary mb-1">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-text-secondary">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickStatsCard;