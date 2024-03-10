import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { resetAlert } from "../../reducer/slices/alertMessageSlice";

export const ListenLocationChangeWrapper = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  //Layout effect will listen to location changes and will trigger event inside it
  useLayoutEffect(() => {
    dispatch(resetAlert());
  }, [dispatch, location]);

  return <Outlet />;
};
