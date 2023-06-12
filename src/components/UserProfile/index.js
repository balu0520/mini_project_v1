import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import LoadUserProfile from '../LoadUserProfile'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, userProfileData: []}

  componentDidMount() {
    this.renderUserProfileApi()
  }

  getUserProfileData = data => ({
    userDetails: this.getProfileData(data.user_details),
  })

  getProfileData = data => ({
    id: data.id,
    userId: data.user_id,
    userName: data.user_name,
    profilePic: data.profile_pic,
    followersCount: data.followers_count,
    followingCount: data.following_count,
    userBio: data.user_bio,
    posts: data.posts,
    postsCount: data.posts_count,
    stories: data.stories,
  })

  renderUserProfileApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const userProfileData = this.getUserProfileData(data)
      this.setState({
        apiStatus: apiStatusConstants.success,
        userProfileData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.renderMyProfileApi()
  }

  renderMyProfileLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfileFailureView = () => (
    <div className="failure-profile-container">
      <img
        src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686394852/failure_logo_t31neg.png"
        alt="failure view"
        className="failure-profile-icon"
      />
      <h1 className="failure-profile-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderMyProfileSuccessView = () => {
    const {userProfileData} = this.state
    return <LoadUserProfile userProfileData={userProfileData} />
  }

  renderMyProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderMyProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderMyProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderMyProfile()}
      </>
    )
  }
}

export default UserProfile
