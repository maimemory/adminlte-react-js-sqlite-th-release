import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App';

function Header() {

  const navigate = useNavigate();

  const {isLogin, setIsLogin, setAccount } = useContext(Context);

  const signOut = () => {
    setIsLogin(false);
    setAccount({
      username: "",
      password: ""
    })
    localStorage.removeItem('alreadyLogin');
    localStorage.removeItem('currentUser');
    navigate("/");
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button 
              type="button" 
              className='btn btn-block btn-outline-primary'
              onClick={() => signOut()}
            >
              ออกจากระบบ
            </button>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  )
}

export default Header;
