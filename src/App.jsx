import { useCallback } from 'react'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Signin from './components/Signin/Signin'
import RequireAuth from './components/RequireAuth/RequireAuth'
import NoMatch from './components/NoMatch/NoMatch'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
import './App.css'

const particlesOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 60,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#b4deee',
    },
    links: {
      color: '#b4deee',
      distance: 100,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      directions: 'none',
      enable: true,
      random: true,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 350,
      },
      value: 90,
    },
    opacity: {
      value: 0.3,
    },
    size: {
      value: { min: 1, max: 2 },
    },
  },
  detectRetina: true,
}

const App = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const handleKeyPress =
    (func) =>
    ({ key }) => {
      if (key === 'Enter') {
        func()
      }
    }

  return (
    <AuthProvider>
      <Router>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/signin"
            element={<Signin handleKeyPress={handleKeyPress} />}
          />
          <Route
            path="/register"
            element={<Register handleKeyPress={handleKeyPress} />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
