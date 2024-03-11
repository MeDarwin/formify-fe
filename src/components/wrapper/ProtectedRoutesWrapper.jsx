import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useLazyGetMeQuery } from "../../reducer/services/authApi";
import { CommonLoading } from "../CommonLoading";

export const ProtectedRoutesWrapper = () => {
  const { accessToken } = useSelector((state) => state.authenticated);
  const [getMe, { isLoading }] = useLazyGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");
    //always sync token whenever home is visitted (will also validate token)
    if (!accessToken)
      getMe(localToken)
        .unwrap()
        .catch(() => navigate("/login"));
  }, [accessToken, getMe, isLoading, navigate]);

  if (isLoading) return <CommonLoading />;
  return <Outlet />;
};
