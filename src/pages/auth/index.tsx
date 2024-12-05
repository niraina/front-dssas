import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default Auth;
