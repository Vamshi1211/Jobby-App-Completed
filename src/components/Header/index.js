import {Link, withRouter} from 'react-router-dom'
import {FaHome, FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-image"
          />
        </Link>
        <ul className="mobile-icons-container">
          <li className="mobile-icon-item-container">
            <Link to="/" className="icon-link-item">
              <FaHome className="home-icon" />
            </Link>
          </li>

          <li className="mobile-icon-item-container">
            <Link to="/jobs" className="icon-link-item">
              <FaBriefcase className="home-icon" />
            </Link>
          </li>

          <li className="mobile-icon-item-container">
            <button type="button" className="button" onClick={onLogout}>
              <FiLogOut className="home-icon" />.
            </button>
          </li>
        </ul>
      </div>

      <div className="navbar-website-container">
        <div className="nav-image-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website-logo"
              className="nav-image"
            />
          </Link>
        </div>
        <ul className="nav-info-container">
          <Link to="/" className="nav-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
