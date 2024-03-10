import { resetAlert, setTimeoutId } from "../slices/alertMessageSlice";

export const resetMessageAfterError = (store) => (next) => (action) => {
  //reset all message within 5 seconds
  if (action?.type == "auth/executeMutation/pending") {
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
    // console.log("clear timeout called");
    clearTimeout(store.getState().alertMessage.timeoutId);
    store.dispatch(setTimeoutId(null));
  }
  const result = next(action);
  return result;
};
