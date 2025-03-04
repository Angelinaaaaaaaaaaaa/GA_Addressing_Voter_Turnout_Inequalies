import React, { useMemo } from 'react';
import { PlacesType } from '#lib/Places';
import { Category } from '#lib/MarkerCategories';

interface StatisticsPanelProps {
  clustersByCategory?: Record<Category, PlacesType>;
  isLoading?: boolean;
  error?: Error;
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

// Separate card component for better reusability
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle: string;
  isLoading?: boolean;
}> = ({ title, value, icon, color, subtitle, isLoading }) => (
  <div className={`bg-${color}-100 p-3 rounded-lg border-2 border-${color}-300 flex-1 hover:bg-${color}-200 transition-colors relative min-h-[120px]`}>
    <div className="flex items-center justify-between mb-1">
      <p className={`text-sm font-semibold text-${color}-800`}>{title}</p>
      <span className={`text-${color}-600`}>{icon}</span>
    </div>
    <p className={`text-2xl font-bold text-${color}-900 mb-6 ${isLoading ? 'animate-pulse' : ''}`}>
      {isLoading ? '...' : value}
    </p>
    <p className={`absolute bottom-0 right-3 text-xs text-${color}-600`}>{subtitle}</p>
  </div>
);

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ 
  clustersByCategory,
  isLoading = false,
  error 
}) => {
  // Calculate statistics based on visible markers
  const visibleMarkers = useMemo(() => 
    clustersByCategory 
      ? Object.values(clustersByCategory).flatMap(markers => markers)
      : [],
    [clustersByCategory]
  );
  
  const totalPlaces = visibleMarkers.length;
  
  // Get unique counties from visible markers
  const countyCount = useMemo(() => 
    new Set(visibleMarkers.map(marker => marker.county)).size,
    [visibleMarkers]
  );

  // Calculate all statistics in one pass with validation
  const statistics = useMemo(() => {
    const stats = {
      advancedPollingPlaces: 0,
      unavailablePlaces: 0,
      availableStatus: 0,
      unavailableStatus: 0
    };

    visibleMarkers.forEach(place => {
      // Validate data before counting
      if (place.advanced_polling_place === 'Yes') stats.advancedPollingPlaces++;
      if (place.advanced_polling_place === 'No') stats.unavailablePlaces++;
      if (place.polling_place_status === 'Available') stats.availableStatus++;
      if (place.polling_place_status === 'Unavailable') stats.unavailableStatus++;
    });

    return stats;
  }, [visibleMarkers]);

  if (error) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg w-full border border-red-200">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!clustersByCategory) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg w-full border border-gray-200">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg w-full border border-gray-200">
      <div className="flex items-center justify-between gap-3">
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