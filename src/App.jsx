import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Stats from './pages/Stats'
import CodeforcesStats from './pages/CodeforcesStats'
import GithubStats from './pages/GithubStats'
import AIInsights from './pages/AIInsights'
import About from './pages/About'
import { UserDataProvider } from './context/UserDataContext'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserDataProvider>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/codeforces" element={<CodeforcesStats />} />
            <Route path="/github" element={<GithubStats />} />
            <Route path="/insights" element={<AIInsights />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </UserDataProvider>
    </div>
  )
}

export default App