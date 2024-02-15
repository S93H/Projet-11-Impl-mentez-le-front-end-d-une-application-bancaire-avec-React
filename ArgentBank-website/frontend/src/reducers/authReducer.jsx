import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: sessionStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.user = {
        ...action.payload.user,
        username: action.payload.user.userName,
        firstName: action.payload.user.firstName,
      };
      state.loading = false;
      state.token = action.payload.token;

      sessionStorage.setItem('token', action.payload.token);
    },
    loginUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('token');
    },
    updateUsernameStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUsernameSuccess: (state, action) => {
      state.user.username = action.payload.username;
      if (action.payload.body && action.payload.body.id) {
        state.user.id = action.payload.body.id;
      } else if (action.payload.id) {
        state.user.id = action.payload.id;
      }

      state.loading = false;
    },
    updateUsernameFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUserProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserProfileSuccess: (state, action) => {
      state.user = {
        ...action.payload.body,
        username: action.payload.body.userName,
      };
      state.loading = false;
    },
    getUserProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  updateUsernameStart,
  updateUsernameSuccess,
  updateUsernameFailure,
  getUserProfileStart,
  getUserProfileSuccess,
  getUserProfileFailure,
} = authSlice.actions;


export const loginUser = (email, password) => async (dispatch, getState) => {
  dispatch(loginUserStart());
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });

    const { body } = response.data;
    const { token } = body;

    dispatch(loginUserSuccess({ user: body, token }));
    dispatch(getUserProfile());
  } catch (error) {
  
    // Je met à jour l'état d'erreur d'authentification en cas d'échec de la connexion
    setEmptyFieldsError(null);
  
    // J'utilise le message d'erreur fourni par l'API s'il est disponible
    if (error.response && error.response.status === 400 && error.response.data && error.response.data.message) {
      setAuthenticationError(error.response.data.message);
    } else {
      setAuthenticationError('Une erreur s\'est produite lors de la connexion.');
    }
  }
};


export const updateUsername = (newUsername) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const user = getState().auth.user;

  if (!user) {
    console.error('User or user ID is not defined. Redirecting to login page...');
    return;
  }

  dispatch(updateUsernameStart());
  try {
    const response = await axios.put(
      `http://localhost:3001/api/v1/user/profile`,
      { userName: newUsername },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(updateUsernameSuccess(response.data));

  } catch (error) {
    console.error('Error updating username:', error);
    dispatch(updateUsernameFailure(error.response ? error.response.data : error.message));
  }
};

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch(getUserProfileStart());
  try {
    const token = getState().auth.token;
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/profile',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );


    dispatch(getUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(getUserProfileFailure(error.response ? error.response.data : error.message));
  }
};

export default authSlice.reducer;