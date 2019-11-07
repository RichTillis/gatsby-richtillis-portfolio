import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import twitter from '../img/twitter.svg'
import linkedIn from '../img/linkedin.svg'
import stackoverflow from '../img/stackoverflow.svg'
import devDotTo from '../img/dev-dot-to.svg'
import email from '../img/email.svg'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
        style={{backgroundColor:'#dfdfdf'}}
      >
        <div className="container">
          <div className="navbar-brand" >
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="RichTillis.com" style={{ width: '125px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">              
              <Link className="navbar-item" to="/products">
                Projects
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link className="navbar-item" to="/about">
                About Me
              </Link>
            </div>
            <div className="navbar-end has-text-centered" >
              <a
                className="navbar-item"
                href="mailto:rich@richtillis.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon" >
                  <img src={email} alt="email"  />
                </span>
              </a>
              <a
                className="navbar-item"
                href="https://twitter.com/richtillis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={twitter} alt="twitter" />
                </span>
              </a>
              <a
                className="navbar-item"
                href="https://www.linkedin.com/in/richtillis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={linkedIn} alt="LinkedIn" />
                </span>
              </a>
              <a
                className="navbar-item"
                href="https://www.stackoverflow.com/users/4577397/richtillis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={stackoverflow} alt="Stack Overflow" />
                </span>
              </a>
              <a
                className="navbar-item"
                href="https://dev.to/richtillis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={devDotTo} alt="Dev.to" />
                </span>
              </a>
              <a
                className="navbar-item"
                href="https://github.com/richtillis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={github} alt="Github" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
