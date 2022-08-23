import { useAuth } from '../../utils/auth'

const Rank = () => {
  const { user } = useAuth()

  return (
    <div className="tc">
      <div className="white f3">{`${user.user_name[0].toUpperCase()}${user.user_name
        .slice(1)
        .trim()}, your current entry count is...`}</div>
      <div className="white f1">{`#${user.entries}`}</div>
    </div>
  )
}

export default Rank
