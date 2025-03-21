import Head from 'next/head'
import type {NextPage} from 'next'
import {useMemo, useState, useCallback} from 'react'
import Map from '#components/Map'
import StatisticsPanel from '#components/Map/StatisticsPanel'
import {PlacesType} from '#lib/Places'
import {Category} from '#lib/MarkerCategories'

const MapPage: NextPage = () => {
    /**
     * MapPage Component
     *
     * A full-page component that displays an interactive map of Georgia's voter turnout data.
     * It includes a statistics panel and a map visualization with clustering capabilities.
     *
     * Features:
     * - Interactive map with marker clustering
     * - Real-time statistics panel
     * - Category-based filtering
     * - Loading and error states
     * - Responsive design
     */
        // State management for map data and UI
    const [clustersByCategory, setClustersByCategory] = useState<Record<Category, PlacesType> | undefined>(undefined);
    const [hiddenCategories, setHiddenCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>(undefined);

    /**
     * Handles clusters data updates from the map
     */
    const handleClustersChange = useCallback((clusters: Record<Category, PlacesType>) => {
        setClustersByCategory(clusters);
        setIsLoading(false);
    }, []);

    /**
     * Handles hidden categories updates from the map
     */
    const handleHiddenCategoriesChange = useCallback((categories: Category[]) => {
        setHiddenCategories(categories);
    }, []);

    /**
     * Handles map loading errors
     */
    const handleMapError = useCallback((err: Error) => {
        setError(err);
        setIsLoading(false);
    }, []);

    /**
     * Handles successful map loading
     */
    const handleMapLoad = useCallback(() => {
        setIsLoading(false);
        setError(undefined);
    }, []);

    /**
     * Memoized statistics data
     */
    const statisticsData = useMemo(() => ({
        clustersByCategory,
        hiddenCategories,
        isLoading,
        error
    }), [clustersByCategory, hiddenCategories, isLoading, error]);

    /**
     * Handles page reload for error recovery
     * Triggers a full page refresh to reset the application state
     */
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Page Metadata */}
            <Head>
                <title>Voter Turnout Map | GA Addressing Voter Turnout Inequalities</title>
                <meta
                    property="og:title"
                    content="Interactive Voter Turnout Map | Visualizing Electoral Participation Across Georgia"
                    key="title"
                />
                <meta
                    name="description"
                    content="Explore Georgia's voter turnout patterns through our interactive map visualization. Analyze demographic data and participation rates across different regions."
                />
            </Head>

            {/* Statistics Panel Section */}
            <div className="h-[240px] p-5 bg-gray-50 border-b border-gray-200">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Georgia Voter Turnout Map</h1>
                    <StatisticsPanel {...statisticsData} />
                </div>
            </div>

            {/* Map Section */}
            <div className="flex-1 overflow-hidden relative">
                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                )}

                {/* Error Overlay */}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="text-red-500 text-center p-4">
                            <p className="font-bold">Error loading map</p>
                            <p className="text-sm">{error.message}</p>
                            <button
                                onClick={handleRetry}
                                className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Interactive Map Component */}
                <Map
                    onClustersChange={handleClustersChange}
                    onHiddenCategoriesChange={handleHiddenCategoriesChange}
                    onError={handleMapError}
                    onLoad={handleMapLoad}
                />
            </div>
        </div>
    );
};

export default MapPage;