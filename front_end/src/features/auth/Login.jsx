import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthCard from "../../components/AuthCard";
import Footer from "../../components/Footer.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { loginRequest } from "./api/auth";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import PopUp from "../../components/PopUp.jsx";

export default function Login() {
    const {register, handleSubmit, formState: { isSubmitting}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const onSubmit = async (data) => {
        try {
            await loginRequest(data);
            setShowPopup(true);
        } catch (err) {
            const errorCode = err.response?.data.code;
            const message = ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.default;
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>

            <div className="flex flex-1 items-center justify-center">
                <AuthCard
                    title="Welcome back"
                    footer={
                        <div className = "flex flex-col items-center justify-center gap-y-2">
                            <p className="text-center text-sm text-gray-600">
                                Don’t have an account?{" "}
                                <Link to="/register" className="text-blue-600 font-medium">
                                    Click here
                                </Link>
                            </p>
                            <p className = "text-center text-sm text-gray-600">
                                Forgot your password?{" "}
                                <Link to="/forgot_pass" className="text-blue-600 font-medium">Click here</Link>
                            </p>
                        </div>
                    }
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                        <div>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                            />

                        </div>

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                            />
                            <p className="text-red-500 text-sm mt-1 h-5">
                                {error}
                            </p>
                        </div>

                        <Button type="submit"
                                disabled={isSubmitting}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>

                    </form>
                </AuthCard>
            </div>

            <Footer />
            {showPopup && (<PopUp message="Login Successful!" onClose={()=>navigate("/catalog")} buttonText="Proceed"/>)}
        </div>
    );
}