import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { registerSchema } from "./schemas.js";
import AuthCard from "../../components/AuthCard";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";



export default function Register() {


    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log("REGISTER DATA:", data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // await registerRequest(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex flex-1 items-center justify-center mt-3">
                <AuthCard
                    title="Create account"
                    footer={
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 font-medium">
                                Login
                            </Link>
                        </p>
                    }
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                        noValidate
                    >

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Input
                                    label="First name"
                                    type="text"
                                    placeholder="John"
                                    {...register("firstName")}
                                />
                                <p className="text-red-500 text-sm mt-1 h-5">
                                    {errors.firstName?.message}
                                </p>
                            </div>

                            <div>
                                <Input
                                    label="Last name"
                                    type="text"
                                    placeholder="Doe"
                                    {...register("lastName")}
                                />
                                <p className="text-red-500 text-sm mt-1 h-5">
                                    {errors.lastName?.message}
                                </p>
                            </div>
                        </div>

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
                            <label className="block text-sm font-medium mb-1">
                                Phone
                            </label>

                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <PhoneInput
                                        {...field}
                                        defaultCountry={"RO"}
                                        international
                                        value={field.value ?? ""}
                                        onChange={(value) => field.onChange(value ?? "")}
                                        countryCallingCodeEditable={false}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                )}
                            />

                            <p className="text-red-500 text-sm mt-1 h-5">
                                {errors.phone?.message}
                            </p>
                        </div>

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Create a password"
                                {...register("password")}
                            />
                            <p className="text-red-500 text-sm mt-1 h-5">
                                {errors.password?.message}
                            </p>
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account..." : "Register"}
                        </Button>
                    </form>
                </AuthCard>
            </div>

            <Footer />
        </div>
    );
}