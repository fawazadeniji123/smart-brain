import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const initialUser = {
  id: '',
  user_name: '',
  email: '',
  entries: 0,
  joined: '',
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(initialUser)

  const login = (user) => {
    setAuth(true)
    setUser(user)
  }

  const logout = () => {
    setAuth(false)
  }

  return (
    <AuthContext.Provider value={{ auth, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
