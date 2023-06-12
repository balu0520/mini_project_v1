import {Component} from 'react'
import {Link} from 'react-router-dom'
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

  //   testId="likeIcon"

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
      userId,
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
          <Link className="nav-link" to={`/users/${userId}`}>
            <p className="post-profile-name">{userName}</p>
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="post-image" />
        <div className="post-details-container">
          <div className="react-icons-list">
            {isLiked && (
              <button
                type="button"
                onClick={this.onToggleLike}
                className="like-btn"
                testid="unLikeIcon"
              >
                <FcLike className="icon" />
              </button>
            )}
            {!isLiked && (
              <button
                type="button"
                onClick={this.onToggleLike}
                className="like-btn"
                testid="likeIcon"
              >
                <BsHeart className="icon" />
              </button>
            )}
            <FaRegComment className="icon" />
            <BiShareAlt className="icon" />
          </div>
          <p className="likes-count">{likes} likes</p>
          <p className="caption">{caption}</p>
          <ul className="comments-list">
            {comments.map(eachComment => (
              <li className="comment-list-item" key={eachComment.userId}>
                <p className="commenter">{eachComment.userName}</p>
                <p className="comment">{eachComment.comment}</p>
              </li>
            ))}
          </ul>
          <p className="created-at">{createdAt}</p>
        </div>
      </div>
    )
  }
}

export default UserInstaPost
