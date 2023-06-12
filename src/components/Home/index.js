import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserPosts from '../UserPosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatusSlick: apiStatusConstants.initial,
    userStories: [],
  }

  componentDidMount() {
    this.renderSlickApi()
  }

  getUserStoriesData = storiesData => {
    const newUserStoriesData = storiesData.map(data => ({
      userId: data.user_id,
      userName: data.user_name,
      storyUrl: data.story_url,
    }))
    return newUserStoriesData
  }

  getUserStories = data => ({
    userStoriesData: this.getUserStoriesData(data.users_stories),
    total: data.total,
  })

  renderSlickApi = async () => {
    this.setState({apiStatusSlick: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {userStoriesData} = this.getUserStories(data)
      this.setState({
        apiStatusSlick: apiStatusConstants.success,
        userStories: userStoriesData,
      })
    } else {
      this.setState({apiStatusSlick: apiStatusConstants.failure})
    }
  }
  //   testid="loader"

  renderSlickLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSlickSuccessView = () => {
    const {userStories} = this.state
    const screenWidth = window.innerWidth
    let slides = null
    if (screenWidth >= 1200) {
      slides = 7
    } else if (screenWidth >= 992) {
      slides = 6
    } else if (screenWidth >= 768) {
      slides = 5
    } else {
      slides = 4
    }
    const settings = {
      dots: false,
      arrows: true,
      centerPadding: '0',
      infinite: false,
      speed: 500,
      slidesToShow: slides,
      slidesToScroll: 1,
    }
    return (
      <div className="stories-container-1">
        <Slider {...settings} className="story-container" slick-prev slick-next>
          {userStories.map(item => (
            <div key={item.userId} className="stories">
              <img
                src={item.storyUrl}
                alt="user story"
                className="story-image"
              />

              <p className="user-story">{item.userName}</p>
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  onClickTrySlick = () => {
    this.renderSlickApi()
  }

  renderSlickFailureView = () => (
    <div className="slick-failure-container">
      <img
        src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686394852/failure_logo_t31neg.png"
        alt="failure view"
        className="home-failure-view-image"
      />
      <h1 className="slick-failure-icon-heading">
        Something Went Wrong. Please try again
      </h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onClickTrySlick}
      >
        Try again
      </button>
    </div>
  )

  // testid="Loader"

  renderSlick = () => {
    const {apiStatusSlick} = this.state
    switch (apiStatusSlick) {
      case apiStatusConstants.success:
        return this.renderSlickSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderSlickLoadingView()
      case apiStatusConstants.failure:
        return this.renderSlickFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="stories-container">
          {this.renderSlick()}
          <UserPosts />
        </div>
      </>
    )
  }
}

export default Home
