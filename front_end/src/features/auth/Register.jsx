// react
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// ui comp
import {Input, Button, Navbar, Footer, AuthCard, PopUp,} from "../../shared/components";
// api
import {registerRequest} from "./api/auth.js";
//zod
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "./validation_schemas/registerSchema.js";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";

export default function Register() {


    const {
        register,
        control,
        setError,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            phone: "",
            password: "",
        },
    });


    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerRequest(data);
            setShowSuccess(true);
        } catch (err) {

            const errorCode = err.response?.data.code;
            const message = ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.default;

            if (errorCode === "EMAIL_EXISTS") {
                setError("email", {message: message});
            }
            if(errorCode === "PHONE_NUMBER_EXISTS"){
                setError("phone", {message: message});
            }
        }
    };


    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar/>

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
                            <Input label="Username"
                                   type="text"
                                   placeholder="johndoe123"
                                   {...register("username")}
                            />
                            <p className="text-red-500 text-sm mt-1 h-5">
                                {errors.username?.message}
                            </p>
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
                                render={({field}) => (
                                    <PhoneInput
                                        {...field}
                                        defaultCountry={"RO"}
                                        international
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

            <Footer/>
            {showSuccess && (
                <PopUp
                    message="Registration successful!"
                    onClose={() => navigate("/login")}
                    buttonText="OK"
                />
            )}
        </div>
    );
}