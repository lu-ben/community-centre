import { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ToastProps = {
  successMessage: string;
  errorMessage: string;
  setSuccessMessage: any;
  setErrorMessage: any;
}

export const Toast = ({ successMessage, setSuccessMessage, errorMessage, setErrorMessage }: ToastProps) => {

  useEffect(() => {
    if (successMessage !== '') {
      toast(successMessage, { style: { color: '#343B53'}, className: "rounded-3xl px-6 py-2 min-h-toast text-md"});
      setSuccessMessage('');
    }
  },[successMessage]);

  useEffect(() => {
    if (errorMessage !== '') {
      toast.error(errorMessage, { hideProgressBar: true, className: "rounded-3xl px-6 py-2 min-h-toast text-md"});
      setErrorMessage('');
    }
  },[errorMessage]);

  return (
    <ToastContainer
      position="bottom-center"
      style={{ width: "fit-content" }}
      autoClose={4000}
      draggable={false}
      transition={Slide}
      progressStyle={{ backgroundColor: '#B9FFE4'}}
      theme="colored"
    />
  );
};