import React, { useState, useEffect } from "react";

function Menu() {

  const [user, setUser] = useState('');

  let currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    setUser(currentUser);
  }, [user])
  
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src={process.env.PUBLIC_URL + '/dist/img/AdminLTELogo.png'}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">SQLite</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={process.env.PUBLIC_URL + '/dist/img/user2-160x160.jpg'}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {user}
              </a>
            </div>
          </div>
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}

export default Menu;
