import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AlertToast } from "../../components/AlertToast";
import { ErrorField } from "../../components/ErrorField";
import { useRegisterMutation } from "../../reducer/services/authApi";
import { setAlert } from "../../reducer/slices/alertMessageSlice";

/**
 * Register page inside the application.
 * Higher order component
 * @returns React Component
 */
export const Register = () => {
  const [showPsswd, setShowPsswd] = useState(false);
  const errors = useSelector((state) => state.alertMessage.errors);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      name: data.username,
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((res) => {
        dispatch(
          setAlert({ type: "success", message: res + " - redirecting..." })
        );
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
            <span className="text-primary text-base inline-block">
              Register
            </span>
          </h1>
          <div className="rounded-lg border border-secondary py-5">
            <form
              className="grid grid-cols-[1fr,auto] px-5"
              onSubmit={handleSubmit}
            >
              {/* -------------------------------- USERNAME --------------------------------  */}
              <span className="relative">
                <input
                  type="text"
                  className="w-full focus:outline-none input input-lg input-secondary input-bordered rounded-bl-none rounded-r-none"
                  placeholder="Username"
                  tabIndex={1}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl h-min">
                  🐒
                </span>
                <ErrorField className={"absolute left-6 bottom-1"} message={errors?.name} />
              </span>
              {/* -------------------------------- USERNAME --------------------------------  */}
              {/* -------------------------------- REGISTER --------------------------------- */}
              <button
                disabled={isLoading}
                aria-disabled={isLoading}
                type="submit"
                className="btn btn-lg w-full btn-secondary row-span-3 h-full rounded-l-none"
              >
                Register
              </button>
              {/* -------------------------------- REGISTER --------------------------------- */}
              {/* -------------------------------- EMAIL -------------------------------- */}
              <span className="relative">
                <input
                  type="text"
                  className="w-full focus:outline-none input border-y-0 input-lg input-secondary input-bordered rounded-none"
                  placeholder="Email"
                  tabIndex={2}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl h-min">
                  🍌
                </span>
                <ErrorField className={"absolute left-6 bottom-1"} message={errors?.email} />
              </span>
              {/* -------------------------------- EMAIL -------------------------------- */}
              {/* -------------------------------- PASSWORD -------------------------------- */}
              <span className="relative">
                <input
                  type={showPsswd ? "text" : "password"}
                  className="w-full focus:outline-none input input-lg input-secondary input-bordered rounded-tl-none rounded-r-none"
                  placeholder="Password"
                  tabIndex={3}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <label className="absolute right-6 top-1/2 -translate-y-1/2 swap text-4xl h-min">
                  <input
                    id="swap"
                    type="checkbox"
                    onChange={() => setShowPsswd(!showPsswd)}
                  />
                  <span className="swap-on">🐵</span>
                  <span className="swap-off">🙈</span>
                </label>
                <ErrorField className={"absolute left-6 bottom-1"} message={errors?.password} />
              </span>
              {/* -------------------------------- PASSWORD -------------------------------- */}
              {/* -------------------------------- LOGIN ----------------------------------- */}
              <p className=" mt-3">
                Have an account?{" "}
                <Link to="/login" className="link link-secondary">
                  login here
                </Link>
              </p>
              {/* -------------------------------- LOGIN ----------------------------------- */}
              <p className="mt-3 opacity-20">
                the monkey will see your password 👀
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};