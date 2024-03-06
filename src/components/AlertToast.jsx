/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../reducer/slices/alertMessageSlice";

const emoji = {
  error: "😢",
  info: "😄",
  success: "😇",
  warning: "🤔",
};

/**
 * Alert toaster when user needs to be notified
 * @param {{type: "info"|"success"|"warning"|"error"}} type
 * @returns React Component for alert toast
 */
export const AlertToast = () => {
  const { type, message } = useSelector((state) => state.alertMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(setAlert({ type: "info", message: null }));
      }, 3000);
    }
  }, [dispatch, message]);

  return (
    message && (
      <div className="z-50 fixed w-full left-7 animate-popup">
        <div
          role="alert"
          className={`border-2 border-${type} bg-${type} bg-opacity-10 backdrop-brightness-50 backdrop-blur-lg rounded-lg p-3 flex items-center flex-nowrap gap-x-6 w-10/12 md:w-1/2`}
        >
          <i className="text-3xl not-italic">{emoji[type]}</i>
          <span className={`text-${type} font-black text-xl`}>{message}</span>
        </div>
      </div>
    )
  );
};
