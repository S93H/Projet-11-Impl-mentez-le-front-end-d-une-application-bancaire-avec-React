import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

function FormLogin() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  

  const [emptyFieldsError, setEmptyFieldsError] = useState(null);
const [authenticationError, setAuthenticationError] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Start handleLogin');
  
    // Je vérifie si les champs sont vides
    if (!formData.email || !formData.password) {
      console.log('Empty Fields Error');
      setEmptyFieldsError('Veuillez renseigner tous les champs.');
      setAuthenticationError(null);
      return;
    }
  
    try {
      console.log('Before dispatch login');
      await dispatch(loginUser(formData.email, formData.password));
      console.log('After dispatch login');
  
      // J'efface les erreurs si la connexion réussit
      setEmptyFieldsError(null);
      setAuthenticationError(null);
  
      setFormData({
        email: '',
        password: '',
      });
  
      if (token && window.location.pathname !== '/user') {
        navigate('/user');
      }
    } catch (error) {
  // Je vérifie le statut de la requête
  if (error.response && error.response.status === 400) {
    // Le statut est 400, donc les identifiants sont incorrects
    setEmptyFieldsError(null);
    setAuthenticationError('Identifiant ou mot de passe incorrect.');
  } else {
    setEmptyFieldsError(null);
    setAuthenticationError('Une erreur s\'est produite lors de la connexion.');
  }
    }
  };
  

  useEffect(() => {
    console.log('Token:', token);
    console.log('Location Pathname:', window.location.pathname);
    if (token && window.location.pathname !== '/user') {
      // J'utilise useNavigate pour rediriger vers /user
      navigate('/user');
    }
  }, [token, navigate]);

  return (
    <div className='screen'>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {emptyFieldsError && <div className="error-message">{emptyFieldsError}</div>}
{authenticationError && <div className="error-message">{authenticationError}</div>}
          <form onSubmit={handleLogin}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default FormLogin;