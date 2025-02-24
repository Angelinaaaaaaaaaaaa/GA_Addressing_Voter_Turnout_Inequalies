import Head from 'next/head'

import Map from '#components/Map'

const MapPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Head>
      <title>Map Example | Jumps tart your new leaflet mapping Project with next.js and typescript 🤩</title>
      <meta
        property="og:title"
        content="Map Example | Jumpstart your new leaflet mapping Project with next.js and typescript 🤩"
        key="title"
      />
      <meta
        name="description"
        content="next-leaflet-starter-typescript is an extensible next.js starter template for the leaflet-maps-react plugin. Written in typescript,
      visually enhanced by tailwind and lucide-react icons."
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
