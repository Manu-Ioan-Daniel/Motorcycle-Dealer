export default function AuthCard({ title, children, footer }) {
    return (
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

            {children}

            {footer && <div className="mt-6">{footer}</div>}
        </div>
    );
}