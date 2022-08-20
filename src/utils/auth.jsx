import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const initialUser = {
  name: '',
  email: '',
  entries: 0,
  joined: '',
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(initialUser)

  const login = ({ name, email, entries, joined }) => {
    setAuth(true)
    setUser({ name, email, entries, joined })
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
