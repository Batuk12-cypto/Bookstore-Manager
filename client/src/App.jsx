import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
// import Contact from "./components/Contact.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ManageBooks from "./components/ManageBooks.jsx";

const App = () => {
  const [page, setPage] = useState(() => {
    const p = window.location.pathname.replace('/', '');
    return p || 'home';
  });

  useEffect(() => {
    const onPop = () => setPage(window.location.pathname.replace('/', '') || 'home');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (p) => {
    const path = p === 'home' ? '/' : `/${p}`;
    window.history.pushState({}, '', path);
    setPage(p);
  };

  return (
    <>
      <Navbar onNavigate={navigate} />
      {page === 'home' && <Home />}
      {page === 'managebook' && <ManageBooks />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
      <Footer />
    </>
  );
};

  
export default App;