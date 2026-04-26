import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Catalog from "./features/catalog/Catalog.jsx";
import ProtectedRoute from "./shared/components/ProtectedRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path = "/register" element = {<Register />}/>
                <Route path = "/catalog" element = {<ProtectedRoute>
                    <Catalog />
                </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;