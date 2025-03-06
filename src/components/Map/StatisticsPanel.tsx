import React, { useMemo } from 'react';
import { PlacesType } from '#lib/Places';
import { Category } from '#lib/MarkerCategories';

/**
 * Type definitions for statistics data
 */
interface Statistics {
  advancedPollingPlaces: number;
  unavailablePlaces: number;
  availableStatus: number;
  unavailableStatus: number;
}

/**
 * Props interface for the StatisticsPanel component
 */
interface StatisticsPanelProps {
  clustersByCategory?: Record<Category, PlacesType>;
  hiddenCategories?: Category[];
  isLoading?: boolean;
  error?: Error;
}

/**
 * Props interface for the StatCard component
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';  // Restrict color options
  subtitle: string;
  isLoading?: boolean;
}

// SVG Icons components for better reusability
const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CountyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const StatusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * StatCard Component
 * Displays a single statistics card with consistent styling
 */
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle, isLoading }) => {
  // Pre-compute Tailwind classes to avoid runtime concatenation issues
  const colorClasses = {
    container: {
      blue: 'bg-blue-100 border-blue-300 hover:bg-blue-200',
      green: 'bg-green-100 border-green-300 hover:bg-green-200',
      purple: 'bg-purple-100 border-purple-300 hover:bg-purple-200',
      orange: 'bg-orange-100 border-orange-300 hover:bg-orange-200'
    },
    text: {
      blue: 'text-blue-800',
      green: 'text-green-800',
      purple: 'text-purple-800',
      orange: 'text-orange-800'
    },
    icon: {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    }
  };

  return (
    <div className={`p-3 rounded-lg border-2 flex-1 transition-colors relative min-h-[120px] ${colorClasses.container[color]}`}>
      <div className="flex items-center justify-between mb-1">
        <p className={`text-sm font-semibold ${colorClasses.text[color]}`}>{title}</p>
        <span className={colorClasses.icon[color]}>{icon}</span>
      </div>
      <p className={`text-2xl font-bold ${colorClasses.text[color]} mb-6 ${isLoading ? 'animate-pulse' : ''}`}>
        {isLoading ? '...' : value}
      </p>
      <p className={`absolute bottom-0 right-3 text-xs ${colorClasses.icon[color]}`}>{subtitle}</p>
    </div>
  );
};

/**
 * StatisticsPanel Component
 * Displays statistical information about polling places
 * Takes into account hidden categories from the map legend
 */
const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  clustersByCategory,
  hiddenCategories = [],
  isLoading = false,
  error
}) => {
  /**
   * Calculate all statistics in a single pass through the data
   * Memoized to prevent unnecessary recalculations
   */
  const { visibleMarkers, totalPlaces, countyCount, statistics } = useMemo(() => {
    const markers = clustersByCategory
      ? Object.entries(clustersByCategory)
          .filter(([categoryStr]) => !hiddenCategories.includes(Number(categoryStr) as Category))
          .flatMap(([_, markers]) => markers)
      : [];

    const counties = new Set<string>();
    const stats: Statistics = {
      advancedPollingPlaces: 0,
      unavailablePlaces: 0,
      availableStatus: 0,
      unavailableStatus: 0
    };

    markers.forEach(place => {
      // Add null check for county to prevent adding undefined/null values to Set
      if (place.county) {
        counties.add(place.county);
      }

      if (place.advanced_polling_place === 'Yes') stats.advancedPollingPlaces++;
      if (place.advanced_polling_place === 'No') stats.unavailablePlaces++;
      if (place.polling_place_status === 'Available') stats.availableStatus++;
      if (place.polling_place_status === 'Unavailable') stats.unavailableStatus++;
    });

    return {
      visibleMarkers: markers,
      totalPlaces: markers.length,
      countyCount: counties.size,
      statistics: stats
    };
  }, [clustersByCategory, hiddenCategories]);

  /**
   * Error state display
   */
  if (error) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg w-full border border-red-200">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  /**
   * No data state display
   */
  if (!clustersByCategory) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg w-full border border-gray-200">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg w-full">
      <div className="flex items-center justify-between gap-3">
        {/* Statistics cards */}
        <StatCard
          title="Total Locations"
          value={totalPlaces}
          icon={<LocationIcon />}
          color="blue"
          subtitle="Visible polling places"
          isLoading={isLoading}
        />

        <StatCard
          title="Counties"
          value={countyCount}
          icon={<CountyIcon />}
          color="green"
          subtitle="Unique counties"
          isLoading={isLoading}
        />

        <StatCard
          title="Early Voting Sites"
          value={`${statistics.advancedPollingPlaces}/${statistics.unavailablePlaces}`}
          icon={<CalendarIcon />}
          color="purple"
          subtitle="Active/Inactive sites"
          isLoading={isLoading}
        />

        <StatCard
          title="Polling Place Status"
          value={`${statistics.availableStatus}/${statistics.unavailableStatus}`}
          icon={<StatusIcon />}
          color="orange"
          subtitle="Available/Unavailable"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default StatisticsPanel;