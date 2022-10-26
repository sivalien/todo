import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const {signout, isLogin} = useContext(AuthContext)
  return (
    <>
      <div className='navbar'>
        <div className={isLogin ? 'navbar-container-login' : 'navbar-container'}>
          <h2 className='navbar-text'>
            TODO LIST
          </h2>
        </div>
        <div className='btn-container'>
          {
            isLogin 
            ?
            <button onClick={signout} className='navbar-btn'>
              Sign Out
            </button>
            :
            <></>
          } 
        </div>
      </div>
    </>
  );
}

export default Navbar;