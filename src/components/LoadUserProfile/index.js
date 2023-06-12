import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

const Profile = props => {
  const {userProfileData} = props
  const {userDetails} = userProfileData
  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    posts,
    postsCount,
    stories,
  } = userDetails
  console.log(userName)
  const noPosts = postsCount === 0
  return (
    <div className="user-profile-container">
      <h1 className="user-profile-mobile-view-heading">{userName}</h1>
      <div className="user-profile-desktop-view-container">
        <img
          src={profilePic}
          className="user-profile-desktop-view-image"
          alt="user profile"
        />
        <div className="user-profile-desktop-view-sub-container">
          <h1 className="user-profile-desktop-view-heading">{userName}</h1>
          <div className="user-profile-desktop-view-follow-container">
            <h1 className="user-profile-desktop-view-follow-heading">
              {postsCount} <span className="follow">posts</span>
            </h1>
            <h1 className="user-profile-desktop-view-follow-heading">
              {followersCount} <span className="follow">followers</span>
            </h1>
            <h1 className="user-profile-desktop-view-follow-heading">
              {followingCount} <span className="follow">following</span>
            </h1>
          </div>
          <h1 className="user-profile-desktop-view-sub-heading">{userId}</h1>
          <h1 className="user-profile-desktop-view-user-bio">{userBio}</h1>
        </div>
      </div>
      <div className="user-profile-mobile-view-container">
        <div className="user-profile-mobile-view-sub-container">
          <img
            src={profilePic}
            alt="user profile"
            className="profile-mobile-view-image"
          />
          <div className="user-profile-mobile-view-follow-container">
            <h1 className="user-profile-mobile-view-follow-heading">
              {postsCount}
            </h1>
            <h1 className="user-profile-desktop-view-follow-heading-1">
              posts
            </h1>
          </div>
          <div className="user-profile-mobile-view-follow-container">
            <h1 className="user-profile-mobile-view-follow-heading">
              {followersCount}
            </h1>
            <h1 className="user-profile-desktop-view-follow-heading-1">
              followers
            </h1>
          </div>
          <div className="user-profile-mobile-view-follow-container">
            <h1 className="user-profile-mobile-view-follow-heading">
              {followingCount}
            </h1>
            <h1 className="user-profile-desktop-view-follow-heading-1">
              following
            </h1>
          </div>
        </div>
        <h1 className="user-profile-mobile-view-sub-heading">{userName}</h1>
        <h1 className="user-profile-mobile-view-user-bio">{userBio}</h1>
      </div>
      <div className="mt-2 mb-2 d-flex flex-row">
        {stories.map(eachStory => (
          <div className="user-profile-story-container mr-2" key={eachStory.id}>
            <img
              src={eachStory.image}
              alt="user story"
              className="user-profile-story-image"
            />
          </div>
        ))}
      </div>
      <div className="user-profile-post-container">
        <div className="user-posts-section-container">
          <BsGrid3X3 height="20" />
          <h1 className="user-posts-section-heading">Posts</h1>
        </div>
        {noPosts && (
          <div className="user-profile-no-posts-container">
            <div className="user-profile-no-posts-icon-container">
              <BiCamera width="20" color="#262626" />
              <h1 className="user-profile-no-posts-heading">No Posts Yet</h1>
            </div>
          </div>
        )}
        {!noPosts && (
          <div className="user-profile-posts-container d-flex flex-row align-items-center">
            {posts.map(eachPost => (
              <img
                src={eachPost.image}
                alt="user post"
                className="m-1 user-profile-post-image"
                key={eachPost.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
