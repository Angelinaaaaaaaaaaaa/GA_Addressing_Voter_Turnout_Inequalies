import Head from 'next/head'
import { useEffect, useState } from 'react'
import Map from '#components/Map'
import StatisticsPanel from '#components/Map/StatisticsPanel'
import { Places, PlacesType } from '#lib/Places'
import { Category } from '#lib/MarkerCategories'

const MapPage = () => {
  /**
   * State for managing clusters and hidden categories
   */
  const [clustersByCategory, setClustersByCategory] = useState<Record<Category, PlacesType>>();
  const [hiddenCategories, setHiddenCategories] = useState<Category[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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

      {/* Upper section with statistics */}
      <div style={{ height: '240px', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Georgia Voter Turnout Map</h1>
          <StatisticsPanel 
            clustersByCategory={clustersByCategory}
            hiddenCategories={hiddenCategories}  // Pass hidden categories
          />
        </div>
      </div>

      {/* Lower section with map */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Map 
          onClustersChange={setClustersByCategory}
          onHiddenCategoriesChange={setHiddenCategories}  // Add callback for hidden categories
        />
      </div>
    </div>
  );
};

export default MapPage
