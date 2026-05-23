import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import Catalog from "./features/catalog/Catalog.jsx";
import MotorcycleDetails from "./features/catalog/components/MotorcycleDetails.jsx";
import PurchaseInquiry from "./features/catalog/components/PurchaseInquiry.jsx";
import ManagePurchaseInquiries from "./features/catalog/components/ManagePurchaseInquiries.jsx";
import PurchaseInquiryDetails from "./features/catalog/components/PurchaseInquiryDetails.jsx";
import ProtectedRoute from "./shared/components/ProtectedRoute.jsx";
import Profile from "./features/auth/Profile.jsx";
import AddListing from "./features/catalog/AddListing.jsx";
import MyListings from "./features/catalog/MyListings.jsx";
import EditListing from "./features/catalog/EditListing.jsx";
import ScheduleTestRide from "./features/catalog/ScheduleTestRide.jsx";

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
                <Route
                    path="/catalog/:bikeId"
                    element={
                        <ProtectedRoute>
                            <MotorcycleDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/catalog/:bikeId/purchase"
                    element={
                        <ProtectedRoute>
                            <PurchaseInquiry />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manage-inquiries"
                    element={
                        <ProtectedRoute>
                            <ManagePurchaseInquiries />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/inquiry/:inquiryId"
                    element={
                        <ProtectedRoute>
                            <PurchaseInquiryDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-listing"
                    element={
                        <ProtectedRoute>
                            <AddListing />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit-listing"
                    element={
                        <ProtectedRoute>
                            <EditListing />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-listings"
                    element={
                        <ProtectedRoute>
                            <MyListings />
                        </ProtectedRoute>
                    }
                />

                <Route path="/catalog/:bikeId/test-ride" element={
                    <ProtectedRoute>
                        <ScheduleTestRide />
                    </ProtectedRoute>
                }/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;