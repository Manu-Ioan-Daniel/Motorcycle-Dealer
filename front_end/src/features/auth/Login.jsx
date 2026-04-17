import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthCard from "../../components/AuthCard";
import Footer from "../../components/Footer.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { loginRequest } from "../../api/auth";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";

export default function Login() {
    const {register, handleSubmit, formState: { isSubmitting}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setError("")
            const res = await loginRequest(data);
            console.log(res.data);
            navigate("/catalog")
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError( "Invalid Email or Password")
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
        </div>
    );
}