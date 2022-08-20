import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({})

  const login = (userData) => {
    setAuth(true)
    setUser(userData)
  }

  const logout = () => {
    setAuth(false)
  }

  return (
    <AuthContext.Provider value={{ auth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
