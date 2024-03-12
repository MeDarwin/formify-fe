import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useLazyGetMeQuery } from "../../reducer/services/authApi";
import { CommonLoading } from "../CommonLoading";

export const ProtectedRoutesWrapper = () => {
  const { accessToken } = useSelector((state) => state.authenticated);
  const [getMe, { isLoading, isSuccess }] = useLazyGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");
    //always sync token whenever home is visitted (will also validate token)
      getMe(localToken)
        .unwrap()
        .catch(() => navigate("/login"));
  }, [accessToken, getMe, navigate]);

  if (isLoading) return <CommonLoading />;
  //only render when user is already fetched or accessToken is present
  if (isSuccess) return <Outlet />;
};
