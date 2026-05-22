import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../shared/components/index.js";
import { getMeRequest } from "../../shared/api/user.js";
import {submitListing, uploadBikeImage} from "./api/bikes.js";

export default function AddListing() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isDealer, setIsDealer] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [suggestedFilename, setSuggestedFilename] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        price: "",
        mileage: "",
        color: "",
        type: "SPORT",
        stockQty: 1,
        status: "AVAILABLE",
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await getMeRequest();
                if (userData?.role === "DEALER") {
                    setIsDealer(true);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to check auth:", error);
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "mileage" || name === "stockQty" ?
                parseInt(value) || value : value,
        }));

        if (name === "brand" || name === "model" || name === "year") {
            updateFilename({ ...formData, [name]: value });
        }
    };

    const updateFilename = (data) => {
        if (data.brand && data.model) {
            const filename = `${data.brand.toLowerCase()}_${data.model.toLowerCase()}.jpeg`.replace(/\s+/g, " ");
            setSuggestedFilename(filename);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await submitListing(formData);

            if (imageFile && suggestedFilename) {
                await uploadBikeImage(imageFile, suggestedFilename);
            }

            navigate("/manage-inquiries");
        } catch (error) {
            console.error("Failed to submit listing:", error);
            const msg = error?.response?.data?.message ?? "Failed to create listing. Please try again.";
            window.alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Loading...
                </div>
                <Footer />
            </div>
        );
    }

    if (!isDealer) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 text-center">
                        <p className="text-gray-600">Only dealers can add listings.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Add New Motorcycle Listing</h1>
                        <p className="text-gray-600 mt-2">Fill in the details and upload a photo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Brand */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Brand *
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., BMW, Ducati, Honda"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Model */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Model *
                                </label>
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., R 1250 GS, Monster 821"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Year *
                                </label>
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price (€) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="0"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Mileage */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mileage (km) *
                                </label>
                                <input
                                    type="number"
                                    name="mileage"
                                    value={formData.mileage}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="0"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Color */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Color *
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., Red, Black, White"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Type *
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="SPORT">SPORT</option>
                                    <option value="CRUISER">CRUISER</option>
                                    <option value="ADVENTURE">ADVENTURE</option>
                                    <option value="NAKED">NAKED</option>
                                    <option value="TOURING">TOURING</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="stockQty"
                                    value={formData.stockQty}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    STATUS *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="AVAILABLE">AVAILABLE</option>
                                    <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                                </select>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                            <label className="block text-sm font-semibold text-gray-700 mb-4">
                                Upload Motorcycle Photo *
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="block w-full"
                            />
                            {suggestedFilename && (
                                <p className="mt-2 text-sm text-gray-600">
                                    File will be saved as: <code className="bg-gray-100 px-2 py-1 rounded">{suggestedFilename}</code>
                                </p>
                            )}
                            {imagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-48 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="mt-8 flex gap-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {submitting ? "Creating Listing..." : "Create Listing"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/catalog")}
                                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

