import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

const Profile = props => {
  const {profileData} = props
  const {
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    posts,
    postsCount,
    stories,
  } = profileData
  const noPosts = postsCount === 0
  return (
    <div className="profile-container">
      <h1 className="profile-mobile-view-heading">{userName}</h1>
      <div className="profile-desktop-view-container">
        <img
          src={profilePic}
          className="profile-desktop-view-image"
          alt="my profile"
        />
        <div className="profile-desktop-view-sub-container">
          <h1 className="profile-desktop-view-heading">{userName}</h1>
          <div className="profile-desktop-view-follow-container">
            <h1 className="profile-desktop-view-follow-heading">
              {postsCount} <span className="follow">posts</span>
            </h1>
            <h1 className="profile-desktop-view-follow-heading">
              {followersCount} <span className="follow">followers</span>
            </h1>
            <h1 className="profile-desktop-view-follow-heading">
              {followingCount} <span className="follow">following</span>
            </h1>
          </div>
          <h1 className="profile-desktop-view-sub-heading">{userName}</h1>
          <h1 className="profile-desktop-view-user-bio">{userBio}</h1>
        </div>
      </div>
      <div className="profile-mobile-view-container">
        <div className="profile-mobile-view-sub-container">
          <img
            src={profilePic}
            alt="my profile"
            className="profile-mobile-view-image"
          />
          <div className="profile-mobile-view-follow-container">
            <h1 className="profile-mobile-view-follow-heading">{postsCount}</h1>
            <h1 className="profile-desktop-view-follow-heading-1">posts</h1>
          </div>
          <div className="profile-mobile-view-follow-container">
            <h1 className="profile-mobile-view-follow-heading">
              {followersCount}
            </h1>
            <h1 className="profile-desktop-view-follow-heading-1">followers</h1>
          </div>
          <div className="profile-mobile-view-follow-container">
            <h1 className="profile-mobile-view-follow-heading">
              {followingCount}
            </h1>
            <h1 className="profile-desktop-view-follow-heading-1">following</h1>
          </div>
        </div>
        <h1 className="profile-mobile-view-sub-heading">{userName}</h1>
        <h1 className="profile-mobile-view-user-bio">{userBio}</h1>
      </div>
      <div className="mt-2 mb-2 d-flex flex-row">
        {stories.map(eachStory => (
          <div className="profile-story-container mr-2" key={eachStory.id}>
            <img
              src={eachStory.image}
              alt="my story"
              className="profile-story-image"
            />
          </div>
        ))}
      </div>
      <div className="profile-post-container">
        <div className="posts-section-container">
          <BsGrid3X3 height="20" />
          <h1 className="posts-section-heading">Posts</h1>
        </div>
        {noPosts && (
          <div className="profile-no-posts-container">
            <div className="profile-no-posts-icon-container">
              <BiCamera width="20" color="#262626" />
              <h1 className="profile-no-posts-heading">No Posts Yet</h1>
            </div>
          </div>
        )}
        {!noPosts && (
          <div className="profile-posts-container d-flex flex-row align-items-center">
            {posts.map(eachPost => (
              <img
                src={eachPost.image}
                alt="my post"
                className="m-1 profile-post-image"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
