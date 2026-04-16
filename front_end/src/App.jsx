import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path = "/register" element = {<Register />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;