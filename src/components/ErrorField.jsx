/* eslint-disable react/prop-types */
/**
 * Error field component.
 * @param {{message:string,className: import("react").ClassAttributes}} param
 * @returns React Component for one error field
 */
export const ErrorField = ({ message, className: additionalClass }) => {
  return (
    message && (
      <span className={`block text-red-500 text-sm ${additionalClass}`}>{message}</span>
    )
  );
};
