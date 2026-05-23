import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MotorcycleCard from "./MotorcycleCard.jsx";
import FilterSidebar from "./FilterSidebar.jsx";
import SortBar from "./SortBar.jsx";
import {applyFilters, applySort, deriveOptions, getBikeImage} from "../utils/catalogUitls.js";
import { DEFAULT_FILTERS } from "../constants/catalogConstants.js";
import { fetchBikes } from "../api/bikes.js";

export default function MotorcycleList() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") ?? "";

    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sort, setSort] = useState("popular");

    useEffect(() => {
        const loadBikes = async () => {
            try {
                const data = await fetchBikes();
                setBikes(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadBikes();
        const interval = setInterval(loadBikes, 1000);
        return () => clearInterval(interval);
    }, []);

    const options = useMemo(() => deriveOptions(bikes), [bikes]);

    const {
        brands: ALL_BRANDS,
        years: ALL_YEARS,
        types: ALL_TYPES,
        priceMin: GLOBAL_MIN,
        priceMax: GLOBAL_MAX
    } = options;

    const result = useMemo(() => {
        const filtered = applyFilters(bikes, filters, searchQuery);
        return applySort(filtered, sort);
    }, [bikes, filters, sort, searchQuery]);

    const handleDetails = (bike) => {
        navigate(`/catalog/${bike.id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24 text-gray-500">
                Loading bikes...
            </div>
        );
    }

    return (
        <div className="flex gap-8 p-6 font-sans">
            <FilterSidebar
                filters={filters}
                onChange={setFilters}
                brands={ALL_BRANDS}
                years={ALL_YEARS}
                types={ALL_TYPES}
                priceMin={GLOBAL_MIN}
                priceMax={GLOBAL_MAX}
            />

            <div className="flex-1 min-w-0">
                {searchQuery && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        Results for{" "}
                        <span className="font-semibold text-gray-900">„{searchQuery}”</span>
                    </div>
                )}

                <SortBar total={result.length} sort={sort} onSortChange={setSort} />

                {result.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium">
                            No motorcycles found matching your criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {result.map((bike) => (
                            <MotorcycleCard
                                key={bike.id}
                                {...bike}
                                image = {getBikeImage(bike)}
                                onDetails={handleDetails}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}