import React, { createContext, useReducer } from 'react';
import axios from '../services/axios';
const BASE_URL = process.env.REACT_APP_API_URL;

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (username, password) => {
    console.log({username, password});
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    const { access_token: accessToken } = data;

    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {},
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
