import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">

                {/* Logo + description */}
                <div>
                    <h2 className="text-xl font-bold text-white">
                        MotoShop
                    </h2>
                    <p className="text-sm text-gray-400 mt-2 max-w-sm">
                        Buy and sell motorcycles easily. Fast, simple, and secure platform for riders.
                    </p>
                </div>

                {/* Contact */}
                <div className="text-sm">
                    <p className="text-white font-semibold mb-2">Contact</p>

                    <a
                        href="mailto:support@motoshop.com"
                        className="text-blue-400 hover:underline"
                    >
                        support@motoshop.com
                    </a>

                    <p className="text-gray-500 mt-2">
                        We usually reply within 24h
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
                © {new Date().getFullYear()} MotoShop. All rights reserved.
            </div>
        </footer>
    );
}