/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "../reducer/slices/alertMessageSlice";

const emoji = {
  error: "😢",
  info: "😄",
  success: "😇",
  warning: "🤔",
};

/**
 * Alert toaster when user needs to be notified
 * @returns React Component for alert toast
 */
export const AlertToast = () => {
  const { type, message } = useSelector((state) => state.alertMessage);
  const dispatch = useDispatch();
  
  return (
    message && (
      <div className="z-50 fixed w-full animate-popup">
        <div
          role="alert"
          className={`border-2 border-${type} bg-${type} backdrop-brightness-[0.4] bg-opacity-10 mx-7 backdrop-blur-lg rounded-lg p-3 flex items-center flex-nowrap gap-x-6 w-10/12 md:w-1/2 min-w-fit`}
        >
          <i className="text-3xl">{emoji[type]}</i>
          <p className={`text-${type} font-black text-xl italic`}>{message}</p>
          <button
            className={`text-3xl ms-auto font-black text-${type}`}
            onClick={() => dispatch(resetAlert())}
            aria-label="close"
          >
            X
          </button>
        </div>
      </div>
    )
  );
};
