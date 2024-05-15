import './index.css'

const SkillsRoute = props => {
  const {eachSkill} = props

  return (
    <li className="skill-item-container">
      <img
        src={eachSkill.image_url}
        alt={eachSkill.name}
        className="skill-image"
      />
      <p className="skill-name">{eachSkill.name}</p>
    </li>
  )
}

export default SkillsRoute
