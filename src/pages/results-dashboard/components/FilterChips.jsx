import React from 'react';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilter, onFilterChange, questionStats }) => {
  const filters = [
    {
      id: 'all',
      label: 'All Questions',
      count: questionStats.total,
      variant: 'outline'
    },
    {
      id: 'correct',
      label: 'Correct',
      count: questionStats.correct,
      variant: 'outline'
    },
    {
      id: 'incorrect',
      label: 'Incorrect',
      count: questionStats.incorrect,
      variant: 'outline'
    },
    {
      id: 'unanswered',
      label: 'Unanswered',
      count: questionStats.unanswered,
      variant: 'outline'
    }
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
        Filter:
      </span>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : filter.variant}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className="whitespace-nowrap"
        >
          {filter.label} ({filter.count})
        </Button>
      ))}
    </div>
  );
};

export default FilterChips;