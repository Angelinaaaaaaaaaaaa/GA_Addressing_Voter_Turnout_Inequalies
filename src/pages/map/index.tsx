import Head from 'next/head'

import Map from '#components/Map'

const MapPage = () => (
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

    {/* Upper section, fixed height of 240px */}
    <div style={{ height: '240px', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1>Next.js Leaflet Starter</h1>
      {/* You can add any other content in this section */}
    </div>

    {/* Lower section, takes the remaining height */}
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <Map />
    </div>
  </div>
)

export default MapPage
