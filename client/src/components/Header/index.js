import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">⚽Play2Day🏀</h1>
          </Link>
          <p className="m-0">We appreciate the attitude you bring to every game </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile 🎽
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
               ⭕ Logout 
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                🗝 LOGIN 
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                ✅Signup to play !
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
