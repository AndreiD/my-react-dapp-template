import React from 'react'

const Header = () => {
  return (
    <nav className="grey darken-4 z-depth-0">
      <div className="nav-wrapper container">
        <a href="/" className="brand-logo">Super DAPP</a>
        <div>
          <ul className="right">
            <li><a href='/'><i className="material-icons left">add_circle</i>ACTION</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
