import React from "react";
import { InputText } from "../../components/InputText";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { USERTYPES } from "../../utils/enum";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  return (
  <div className="w-full grid">
    <p className="text-6xl font-bold text-white">User sign-up</p>
    <div className=" bg-white py-12 px-10 mt-8 rounded-2xl justify-self-center w-80 grid grid-cols-4 gap-2">
      <InputText label='First Name' width="col-span-2" />
      <InputText label ='Last Name' width="col-span-2" />
      <InputText label='Username' width="col-span-3" />
      <InputText label ='Age' width="col-span-1" />
      <Select label='User Type' options={[USERTYPES.CLIENT, USERTYPES.EMPLOYEE]} width="col-span-4" />
      <InputText label ='Pin' width="col-span-4" />
      <div className="col-span-4">
        <div className="mt-4 grid grid-cols-2 h-14">
          <Button name="Sign-up" color="bg-light-blue"/>
          <Button name="Back" color="bg-white" onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  </div>
)};
