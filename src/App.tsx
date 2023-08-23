import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "pages/home";
import Register from "pages/register";
import Profile from "pages/profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts/:id" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
