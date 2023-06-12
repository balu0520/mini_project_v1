import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686549959/not-found_qhvv8e.png"
      alt="page not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="nav-link">
      <button type="button" className="btn btn-primary">
        Home page
      </button>
    </Link>
  </div>
)

export default NotFound
