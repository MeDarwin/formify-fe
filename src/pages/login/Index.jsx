import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertToast } from "../../components/AlertToast";

/**
 * Login page inside the application.
 * Higher order component
 * @returns React Component
 */
export const Login = () => {
  const [showPsswd, setShowPsswd] = useState(false);
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
            <form className="grid grid-cols-[1fr,auto] px-5">
              {/* -------------------------------- USERNAME --------------------------------  */}
              <span className="relative">
                <input
                  type="text"
                  className="w-full focus:outline-none input input-lg border-b-0 input-primary input-bordered rounded-bl-none rounded-r-none"
                  placeholder="Username"
                  tabIndex={1}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl h-min">
                  🐒
                </span>
              </span>
              {/* -------------------------------- USERNAME --------------------------------  */}
              {/* ---------------------------------- LOGIN --------------------------------- */}
              <button className="btn btn-lg w-full btn-primary row-span-2 h-full rounded-l-none">
                Login
              </button>
              {/* ---------------------------------- LOGIN --------------------------------- */}
              {/* -------------------------------- PASSWORD -------------------------------- */}
              <span className="relative">
                <input
                  type={showPsswd ? "text" : "password"}
                  className="w-full focus:outline-none input input-lg input-primary input-bordered rounded-tl-none rounded-r-none"
                  placeholder="Password"
                  tabIndex={2}
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
              </span>
              {/* -------------------------------- PASSWORD -------------------------------- */}
              {/* -------------------------------- REGISTER -------------------------------- */}
              <p className=" mt-3">
                Do not have account?{" "}
                <Link to="/register" className="link link-primary">
                  register here
                </Link>
              </p>
              {/* -------------------------------- REGISTER -------------------------------- */}
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
