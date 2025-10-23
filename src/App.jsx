import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Admin from "./routes/Admin";
import Public from "./routes/Public";


const App = () => {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<Public />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App