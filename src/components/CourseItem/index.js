import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {course} = props
  const {id, name, logoUrl} = course

  return (
    <Link to={`/courses/${id}`} className="nav-item">
      <li key={id} className="list-item">
        <img src={logoUrl} alt={name} className="logo" />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
