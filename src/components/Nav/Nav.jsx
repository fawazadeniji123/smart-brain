import { NavLink } from 'react-router-dom'
import { useAuth } from '../../utils/auth'
import './Nav.css'

const Nav = () => {
  const { logout, auth } = useAuth()

  const handleSignout = () => {
    logout()
  }

  if (auth) {
    return (
      <nav className="primary-nav">
        <NavLink
          className="f3 link dim black underline pa3 pointer active"
          to={'/signin'}
          onClick={handleSignout}
        >
          Sign Out
        </NavLink>
      </nav>
    )
  } 

  return (
    <nav className='primary-nav'>
          <NavLink
            className="f3 link dim black underline pa3 pointer"
            to={'/register'}
          >
            Register
          </NavLink>
          <NavLink
            className="f3 link dim black underline pa3 pointer"
            to={'/signin'}
          >
            Signin
          </NavLink>
    </nav>
  )
}

export default Nav
