import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useLazyGetMeQuery } from "../../reducer/services/authApi";

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

  if (isLoading)
    return (
      <div className="w-full">
        <div className="flex items-center gap-x-10 w-fit mx-auto my-10">
          <span className="text-primary text-xl font-semibold italic">Getting busy...</span>
          <span className="loading text-primary loading-bars loading-lg"></span>
        </div>
      </div>
    );
  return <Outlet />;
};
