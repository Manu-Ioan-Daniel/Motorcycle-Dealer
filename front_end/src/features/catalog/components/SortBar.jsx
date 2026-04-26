import {SORT_OPTIONS} from "../constants/catalogConstants.js";

export default function SortBar({ total, sort, onSortChange }) {
    return (
        <div className="flex items-center justify-between mb-6 font-sans">
            <span className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">{total}</span> motorcycles found
            </span>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:block">Sort by</span>
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="
                            appearance-none
                            bg-white border border-gray-200 rounded-xl
                            pl-4 pr-9 py-2
                            text-sm font-medium text-gray-800
                            hover:border-gray-400
                            focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent
                            transition-all cursor-pointer
                        "
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
