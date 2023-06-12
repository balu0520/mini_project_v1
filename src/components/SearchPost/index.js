import {Component} from 'react'
import Cookies from 'js-cookie'
import {GrSearchAdvanced} from 'react-icons/gr'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SearchResults from '../SearchResults'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchPost extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    postsData: [],
  }

  componentDidMount() {
    this.getSearchPosts()
  }

  getPostDetails = data => ({
    imageUrl: data.image_url,
    caption: data.caption,
  })

  getComments = commentsList => {
    const newCommentsList = commentsList.map(eachComment => ({
      userId: eachComment.user_id,
      userName: eachComment.user_name,
      comment: eachComment.comment,
    }))
    return newCommentsList
  }

  getSearchPostData = postData => {
    const newPostData = postData.map(eachPost => ({
      postId: eachPost.post_id,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
      profilePic: eachPost.profile_pic,
      postDetails: this.getPostDetails(eachPost.post_details),
      likesCount: eachPost.likes_count,
      comments: this.getComments(eachPost.comments),
      createdAt: eachPost.created_at,
    }))
    return newPostData
  }

  getSearchPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {searchId} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchId}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (data.posts.length !== 0) {
      const formattedData = this.getSearchPostData(data.posts)
      this.setState({
        apiStatus: apiStatusConstants.success,
        postsData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickHamburger = () => {
    this.setState(prevState => ({
      isShowMenu: !prevState.isShowMenu,
    }))
  }

  renderSearchPostFailureView = () => (
    <div className="post-failure-view">
      <img
        src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686545197/search-not-found_wnkk2w.png"
        alt="search not found"
        className="post-failure-view-image"
      />
      <h1 className="post-failure-view-heading">Search Not Found</h1>
      <p className="post-failure-view-para">
        Try different keyword or search again
      </p>
    </div>
  )

  renderPostInitialView = () => (
    <div className="post-initial-view">
      <GrSearchAdvanced width="36" height="36" color="#DBDBDB" />
      <h1 className="post-initial-view-heading">
        Search Results will be appear here
      </h1>
    </div>
  )

  //   testid="loader"

  renderPostLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostSuccessView = () => {
    const {postsData} = this.state
    return (
      <ul className="search-results-container">
        {postsData.map(eachPost => (
          <li>
            <SearchResults postData={eachPost} key={eachPost.postId} />
          </li>
        ))}
      </ul>
    )
  }

  renderPost = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPostSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderPostLoadingView()
      case apiStatusConstants.failure:
        return this.renderSearchPostFailureView()
      default:
        return this.renderPostInitialView()
    }
  }

  render() {
    return (
      <div className="post-container">
        {/* <nav className="main-header">
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
                  ref={this.inputRef}
                />
                <div className="search-btn-container">
                  <button
                    type="button"
                    className="search-icon-btn"
                    onClick={this.onClickSearch}
                    testid="searchIcon"
                  >
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
          <div className="mobile-view-search-container">
            <input
              type="search"
              className="search-input-mobile"
              value={searchInput}
              placeholder="Search Caption"
              onChange={this.onChangeSearchInput}
              ref={this.inputRef}
            />
            <div className="mobile-view-search-btn-container">
              <button
                type="button"
                className="search-icon-btn-mobile"
                onClick={this.onClickSearch}
                testid="searchIcon"
              >
                <FaSearch width="10" height="10" color="#989898" />
              </button>
            </div>
          </div>
        </nav> */}
        <Header />
        {this.renderPost()}
      </div>
    )
  }
}

export default SearchPost
