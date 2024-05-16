import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";

function LoginRoute() {
  return (
    <BrowserRouter basename="/auth">
        <Routes>
        <Route path="/login" element={<Login />} />

        </Routes>
    </BrowserRouter>
  );
}

export default LoginRoute;