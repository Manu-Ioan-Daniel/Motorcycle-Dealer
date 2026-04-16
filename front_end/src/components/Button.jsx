export default function Button({ children, className = "", ...props }) {
    return (
        <button
            {...props}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
}