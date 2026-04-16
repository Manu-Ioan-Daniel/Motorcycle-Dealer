import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schemas.js";
import AuthCard from "../../components/AuthCard";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors , isSubmitting},
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log("VALID DATA:", data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // await loginRequest(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

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
                            <p className="text-red-500 text-sm mt-1 h-5">
                                {errors.email?.message}
                            </p>
                        </div>

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                            />
                            <p className="text-red-500 text-sm mt-1 h-5">
                                {errors.password?.message}
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