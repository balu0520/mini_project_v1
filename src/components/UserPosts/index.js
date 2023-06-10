import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {RiAlertFill} from 'react-icons/ri'
import UserInstaPost from '../UserInstaPost'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {apiStatusPost: apiStatusConstants.initial, posts: []}

  componentDidMount() {
    this.renderPostApi()
  }

  getPostDetails = eachItem => ({
    imageUrl: eachItem.image_url,
    caption: eachItem.caption,
  })

  getComments = comments => {
    const newComments = comments.map(eachComment => ({
      userName: eachComment.user_name,
      userId: eachComment.user_id,
      comment: eachComment.comment,
    }))
    return newComments
  }

  getPostData = data => {
    const newPostData = data.map(item => ({
      postId: item.post_id,
      userId: item.user_id,
      userName: item.user_name,
      profilePic: item.profile_pic,
      postDetails: this.getPostDetails(item.post_details),
      likesCount: item.likes_count,
      comments: this.getComments(item.comments),
      createdAt: item.created_at,
    }))
    return newPostData
  }

  renderPostApi = async () => {
    this.setState({apiStatusPost: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const {posts} = await response.json()
      const postData = this.getPostData(posts)
      this.setState({
        apiStatusPost: apiStatusConstants.success,
        posts: postData,
      })
    } else {
      this.setState({apiStatusPost: apiStatusConstants.failure})
    }
  }

  onClickTryPost = () => {
    this.renderPostApi()
  }

  renderPostFailureView = () => (
    <div className="post-failure-container">
      <RiAlertFill className="post-failure-icon bg-primary" />
      <h1 className="post-failure-icon-heading">
        Something Went Wrong. Please try again
      </h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onClickTryPost}
      >
        Retry
      </button>
    </div>
  )

  renderPostLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostSuccessView = () => {
    const {posts} = this.state
    return (
      <div className="posts-container">
        {posts.map(eachPost => (
          <UserInstaPost key={eachPost.postId} postData={eachPost} />
        ))}
      </div>
    )
  }

  renderPost = () => {
    const {apiStatusPost} = this.state
    switch (apiStatusPost) {
      case apiStatusConstants.success:
        return this.renderPostSuccessView()
      case apiStatusConstants.failure:
        return this.renderPostFailureView()
      case apiStatusConstants.inProgress:
        return this.renderPostLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderPost()}</>
  }
}

export default UserPosts
