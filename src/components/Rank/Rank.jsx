import { useAuth } from '../../utils/auth'

const Rank = () => {
  const { user } = useAuth()

  return (
    <div className="tc">
      <div className="white f3">{`${user.name}, your current rank is...`}</div>
      <div className="white f1">{`#${user.entries}`}</div>
    </div>
  )
}

export default Rank
