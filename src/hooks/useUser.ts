import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { USERTYPES } from "../utils/enum";


export const useUser = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(['user']);

  const handleLogin = () => {
    setCookie('user', {
      username: 'ben',
      accountId: 1,
      userType: USERTYPES.EMPLOYEE,
      // userType: USERTYPES.CLIENT,
    });
    navigate('/dashboard');
  }

  const handleLogout = () => {
    removeCookie('user');
    navigate('/');
  }

  return {
    hookUserCookie: cookie,
    hookHandleLogin: handleLogin,
    hookHandleLogout: handleLogout,
  }
}