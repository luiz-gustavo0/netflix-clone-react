import React from 'react';
import './Header.css';
// import logo from '../img/logo-bgremover.png';

const Header = ({ black }) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className='header--logo'>
        <a href='/'>
          {/* <img src={logo} alt='Netflix' /> */}
          <span>FlixFilmes</span>
        </a>
      </div>
      <div className='header--user'>
        <a href='/'>
          <img
            src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'
            alt='Logo usuario'
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
