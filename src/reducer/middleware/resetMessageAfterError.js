import { resetAlert, setTimeoutId } from "../slices/alertMessageSlice";

export const resetMessageAfterError = (store) => (next) => (action) => {
  //reset all message within 5 seconds
  if (action?.type == "alertMessage/setAlert") {
    clearTimeout(store.getState().alertMessage.timeoutId); //always clear last timeout first to prevent unnecessary timeout redundant
    store.dispatch(
      setTimeoutId(
        setTimeout(() => {
          // console.log("after auto reset timeout called");
          store.dispatch(resetAlert());
        }, 5000)
      )
    );
  }
  //clear timeout when reset, preventing unexpected timeout reset from manual reset
  if (action?.type == "alertMessage/resetAlert") {
    clearTimeout(store.getState().alertMessage.timeoutId);
    store.dispatch(setTimeoutId(null));
  }
  const result = next(action);
  return result;
};
