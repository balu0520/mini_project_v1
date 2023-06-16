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
  const noPosts = postsCount > 0
  return (
    <div className="user-profile-container">
      <h1 className="user-profile-mobile-view-heading">{userName}</h1>
      <div className="user-profile-view-container">
        <img
          src={profilePic}
          className="user-profile-view-image"
          alt="user profile"
        />
        <div className="user-profile-view-sub-container">
          <h1 className="user-profile-desktop-view-heading">{userName}</h1>
          <div className="user-profile-view-follow-container">
            <div className="user-profile-view-follow-heading-container">
              <h1 className="user-profile-view-follow-heading">{postsCount}</h1>
              <p className="user-follow-para">posts</p>
            </div>
            <div className="user-profile-view-follow-heading-container">
              <h1 className="user-profile-view-follow-heading">
                {followersCount}
              </h1>
              <p className="user-follow-para">followers</p>
            </div>
            <div className="user-profile-view-follow-heading-container">
              <h1 className="user-profile-view-follow-heading">
                {followingCount}
              </h1>
              <p className="user-follow-para">following</p>
            </div>
          </div>
          <p className="user-profile-desktop-view-sub-heading">{userId}</p>
          <p className="user-profile-desktop-view-user-bio">{userBio}</p>
        </div>
      </div>
      <p className="user-profile-mobile-view-sub-heading">{userId}</p>
      <p className="user-profile-mobile-view-user-bio">{userBio}</p>
      <ul className="mt-2 mb-2 d-flex flex-row stories-list">
        {stories.map(eachStory => (
          <li className="user-profile-story-container mr-2" key={eachStory.id}>
            <img
              src={eachStory.image}
              alt="user story"
              className="user-profile-story-image"
            />
          </li>
        ))}
      </ul>
      <div className="user-profile-post-container">
        <div className="user-posts-section-container">
          <BsGrid3X3 height="20" />
          <h1 className="user-posts-section-heading">Posts</h1>
        </div>
        {!noPosts && (
          <div className="user-profile-no-posts-container">
            <div className="user-profile-no-posts-icon-container">
              <BiCamera width="20" color="#262626" />
              <h1 className="user-profile-no-posts-heading">No Posts</h1>
            </div>
          </div>
        )}
        {noPosts && (
          <ul className="user-profile-posts-container d-flex flex-row align-items-center">
            {posts.map(eachPost => (
              <li key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt="user post"
                  className="m-1 user-profile-post-image"
                  key={eachPost.id}
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
