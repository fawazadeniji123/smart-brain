import { useAuth } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Signin = ({ handleKeyPress }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [passwordVisibility, setPasswordVisibility] = useState('password')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSignin = () => {
    if (!email || !password) {
      return setError('Please enter an email and password')
    }

    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then(({ response, user }) => {
        if (response === 'success') {
          login(user)
          setError('')
          navigate('/', { replace: true })
        } else {
          setError(response)
          setPassword('')
        }
      })
      .catch((err) => setError('Unable to sign in'))
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
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
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
            <div className="mv3" onKeyUp={handleKeyPress(handleSignin)}>
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
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={handleSignin}
            />
          </div>
          {error && <div className="lh-copy mt3 red">{error}</div>}
          <div className="lh-copy mt3">
            <a
              href="#0"
              className="f6 link dim black db"
              onClick={() => navigate('/register')}
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin
