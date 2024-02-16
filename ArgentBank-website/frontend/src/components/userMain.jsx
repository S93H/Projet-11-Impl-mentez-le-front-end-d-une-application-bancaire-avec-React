import React, { useEffect, useState } from 'react';
import FormUpdateUsername from './formUpdate';
import AccountSection from './accountSection';

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

  useEffect(() => {
    if (!isAuthenticated) {
      // Je redirige l'utilisateur vers la page de connexion s'il n'est pas connecté
      navigate('/login');
    }
  }, [isAuthenticated]);


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
            <AccountSection
              title="Argent Bank Checking"
              accountNumber="x8349"
              amount="$2,082.79"
              description="Available Balance"
            />

            <AccountSection
              title="Argent Bank Savings"
              accountNumber="x6712"
              amount="$10,928.42"
              description="Available Balance"
            />

            <AccountSection
              title="Argent Bank Credit Card"
              accountNumber="x8349"
              amount="$184.30"
              description="Current Balance"
            />
          </>
        )}
      </main>
    </div>

  );
}

export default UserMain;