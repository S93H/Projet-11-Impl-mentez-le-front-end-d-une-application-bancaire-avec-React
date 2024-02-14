import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/authReducer';
import argentBankLogo from '../assets/argentBankLogo.png'


function Nav() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); // J'ajoute la récupération de l'utilisateur
  console.log(user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  console.log('User in Nav:', user); // J'ajoute du journal pour le débogage


  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src= {argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!token ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <>
             {user && ( // Je vérifie si l'utilisateur est défini
              <Link className="main-nav-item" to="/user">
                <i className="fa fa-user-circle"></i>
                {user.firstName} {/* J'affiche le firstname de l'utilisateur */}
              </Link>
            )}
            <Link onClick={logoutHandler} className="main-nav-item" to="/">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;