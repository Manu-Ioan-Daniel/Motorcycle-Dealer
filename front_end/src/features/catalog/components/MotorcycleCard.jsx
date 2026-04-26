function SpecItem({ label, value }) {
    return (
        <div className="bg-gray-100 rounded-lg px-3 py-2">
            <div className="text-[11px] text-gray-400 uppercase tracking-wide">
                {label}
            </div>
            <div className="text-sm font-medium text-gray-900">
                {value}
            </div>
        </div>
    );
}

export default function MotorcycleCard({id,
                                           brand, model, year, price,
                                           mileage, color, colorHex, stockQty,
                                           status, type, image, onDetails,
                                       }) {
    const handleDetails = () => {
        if (onDetails) onDetails({ id, brand, model, year, price });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden max-w-[400px] w-full font-sans">

            <div className="bg-neutral-900">
                <img
                    src={image}
                    alt={`${brand} ${model}`}
                    className="w-full h-45 object-cover"
                    onError={(e) => (e.currentTarget.src = "/assets/placeholder-bike.jpg")}
                />

                <div className="px-5 pt-4 pb-3">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="text-[11px] font-semibold tracking-[2px] text-gray-500 uppercase">
                                {brand}
                            </div>
                            <div className="text-2xl font-bold text-white leading-none">
                                {model}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{year}</div>
                        </div>

                        <span className={`text-xs px-3 py-1 rounded-full border ${status === "Available" ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}`}>
              {status}
            </span>
                    </div>
                </div>
            </div>

            <div className="px-5 py-4">
                <div className="flex items-baseline gap-1 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-500">€</span>
                    <span className="text-2xl font-bold">
            {price.toLocaleString()}
          </span>
                    <span className="text-xs text-gray-400 ml-1">/ negotiable</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                    <SpecItem label="Mileage" value={`${mileage.toLocaleString()} km`} />
                    <SpecItem label="Year" value={year} />
                    <SpecItem label="Stock" value={`${stockQty} units`} />
                    <SpecItem label="ID" value={`#MC-${id}`} />
                </div>

                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[11px] text-gray-400 uppercase tracking-wide">
            Type
          </span>
                    <span className="ml-auto text-sm font-medium">{type}</span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <div
                        className="w-5 h-5 rounded-full border-2 border-gray-300"
                        style={{ background: colorHex }}
                    />
                    <span className="text-sm text-gray-500">{color}</span>
                </div>

                <button
                    onClick={handleDetails}
                    className="w-full mt-4 py-3 rounded-lg text-white font-semibold uppercase tracking-wide transition bg-neutral-900 hover:bg-neutral-800"
                >
                    View details →
                </button>
            </div>
        </div>
    );
}