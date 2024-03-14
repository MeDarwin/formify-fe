import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../reducer/services/authApi";
import { CommonLoading } from "../CommonLoading";

export const ProtectedRoutesWrapper = () => {
  const { accessToken } = useSelector((state) => state.authenticated);
  const { isLoading, isError } = useGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    //navigate to login when token error
    if (isError) navigate("/login");
  }, [isError, navigate]);

  if (isLoading) return <CommonLoading />;
  //only render when user is already fetched or accessToken is present
  if (accessToken) return <Outlet />;
};
