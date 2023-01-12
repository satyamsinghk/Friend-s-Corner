import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Toast() {
  const { success, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (!message) return;
    if (success) {
      toast.success(message);
    } else if (success === false) {
      toast.error(message);
    }
  }, [message, success]);

  return (
    <>
      <ToastContainer pauseOnHover={false}></ToastContainer>
    </>
  );
}

export default Toast;
