import { useState } from 'react'
import { useAuth } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'

const Register = ({ handleKeyPress }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [passwordVisibility, setPasswordVisibility] = useState('password')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleRegister = () => {
    if (!name && !email && !password) {
      return setError('Please enter a name, email and password')
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    setLoading(true)
    setError('')

    fetch(import.meta.env.VITE_API_URL + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then(({ response, user }) => {
        console.log(response, user)
        if (response === 'success') {
          login(user)
          navigate('/', { replace: true })
        } else {
          setError(response)
          setEmail('')
          setName('')
          setPassword('')
        }
      })
      .catch((err) => setError('Unable to Register'))
      .finally(() => setLoading(false))
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === 'password' ? 'text' : 'password',
    )
  }

  return (
    <section className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 tc shadow-5 center">
      <div className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                required
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                required
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mv3" onKeyUp={handleKeyPress(handleRegister)}>
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                required
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type={passwordVisibility}
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onClick={togglePasswordVisibility}
              />
              <label className="pa2" htmlFor="checkbox">
                Show Password
              </label>
            </div>
          </fieldset>
          <div className="">
            <button
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              disabled={loading}
              onClick={handleRegister}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
          {error && <div className="lh-copy mt3 red">{error}</div>}
        </div>
      </div>
    </section>
  )
}

export default Register
