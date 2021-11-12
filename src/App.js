import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
