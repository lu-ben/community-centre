import React from "react";
import { InputText } from "../../components/InputText";

export const Login = () => (
  <div className="w-full grid">
    <p className="text-4xl font-bold text-white">Welcome back to the</p>
    <p className="text-6xl font-bold text-white">Community Center!</p>

    <div className=" bg-white py-10 px-8 mt-8 rounded-2xl w-96 justify-self-center">
      <InputText label = 'Username' />
      <InputText label = 'Pin' />

      <div className="mt-4 grid grid-cols-2">
        <div className="bg-purple-300 h-10 rounded-xl">Login</div>
        <div>Sign-up</div>
      </div>
    </div>

  </div>

)
