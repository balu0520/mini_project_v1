import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

import {Button} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <Navbar bg="light" expand="lg" className="nav-bar-container">
      <Container fluid>
        <div className="mobile-view-header">
          <img
            src="https://res.cloudinary.com/daz94wyq4/image/upload/v1686373787/My%20Brand/website_logo_gin18w.png"
            alt="website logo"
          />
          <h1 className="mobile-view-heading">Insta Share</h1>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="mobile-view-scroll">
          <Form className="mobile-view-search">
            <Form.Control
              type="search"
              placeholder="Search caption"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className="mobile-view-header-scroll">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/search" className="nav-link search-link">
              Search
            </Link>
            <Link to="/my-profile" className="nav-link">
              Profile
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default withRouter(Header)
