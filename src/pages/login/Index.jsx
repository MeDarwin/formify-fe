import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AlertToast } from "../../components/AlertToast";
import { ErrorField } from "../../components/ErrorField";
import { useLoginMutation } from "../../reducer/services/authApi";
import { setAlert } from "../../reducer/slices/alertMessageSlice";

/**
 * Login page inside the application.
 * Higher order component
 * @returns React Component
 */
export const Login = () => {
  const [showPsswd, setShowPsswd] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const { accessToken } = useSelector((state) => state.authenticated);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const errors = useSelector((state) => state.alertMessage.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");
    if (accessToken || localToken) navigate("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: data.email, password: data.password })
      .unwrap()
      .then(({ message }) => {
        dispatch(setAlert({ type: "success", message }));
      })
      .catch((err) => {
        dispatch(setAlert({ type: "error", ...err }));
      });
  };

  return (
    <>
      <AlertToast />
      <main className="block container mx-auto">
        <section className="block mx-auto mt-12 px-3">
          <h1 className="relative text-7xl leading-tight text-pink-500 font-black after:block after:absolute after:content-['\\?'] after:right-0 after:bottom-0 after:text-primary">
            Formify
            <span className="text-primary text-base inline-block">login</span>
          </h1>
          <div className="rounded-lg border border-violet-500 py-5">
            <form onSubmit={handleSubmit} className="grid grid-cols-[1fr,auto] px-5">
              {/* ------------------------------------ EMAIL --------------------------------  */}
              <span className="relative">
                <input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  type="text"
                  className="w-full focus:outline-none input input-lg border-b-0 input-primary input-bordered rounded-bl-none rounded-r-none"
                  placeholder="Email"
                  tabIndex={1}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl h-min">🐒</span>
              </span>
              {/* ---------------------------------- EMAIL --------------------------------  */}
              {/* ---------------------------------- LOGIN --------------------------------- */}
              <button
                type="submit"
                className="btn btn-lg w-full btn-primary row-span-2 h-full rounded-l-none"
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                Login
              </button>
              {/* ---------------------------------- LOGIN --------------------------------- */}
              {/* -------------------------------- PASSWORD -------------------------------- */}
              <span className="relative">
                <input
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  type={showPsswd ? "text" : "password"}
                  className="w-full focus:outline-none input input-lg input-primary input-bordered rounded-tl-none rounded-r-none"
                  placeholder="Password"
                  tabIndex={2}
                />
                <label className="absolute right-6 top-1/2 -translate-y-1/2 swap text-4xl h-min">
                  <input id="swap" type="checkbox" onChange={() => setShowPsswd(!showPsswd)} />
                  <span className="swap-on">🐵</span>
                  <span className="swap-off">🙈</span>
                </label>
              </span>
              {/* -------------------------------- PASSWORD -------------------------------- */}
              {/* -------------------------------- REGISTER -------------------------------- */}
              <p className="mt-3">
                Do not have account?{" "}
                <Link to="/register" className="link link-primary">
                  register here
                </Link>
              </p>
              {/* -------------------------------- REGISTER -------------------------------- */}
              <p className="mt-3 opacity-20">the monkey will see your password 👀</p>
              {errors && (
                <div className="rounded-lg border border-red-500 py-2 p-5 mt-5 col-span-2">
                  <div className="divider divider-error divider-start text-error mt-0 font-bold">
                    Errors
                  </div>
                  <ErrorField className="text-xl" message={errors?.email} />
                  <ErrorField className="text-xl" message={errors?.password} />
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </>
  );
};
