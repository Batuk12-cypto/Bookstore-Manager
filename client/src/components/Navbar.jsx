import React from "react";

const Navbar = ({ onNavigate = () => {} }) => {
  const links = [
    { id: "home", label: "Home" },
    { id: "managebook", label: "ManageBook" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/40">
            BM
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            Bookstore Manager
          </span>
        </div>

        <ul className="flex items-center gap-6 text-xs font-medium text-slate-300">
          {links.map((link) => (
            <li
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="cursor-pointer rounded-full px-3 py-1 transition hover:bg-slate-800 hover:text-white"
            >
              {link.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
