import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'


const SearchResults = props = {
  const {postData} = props 
  const {postId,userId,userName,profilePic,postDetails,likesCount,comments,createdAt,postDetails} = postData
  const {imageUrl,caption} = postDetails

    return(
        <div className="each-post-container">
            <div className="each-post-heading">
                <div className="each-post-profile-pic-container">
                    <img
                    src={profilePic}
                    className="each-post-profile-pic"
                    alt="post author profile"
                    />
                </div>
                <p className="each-post-profile-name">{userName}</p>
            </div>
             <img src={imageUrl} alt="post" className="each-post-image" />
             <div className="each-post-details-container">
                <div className="post-react-icons-list">
                    <FcLike className="each-icon" />
                    <FaRegComment className="each-icon" />
                    <BiShareAlt className="each-icon" />
                </div>
                <h1 className="each-likes-count">{likesCount} likes</h1>
                <h1 className="each-caption">{caption}</h1>
                {comments.map(eachComment => (
                    <h1 className="each-commenter" key={eachComment.userId}>
                    {eachComment.userName}
                    <span className="each-comment">{eachComment.comment}</span>
                    </h1>
                ))}
                <h1 className="each-created-at">{createdAt}</h1>
            </div>
        </div>
    )
}

export default SearchResults