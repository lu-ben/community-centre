import { useState } from "react";
import { API_BASE_URL, EMPLOYEE_ROLES, ACCOUNT_TYPES } from "../../utils/enum";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<{ [key: string]: string}>({});
  const [accountType, setAccountType] = useState(ACCOUNT_TYPES.CLIENT);
  const [employeeRole, setEmployeeRole] = useState(EMPLOYEE_ROLES.INSTRUCTOR);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const newInput = { ...input };
    newInput[field] = e.target.value;
    setInput(newInput);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountType(e.target.value);
  };

  const handleRoleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeRole(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/account/signup',
        params: { ...input, accountType, employeeRole },
        headers: { 'Content-Type': null }
      });
      if (res.status === 200) {
        setError(false);
        navigate('/');
      }
    } catch (err) {
      setError(true);
    }
  };

  return {
    hookUserType: accountType,
    hookInputs: input,
    hookError: error,

    hookHandleSelect: handleSelect,
    hookHandleRoleSelect: handleRoleSelect,
    hookHandleChange: handleChange,
    hookHandleSubmit: handleSubmit,
  };
};
