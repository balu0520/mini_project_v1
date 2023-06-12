import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {BsHeart} from 'react-icons/bs'
import './index.css'

class SearchResults extends Component {
  state = {isLiked: false}

  onClickLike = async () => {
    await this.setState({isLiked: true})
    this.onToggleLike()
  }

  onClickUnLike = async () => {
    await this.setState({isLiked: false})
    this.onToggleLike()
  }

  onToggleLike = async () => {
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
      userId,
      postId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      comments,
      createdAt,
    } = postData
    const {imageUrl, caption} = postDetails
    const likes = isLiked ? likesCount + 1 : likesCount
    return (
      <div className="each-post-container" key={postId}>
        <div className="each-post-heading">
          <div className="each-post-profile-pic-container">
            <img
              src={profilePic}
              className="each-post-profile-pic"
              alt="post author profile"
            />
          </div>
          <Link className="nav-link" to={`/users/${userId}`}>
            <p className="each-post-profile-name">{userName}</p>
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="each-post-image" />
        <div className="each-post-details-container">
          <div className="post-react-icons-list">
            {/* testid="unLikeIcon" */}
            {isLiked && (
              <button
                type="button"
                onClick={this.onClickUnLike}
                className="like-btn"
                testid="unLikeIcon"
              >
                <FcLike className="each-icon" />
              </button>
            )}
            {/* testid="likeIcon" */}
            {!isLiked && (
              <button
                type="button"
                onClick={this.onClickLike}
                className="like-btn"
                testid="likeIcon"
              >
                <BsHeart className="each-icon" />
              </button>
            )}
            <FaRegComment className="each-icon" />
            <BiShareAlt className="each-icon" />
          </div>
          <p className="each-likes-count">{likes} likes</p>
          <p className="each-caption">{caption}</p>
          <ul className="comments-list-search">
            {comments.map(eachComment => (
              <li
                className="comments-list-item-search"
                key={eachComment.userId}
              >
                <p className="each-comment">
                  <span className="each-commenter">{eachComment.userName}</span>
                  {eachComment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="each-created-at">{createdAt}</p>
        </div>
      </div>
    )
  }
}

export default SearchResults
