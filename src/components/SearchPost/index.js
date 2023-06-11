import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class SearchPost extends Component {
  state = {isShowMenu: false, searchInput: ''}

  onClickHamburger = () => {
    this.setState(prevState => ({
      isShowMenu: !prevState.isShowMenu,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {isShowMenu, searchInput} = this.state
    return (
      <nav className="main-header">
        <div className="header">
          <div className="header-first">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686373787/My%20Brand/website_logo_gin18w.png"
                alt="website logo"
                className="website-logo-image"
              />
            </Link>
            <h1 className="website-logo-heading ml-2">Insta Share</h1>
          </div>
          <button
            type="button"
            className="hamburger-menu-btn"
            onClick={this.onClickHamburger}
          >
            <GiHamburgerMenu />
          </button>
          <ul className="desktop-view-header">
            <li className="desktop-view-search-container list-item">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                placeholder="Search Caption"
                onChange={this.onChangeSearchInput}
              />
              <div className="search-btn-container">
                <button type="button" className="search-icon-btn">
                  <FaSearch width="10" height="10" color="#989898" />
                </button>
              </div>
            </li>
            <li className="list-item">
              <Link to="/" className="nav-link">
                <button type="button" className="desktop-view-btn">
                  Home
                </button>
              </Link>
            </li>
            <li className="list-item">
              <Link to="/my-profile" className="nav-link">
                <button type="button" className="desktop-view-btn">
                  Profile
                </button>
              </Link>
            </li>
            <li className="list-item">
              <button
                type="button"
                className="btn btn-primary desktop-logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {isShowMenu && (
          <div className="mobile-view-container">
            <Link to="/" className="nav-link">
              <button type="button" className="mobile-view-btn">
                Home
              </button>
            </Link>
            <Link to="/search" className="nav-link">
              <button type="button" className="mobile-view-btn">
                Search
              </button>
            </Link>
            <Link to="/my-profile" className="nav-link">
              <button type="button" className="mobile-view-btn">
                Profile
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary mobile-logout-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="mobile-view-close-btn"
              onClick={this.onClickHamburger}
            >
              <AiFillCloseCircle height="20" width="20" />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default SearchPost
