import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/home';
import Login from './components/login';
import User from './components/user';
import FormUpdateUsername from './components/formUpdate';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<User />} />
          <Route path="/update" element={<FormUpdateUsername />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;