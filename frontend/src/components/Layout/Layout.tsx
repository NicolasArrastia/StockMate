import React from "react";
import Sidebar from "./components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-neutral-100 min-h-screen grid grid-cols-[1fr_7fr]">
      <Sidebar />
      <main className="bg-neutral-100 p-8">{children}</main>
    </div>
  );
};

export default Layout;
