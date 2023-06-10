import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaRegComment} from 'react-icons/fa'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

class UserInstaPost extends Component {
  state = {isLiked: false}

  liking = async () => {
    await this.setState(prevState => ({isLiked: !prevState.isLiked}))
  }

  onToggleLike = async () => {
    this.liking()
    const {isLiked} = this.state
    const {postData} = this.props
    const stat = {like_status: isLiked}
    const {postId} = postData
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
      body: JSON.stringify(stat),
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
    }
  }

  render() {
    const {postData} = this.props
    const {isLiked} = this.state
    const {
      postId,
      profilePic,
      userName,
      postDetails,
      likesCount,
      comments,
      createdAt,
    } = postData
    const {imageUrl, caption} = postDetails
    const likes = isLiked ? likesCount + 1 : likesCount
    return (
      <div className="post-container" key={postId}>
        <div className="post-heading">
          <div className="post-profile-pic-container">
            <img
              src={profilePic}
              className="post-profile-pic"
              alt="post author profile"
            />
          </div>
          <p className="post-profile-name">{userName}</p>
        </div>
        <img src={imageUrl} alt="post" className="post-image" />
        <div className="post-details-container">
          <div className="react-icons-list">
            {isLiked && (
              <FcLike className="icon like" onClick={this.onToggleLike} />
            )}
            {!isLiked && (
              <BsHeart className="icon like" onClick={this.onToggleLike} />
            )}
            <FaRegComment className="icon" />
            <BiShareAlt className="icon" />
          </div>
          <h1 className="likes-count">{likes} likes</h1>
          <h1 className="caption">{caption}</h1>
          {comments.map(eachComment => (
            <h1 className="commenter" key={eachComment.userId}>
              {eachComment.userName}{' '}
              <span className="comment">{eachComment.comment}</span>
            </h1>
          ))}
          <h1 className="created-at">{createdAt}</h1>
        </div>
      </div>
    )
  }
}

export default UserInstaPost
