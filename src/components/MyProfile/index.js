import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileData: []}

  componentDidMount() {
    this.renderMyProfileApi()
  }

  getProfileData = data => ({
    id: data.id,
    userId: data.user_id,
    userName: data.userName,
    profilePic: data.profile_pic,
    followersCount: data.followers_count,
    followingCount: data.following_count,
    userBio: data.user_bio,
    posts: data.posts,
    postsCount: data.posts_count,
    stories: data.stories,
  })

  renderMyProfileApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = this.getProfileData(data.profile)
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.renderMyProfileApi()
  }
  //  testid="loader"

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
    const {profileData} = this.state
    return <Profile profileData={profileData} />
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

export default MyProfile
