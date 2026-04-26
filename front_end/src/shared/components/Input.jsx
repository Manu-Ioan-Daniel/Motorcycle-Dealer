import React from "react";

const Input = React.forwardRef(({ label, ...props }, ref) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label className="text-sm font-medium mb-1">
                    {label}
                </label>
            )}

            <input
                ref={ref}
                {...props}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
});

export default Input;