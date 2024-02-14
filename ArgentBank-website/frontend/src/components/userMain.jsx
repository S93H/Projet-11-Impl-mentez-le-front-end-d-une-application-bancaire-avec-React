import React, { useState } from 'react';
import FormUpdateUsername from './formUpdate';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function UserMain() {
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  const handleEditButtonClick = () => {
     // Je vérifie si l'utilisateur est connecté avant d'autoriser l'édition
     if (isAuthenticated) {
      setIsEditingUsername(true);
    } else {
      // Je redirige l'utilisateur vers la page de connexion s'il n'est pas connecté
      navigate('/login');
    }
  };

  if (!isAuthenticated) {
    // Je redirige l'utilisateur vers la page de connexion s'il n'est pas connecté
    navigate('/login');
    return null; // J'arrête le rendu du composant
  }

  return (
    <div className='userMain'>
<main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className="edit-button" onClick={handleEditButtonClick}>Edit Name</button>
      </div>

      {isEditingUsername ? (
        <FormUpdateUsername />
      ) : (
        <>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </>
      )}
    </main>
    </div>
    
  );
}

export default UserMain;