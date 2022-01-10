import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen font-sans font-light bg-white">
      {/* menu bar */}
      <nav className="flex items-center fixed z10 w-full bg-indigo-500 inset-x-0 px-3 py-4 h-15">
        <div className="pr-3 ">
          <span className="font-bold text-sm uppercase text-white">
            LabUsa Logs
          </span>
        </div>
      </nav>
      <div className="bg-indigo-50 w-full h-full p-16">{children}</div>
    </div>
  );
};

export default Layout;
