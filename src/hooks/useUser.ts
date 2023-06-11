import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useState } from "react";
import { API_BASE_URL, USERTYPES } from "../utils/enum";

export const useUser = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const [username, setUsername] = useState<string>();
  const [pin, setPin] = useState<string>();
  const [error, setError] = useState(false);

  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSetPin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/account/login',
        params: { username, pin },
        headers: { 'Content-Type': 'application/json' }   
      });

      if (res.status === 200) {
        setError(false);
        setCookie('user', {
          username: res.data.username,
          userType: res.data.userType,
          firstName: res.data.firstName,
          typeSpecificId: res.data.userType === USERTYPES.EMPLOYEE ? res.data.employeeId : res.data.clientId,
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(true);
    }
  };

  const handleLogout = () => {
    removeCookie('user');
    navigate('/');
  };

  return {
    hookUsername: username,
    hookPin: pin,

    hookSetUsername: handleSetUsername,
    hookSetPin: handleSetPin,

    hookError: error,
    
    hookUserCookie: cookie,
    hookHandleLogin: handleLogin,
    hookHandleLogout: handleLogout,
  };
};