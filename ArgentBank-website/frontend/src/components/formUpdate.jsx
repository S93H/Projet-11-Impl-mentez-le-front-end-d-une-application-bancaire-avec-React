import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../reducers/authReducer';

function FormUpdateUsername() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // J'utilise l'username actuel comme valeur initiale
  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [updateSuccess, setUpdateSuccess] = useState(false); // Ajout du state pour suivre le succès de la mise à jour

  const handleInputChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();

    // Je vérifie si l'utilisateur et son ID sont définis
    if (!user) {
      console.error('User or user ID is not defined. Redirecting to login page...');
      console.log('User:', user);
      return;
    }

    console.log('Submitting update username form');
    console.log('User ID:', user.id);
    console.log('New Username:', newUsername);

    try {
      await dispatch(updateUsername(newUsername));

      // Je met à jour le state pour indiquer que la mise à jour a réussi
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  if (!user) {
    return <div>Vous devez être connecté pour accéder à cette page</div>;
  }

  return (
    <div className='formUpdate'>
      {/* J'affiche le message de mise à jour réussie */}
      {updateSuccess && <h2 className="success-message">Votre username est maintenant "{newUsername}"</h2>}

      {/* J'affiche le formulaire seulement si la mise à jour n'est pas réussie */}
      {!updateSuccess && (
        <>
          <h2 className="success-message">Update Username</h2>
          <form onSubmit={handleUpdateUsername}>
            <div className="input-wrapper">
              <label htmlFor="newUsername">New Username</label>
              <input
                type="text"
                id="newUsername"
                value={newUsername}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Update Username</button>
          </form>
        </>
      )}
    </div>
  );
}

export default FormUpdateUsername;
