import { Outlet } from "react-router-dom";
import { AlertToast } from "./AlertToast";
import { Navbar } from "./Navbar";

/**
 * Layout of the application
 * @returns React Components
 */
export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="grid grid-row-2">
        <AlertToast />
        <section className="container mx-auto px-5 mt-5 font-bold">
          <Outlet />
        </section>
      </main>
    </>
  );
};
