/* eslint-disable react/prop-types */
/**
 * Error field component.
 * Must be used with alert toast component for it to reset
 * @param {{message:string}} message
 * @returns React Component for one error field
 */
export const ErrorField = ({ message }) => {
    return (
      message && (
        <p className="absolute left-6 bottom-1 text-red-500 text-sm">{message}</p>
      )
    );
  };