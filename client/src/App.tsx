import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import GraphPage from './pages/GraphPage'
import NotFoundPage from './pages/NotFoundPage'
import ControlPage from './pages/ControlPage'
import CctvPage from './pages/CctvPage'
import FeedBackPage from './pages/FeedBackPage'
// Components
import Layout from './components/UI/Layout'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/control" element={<ControlPage />} />
            <Route path="/cctv" element={<CctvPage />} />
            <Route path="/feedback" element={<FeedBackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
