import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateActivityPage from "../pages/CreateActivity/CreateActivity";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CreateActivityPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
