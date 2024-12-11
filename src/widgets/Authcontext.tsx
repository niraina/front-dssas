/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { api } from "@/shared/api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/modules/auth/core/actions";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isTokenExpired = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get('/users/profile')
      dispatch(setCurrentUser(response.data));
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout(); 
      navigate("/"); 
    }
  }, [token, navigate]); 

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchData()
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token && !isTokenExpired(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
