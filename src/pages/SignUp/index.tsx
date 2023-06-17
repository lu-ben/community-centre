import { InputText } from "../../components/InputText";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { EMPLOYEE_ROLES, ACCOUNT_TYPES, FAIL_MESSAGE } from "../../utils/enum";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "./useSignUp";
import { ErrorText } from "../../components/ErrorText";

export const SignUp = () => {
  const hook = useSignUp();
  const navigate = useNavigate();

  // TODO: [optional]: add a 'role' field that only shows up (or replaces the age field) when selecting employee
  //                   currently backend just defaults role to 'manager'
  return (
    <div className="w-full grid">
      <p className="text-6xl font-bold text-white">User sign-up</p>
      <div className=" bg-white py-8 px-10 mt-8 rounded-2xl justify-self-center w-80 grid grid-cols-4 gap-2">
        <div className="col-span-4">{hook.hookError && <ErrorText message="Signup failed. Please try again"/>}</div>
        <InputText label='First Name' width="col-span-2" value={hook.hookInputs.firstName} onChange={(e) => hook.hookHandleChange(e, 'firstName')}/>
        <InputText label ='Last Name' width="col-span-2" value={hook.hookInputs.lastName} onChange={(e) => hook.hookHandleChange(e, 'lastName')} />
        <InputText label='Username' width={hook.hookUserType === ACCOUNT_TYPES.CLIENT ? "col-span-3" : "col-span-4"} value={hook.hookInputs.username} onChange={(e) => hook.hookHandleChange(e, 'username')} />
        {hook.hookUserType === ACCOUNT_TYPES.CLIENT ? (
          <InputText label ='Age' width="col-span-1" value={hook.hookInputs.age} onChange={(e) => hook.hookHandleChange(e, 'age')}  />
        ): (
          <Select label='Role' options={[EMPLOYEE_ROLES.INSTRUCTOR, EMPLOYEE_ROLES.RECEPTIONIST, EMPLOYEE_ROLES.MANAGER]} width="col-span-4" onChange={hook.hookHandleRoleSelect}/>
        )}
        <Select label='User Type' options={[ACCOUNT_TYPES.CLIENT, ACCOUNT_TYPES.EMPLOYEE]} width="col-span-4" onChange={hook.hookHandleSelect}/>
        <InputText label ='Pin' width="col-span-4" value={hook.hookInputs.pin} onChange={(e) => hook.hookHandleChange(e, 'pin')} />
        <div className="col-span-4">
          <div className="mt-4 grid grid-cols-2 h-14">
            <Button name="Sign-up" color="bg-light-blue" onClick={hook.hookHandleSubmit}/>
            <Button name="Back" color="bg-white" onClick={() => navigate('/')} />
          </div>
        </div>
      </div>
    </div>
  );};
