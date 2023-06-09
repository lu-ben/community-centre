import React from "react";
import { InputText } from "../../components/InputText";
import { Button } from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/enum";

export const Login = () => {
  const hook = useUser();
  const navigate = useNavigate();

  return (
    <div className="w-full grid">
      <p className="text-4xl font-bold text-white">Welcome back to the</p>
      <p className="text-6xl font-bold text-white">Community Center!</p>
      <div className=" bg-white py-12 px-10 mt-8 rounded-2xl justify-self-center w-80">
        <InputText label='Username' />
        <InputText label ='Pin' />
        <div className="mt-8 grid grid-cols-2 h-14">
          <Button name="Login" color="bg-light-blue" onClick={hook.hookHandleLogin}/>
          <Button name="Sign-up" color="bg-white" onClick={() => navigate(paths.signup)} />
        </div>
      </div>
    </div>
  )
}
