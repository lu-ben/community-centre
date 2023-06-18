import { InputText } from "../../components/InputText";
import { Button } from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGNUP_SUCCESS_MESSAGE, paths } from "../../utils/enum";
import { ErrorText } from "../../components/ErrorText";

export const Login = () => {
  const hook = useUser();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const signup = params.get('signup');

  return (
    <div className="w-full grid">
      <p className="text-4xl font-bold text-white">Welcome back to the</p>
      <p className="text-6xl font-bold text-white">Community Center!</p>
      <div className=" bg-white pb-10 pt-8 px-10 mt-8 rounded-2xl justify-self-center w-80">
        {signup && !hook.hookError && <p className='text-base mb-4 text-green-400 font-bold'>{SIGNUP_SUCCESS_MESSAGE}</p>}
        {hook.hookError && <ErrorText message="Incorrect Username or Pin!"/>}
        <InputText label='Username' value={hook.hookUsername} onChange={hook.hookSetUsername}/>
        <InputText label ='Pin' value={hook.hookPin} onChange={hook.hookSetPin}/>
        <div className="mt-8 grid grid-cols-2 h-14">
          <Button name="Login" color="bg-light-blue" onClick={hook.hookHandleLogin}/>
          <Button name="Sign-up" color="bg-white" onClick={() => navigate(paths.signup)} />
        </div>
      </div>
    </div>
  );
};
