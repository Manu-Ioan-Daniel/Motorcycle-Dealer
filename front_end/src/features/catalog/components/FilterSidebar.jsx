import { useState } from "react";

export default function FilterSidebar({ filters, onChange, brands = [], years = [], types = [], priceMin: PRICE_MIN = 0, priceMax: PRICE_MAX = 30000 }) {
    const [openSections, setOpenSections] = useState({
        price: true,
        brand: true,
        year: false,
        type: true,
    });

    const toggle = (section) =>
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

    const handlePriceMin = (e) =>
        onChange({ ...filters, priceMin: Number(e.target.value) });

    const handlePriceMax = (e) =>
        onChange({ ...filters, priceMax: Number(e.target.value) });

    const handleBrand = (brand) => {
        const brands = filters.brands.includes(brand)
            ? filters.brands.filter((b) => b !== brand)
            : [...filters.brands, brand];
        onChange({ ...filters, brands });
    };

    const handleYear = (year) => {
        const years = filters.years.includes(year)
            ? filters.years.filter((y) => y !== year)
            : [...filters.years, year];
        onChange({ ...filters, years });
    };

    const handleType = (type) => {
        const types = filters.types.includes(type)
            ? filters.types.filter((t) => t !== type)
            : [...filters.types, type];
        onChange({ ...filters, types });
    };

    const handleReset = () =>
        onChange({ priceMin: PRICE_MIN, priceMax: PRICE_MAX, brands: [], years: [], types: [] });

    const hasActiveFilters =
        filters.brands.length > 0 ||
        filters.years.length > 0 ||
        filters.types.length > 0 ||
        filters.priceMin > PRICE_MIN ||
        filters.priceMax < PRICE_MAX;

    return (
        <aside className="w-64 shrink-0 font-sans">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                        Filters
                    </span>
                    {hasActiveFilters && (
                        <button
                            onClick={handleReset}
                            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                        >
                            Reset
                        </button>
                    )}
                </div>


                <Section
                    label="Price Interval"
                    open={openSections.price}
                    onToggle={() => toggle("price")}
                >
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <span className="bg-gray-100 rounded px-2 py-1 text-gray-800">
                                € {filters.priceMin.toLocaleString()}
                            </span>
                            <span className="flex-1 text-center">—</span>
                            <span className="bg-gray-100 rounded px-2 py-1 text-gray-800">
                                € {filters.priceMax.toLocaleString()}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] text-gray-400 uppercase tracking-wide">
                                Min
                            </label>
                            <input
                                type="range"
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                step={500}
                                value={filters.priceMin}
                                onChange={handlePriceMin}
                                className="w-full accent-neutral-900 h-1"
                            />
                            <label className="text-[11px] text-gray-400 uppercase tracking-wide">
                                Max
                            </label>
                            <input
                                type="range"
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                step={500}
                                value={filters.priceMax}
                                onChange={handlePriceMax}
                                className="w-full accent-neutral-900 h-1"
                            />
                        </div>
                    </div>
                </Section>


                <Section
                    label="Brand"
                    open={openSections.brand}
                    onToggle={() => toggle("brand")}
                >
                    <div className="space-y-1">
                        {brands.map((brand) => (
                            <CheckItem
                                key={brand}
                                label={brand}
                                checked={filters.brands.includes(brand)}
                                onChange={() => handleBrand(brand)}
                            />
                        ))}
                    </div>
                </Section>

                <Section
                    label="Year"
                    open={openSections.year}
                    onToggle={() => toggle("year")}
                >
                    <div className="grid grid-cols-2 gap-1">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => handleYear(year)}
                                className={`text-xs py-1.5 rounded-lg border font-medium transition-all ${
                                    filters.years.includes(year)
                                        ? "bg-neutral-900 text-white border-neutral-900"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </Section>


                <Section
                    label="Motorcycle Type"
                    open={openSections.type}
                    onToggle={() => toggle("type")}
                    noBorder
                >
                    <div className="flex flex-col gap-2">
                        {types.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleType(type)}
                                className={`text-sm py-2 px-3 rounded-xl border font-medium transition-all text-left ${
                                    filters.types.includes(type)
                                        ? "bg-neutral-900 text-white border-neutral-900"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </Section>
            </div>
        </aside>
    );
}

function Section({ label, open, onToggle, children, noBorder }) {
    return (
        <div className={!noBorder ? "border-b border-gray-100" : ""}>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="text-sm font-semibold text-gray-800">{label}</span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && <div className="px-5 pb-4">{children}</div>}
        </div>
    );
}

function CheckItem({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
            <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    checked
                        ? "bg-neutral-900 border-neutral-900"
                        : "border-gray-300 group-hover:border-gray-500"
                }`}
                onClick={onChange}
            >
                {checked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
        </label>
    );
}