import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">MotoShop</h1>

            <div className="space-x-4">
                <Link to="/login" className="text-blue-600 font-medium">
                    Login
                </Link>
                <Link to="/catalog" className="text-gray-600 hover:text-blue-600">
                    Catalog
                </Link>
            </div>
        </nav>
    );
}