//react
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
//ui comp
import {Input, Button, Navbar, Footer, AuthCard} from "../../shared/components";
//api
import {loginRequest} from "./api/auth";
//zod
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "./validation_schemas/loginSchema.js";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import {getMeRequest} from "../../shared/api/user.js";

export default function Login() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    });

 

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        const check = async () => {
            try {
                await getMeRequest();
                navigate("/catalog"); 
            } catch { /* empty */ }
        };
        check();
    }, [navigate]);
    
    const message = state?.reason === "session_expired"
        ? "Your session has expired. Please log in again."
        : state?.reason === "account_suspended"
            ? "Your account has been suspended."
            : null;

    const onSubmit = async (data) => {
        try {
            const res = await loginRequest(data);
            const token = res.data.token;
            localStorage.setItem("token",token);
            navigate("/catalog");
        } catch (err) {
            const errorCode = err.response?.data.code;
            const message = ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.default;
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>
            {message && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
                    {message}
                </div>
            )}
            <div className="flex flex-1 items-center justify-center">
                <AuthCard
                    title="Welcome back"
                    footer={
                        <div className="flex flex-col items-center justify-center gap-y-2">
                            <p className="text-center text-sm text-gray-600">
                                Don’t have an account?{" "}
                                <Link to="/register" className="text-blue-600 font-medium">
                                    Click here
                                </Link>
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
                                {errors.email?.message || errors.password?.message || error}
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

            <Footer/>
        </div>
    );
}