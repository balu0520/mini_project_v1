import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {isShowMenu: false, searchInput: '', showSearchBtn: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickHamburger = () => {
    this.setState(prevState => ({
      isShowMenu: !prevState.isShowMenu,
    }))
  }

  onClickSearchBtn = () => {
    this.setState(prevState => ({showSearchBtn: !prevState.showSearchBtn}))
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    const {history} = this.props
    const path = `/search/${searchInput}`
    history.replace(path)
  }

  render() {
    const {isShowMenu, searchInput, showSearchBtn} = this.state
    let show = false
    if (isShowMenu && showSearchBtn) {
      show = true
    }
    return (
      <nav className="main-header-section">
        <div className="header-section">
          <div className="header-first-section">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686373787/My%20Brand/website_logo_gin18w.png"
                alt="website logo"
                className="website-logo-image"
              />
            </Link>
            <h1 className="website-logo-heading-section ml-2">Insta Share</h1>
          </div>
          <button
            type="button"
            className="hamburger-menu-button"
            onClick={this.onClickHamburger}
          >
            <GiHamburgerMenu />
          </button>
          <ul className="desktop-view-header-section">
            <li className="desktop-view-search-container-section btn-item">
              <input
                type="search"
                className="search-input-header"
                placeholder="Search Caption"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              {/* testid="searchIcon" */}
              <div className="search-btn-container-section">
                <button
                  type="button"
                  className="search-icon-button"
                  onClick={this.onClickSearch}
                  testid="searchIcon"
                >
                  <FaSearch width="10" height="10" color="#989898" />
                </button>
              </div>
            </li>
            <li className="btn-item">
              <Link to="/" className="nav-link">
                <button type="button" className="desktop-view-button">
                  Home
                </button>
              </Link>
            </li>
            <li className="btn-item">
              <Link to="/my-profile" className="nav-link">
                <button type="button" className="desktop-view-button">
                  Profile
                </button>
              </Link>
            </li>
            <li className="btn-item">
              <button
                type="button"
                className="btn btn-primary desktop-logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {isShowMenu && (
          <div className="mobile-view-container-section">
            <Link to="/" className="nav-link">
              <button type="button" className="mobile-view-button">
                Home
              </button>
            </Link>
            <button
              type="button"
              className="mobile-view-button"
              onClick={this.onClickSearchBtn}
            >
              Search
            </button>
            <Link to="/my-profile" className="nav-link">
              <button type="button" className="mobile-view-button">
                Profile
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary mobile-logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="mobile-view-close-button"
              onClick={this.onClickHamburger}
            >
              <AiFillCloseCircle height="20" width="20" />
            </button>
          </div>
        )}
        {show && (
          <div className="mobile-view-search-main-container-section">
            <div className="mobile-view-search-container-section">
              <input
                type="search"
                className="mobile-search-input-header"
                placeholder="Search Caption"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              {/* testid="searchIcon" */}
              <div className="mobile-search-btn-container-section">
                <button
                  type="button"
                  className="mobile-search-icon-button"
                  onClick={this.onClickSearch}
                  testid="searchIcon"
                >
                  <FaSearch width="10" height="10" color="#989898" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
