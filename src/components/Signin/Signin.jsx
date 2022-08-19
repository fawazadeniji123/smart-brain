import { useAuth } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSignin = () => {
    login()
    navigate('/', { replace: true })
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
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                required
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
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
