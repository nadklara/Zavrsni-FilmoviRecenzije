import { createContext, useEffect, useState, useContext } from 'react';
import { logInService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';
import useLoading from '../hooks/useLoading';
import { ErrorContext } from "./ErrorContext";
import KorisniciService from '../services/KorisniciService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Bearer');
    const userData = localStorage.getItem('currentUser');

    if (token && userData) {
      setAuthToken(token);
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
      setIsAdmin(parsedUser?.administrator || false);
    } else {
      logout();
    }
  }, []);

  async function login(userData) {
    showLoading();
    const odgovor = await logInService(userData);
    hideLoading();
    
    if (!odgovor.greska) {
      localStorage.setItem('Bearer', odgovor.poruka);
      setAuthToken(odgovor.poruka);
      setIsLoggedIn(true);

      await checkIsAdmin(userData.email);

      navigate(RouteNames.HOME);
    } else {
      prikaziError(odgovor.poruka);
      logout();
    }
  }

  function logout() {
    localStorage.removeItem('Bearer');
    localStorage.removeItem('currentUser');
    setAuthToken('');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
    navigate(RouteNames.HOME);
  }

  async function checkIsAdmin(email) {
    if (!email) return;

    try {
      const user = await KorisniciService.getByEmail(email);
      if (user.poruka?.length > 0) {
        localStorage.setItem('currentUser', JSON.stringify(user.poruka[0]));
        setCurrentUser(user.poruka[0]);
        setIsAdmin(user.poruka[0].administrator === true);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }

  const value = {
    isLoggedIn,
    isAdmin,
    authToken,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
