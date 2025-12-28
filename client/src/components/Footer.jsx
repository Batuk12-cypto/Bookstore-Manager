import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-800 bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} Bookstore Manager. All rights reserved.</p>
        <p className="hidden sm:inline">
          Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
