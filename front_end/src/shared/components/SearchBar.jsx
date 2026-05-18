import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {

        navigate(`/catalog?search=${encodeURIComponent(value)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="w-full flex justify-center py-4 bg-white shadow-sm">
            <div className="w-full max-w-2xl px-4 flex gap-2">

                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search motorcycles..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Search
                </button>

            </div>
        </div>
    );
}