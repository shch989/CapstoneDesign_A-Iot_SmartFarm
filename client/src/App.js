import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const Layout = ({ children }) => {
  // 현재 경로를 가져오기 위해 useLocation hook을 사용.
  const { pathname } = useLocation()

  // 로그인 페이지와 회원가입 페이지에는 Navbar와 Footer를 제외.
  if (pathname === '/login' || pathname === '/register') {
    return <main>{children}</main>
  }

  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}

const NotFoundPage = () => {
  return <h1>Page Not Found</h1>
}

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
