import { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../reducer/services/authApi";
import { CommonLoading } from "./CommonLoading";

/**
 * Navbar component of the application
 * @returns React Component
 */
export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { name } = useSelector((state) => state.authenticated);
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <>
      {isLoading &&
        createPortal(<CommonLoading isFloating={true} />, document.getElementById("root"))}
      <nav className="sticky top-0 w-full bg-white shadow z-40">
        <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
          <div className="flex justify-between">
            <Link className="text-2xl font-bold text-pink-500" to="/">
              Formify
            </Link>
            <button
              className="md:hidden rounded-full"
              type="button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div
            id="nav-links"
            className={`${
              showMenu ? "flex" : "hidden"
            } items-center justify-between mt-5 md:gap-x-5 md:mt-0 md:flex space-x-1`}
          >
            <p>{name} 🐵</p>
            <button
              className="btn btn-sm btn-outline btn-error"
              disabled={isLoading}
              aria-disabled={isLoading}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
