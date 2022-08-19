import { useAuth } from '../../utils/auth'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const { auth } = useAuth()
  const location = useLocation()

  if (!auth) {
    return <Navigate to={'/signin'} state={{ path: location.pathname }} />
  }

  return <>{children}</>
}

export default RequireAuth
