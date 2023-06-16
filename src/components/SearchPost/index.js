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
  failed: 'FAILED',
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
    if (response.ok === true) {
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
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
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

  onClickRetry = () => {
    this.getSearchPosts()
  }

  renderSearchPostFailedView = () => (
    <div className="search-failure-container">
      <img
        src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686394852/failure_logo_t31neg.png"
        alt="failure view"
        className="search-failure-icon"
      />
      <p className="search-failure-heading">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onClickRetry}
      >
        Try again
      </button>
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
      <div className="search-container">
        <h1 className="search-results-heading">Search Results</h1>
        <ul className="search-results-main-container">
          {postsData.map(eachPost => (
            <li key={eachPost.postId} className="">
              <SearchResults key={eachPost.postId} postData={eachPost} />
            </li>
          ))}
        </ul>
      </div>
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
      case apiStatusConstants.failed:
        return this.renderSearchPostFailedView()
      default:
        return this.renderPostInitialView()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="post-container">{this.renderPost()}</div>
      </>
    )
  }
}

export default SearchPost
