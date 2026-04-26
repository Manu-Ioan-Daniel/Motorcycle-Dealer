import Button from "./Button.jsx";

export default function PopUp({ message, onClose, buttonText }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
            <div className="relative bg-white rounded-xl shadow-xl p-8 flex flex-col items-center gap-4 z-10 min-h-24">
                <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
                <Button onClick={onClose} className="w-auto px-6">
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}