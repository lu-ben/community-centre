import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/enum";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<{ [key: string]: string}>({});
  const [userType, setUserType] = useState('');
  const [error, setError] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const newInput = { ...input }; 
    newInput[field] = e.target.value;
    setInput(newInput);
  };
 
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios({
        baseURL: API_BASE_URL,
        method: 'get',
        url: '/account/signup',
        params: { ...input, userType },
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

  useEffect(() => {
    console.log(input);
  }, [input]);


  return {
    hookInputs: input,
    hookError: error,

    hookHandleSelect: handleSelect,
    hookHandleChange: handleChange,
    hookHandleSubmit: handleSubmit,
  };
};