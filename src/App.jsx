import { useState, Suspense, useEffect } from 'react'
import SmoothScroll from './components/base/SmoothScroll'
import Scene1_Hook from './components/scenes/Scene1_Hook'
import Scene2_Origin from './components/scenes/Scene2_Origin'
import Scene3_ForgeACME from './components/scenes/Scene3_ForgeACME'
import Scene4_Projects from './components/scenes/Scene4_Projects'
import Scene5_Craft from './components/scenes/Scene5_Craft'
import Scene6_Future from './components/scenes/Scene6_Future'
import Navbar from './components/ui/Navbar'
import Preloader from './components/ui/Preloader'

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar loading={loading} />
      <div className="grain"></div>

      <main className="bg-[#050505] min-h-screen text-white selection:bg-teal-500 selection:text-black">
        {/* Scene 1: The Hook (Intro) */}
        <Scene1_Hook />

        {/* Scene 2: Origin Story (Timeline) */}
        <Scene2_Origin />

        {/* Scene 3: The Forge (ACME.AI Horizontal Scroll) */}
        <Scene3_ForgeACME />

        {/* Scene 4: The Work (Projects 3D Tilt) */}
        <Scene4_Projects />

        {/* Scene 5: The Craft (Skills & Heatmap) */}
        <Scene5_Craft />

        {/* Scene 6: The Future (Contact) */}
        <Scene6_Future />
      </main>
    </SmoothScroll>
  )
}

export default App
