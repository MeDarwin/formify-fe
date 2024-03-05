import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

/**
 * Layout of the application
 * @returns React Components
 */
export const Layout = () => {
  return (
    <main className="grid grid-row-2">
      <Navbar />
      <section className="container mx-auto px-5 mt-5 font-bold">
        <Outlet />
      </section>
    </main>
  );
};
