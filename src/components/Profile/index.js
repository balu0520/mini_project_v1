import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

const Profile = props => {
  const {profileData} = props
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
  } = profileData
  const noPosts = postsCount === 0
  return (
    <div className="profile-container">
      <h1 className="profile-mobile-view-heading">{userName}</h1>
      <div className="profile-view-container">
        <img src={profilePic} className="profile-view-image" alt="my profile" />
        <div className="profile-view-sub-container">
          <h1 className="profile-desktop-view-heading">{userName}</h1>
          <div className="profile-view-follow-container">
            <div className="profile-view-follow-heading-container">
              <h1 className="profile-view-follow-heading">{postsCount}</h1>
              <p className="follow-para">posts</p>
            </div>
            <div className="profile-view-follow-heading-container">
              <h1 className="profile-view-follow-heading">{followersCount}</h1>
              <p className="follow-para">followers</p>
            </div>
            <div className="profile-view-follow-heading-container">
              <h1 className="profile-view-follow-heading">{followingCount}</h1>
              <p className="follow-para">following</p>
            </div>
          </div>
          <p className="profile-desktop-view-sub-heading">{userId}</p>
          <p className="profile-desktop-view-user-bio">{userBio}</p>
        </div>
      </div>
      <p className="profile-mobile-view-sub-heading">{userId}</p>
      <p className="profile-mobile-view-user-bio">{userBio}</p>
      <ul className="profile-story-container mt-2 mb-2 d-flex flex-row">
        {stories.map(eachStory => (
          <li className="profile-story-sub-container mr-2" key={eachStory.id}>
            <img
              src={eachStory.image}
              alt="my story"
              className="profile-story-image"
            />
          </li>
        ))}
      </ul>
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
          <ul className="profile-posts-container d-flex flex-row align-items-center">
            {posts.map(eachPost => (
              <li key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt="my post"
                  className="m-1 profile-post-image"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Profile
