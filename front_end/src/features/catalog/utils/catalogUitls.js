

export function deriveOptions(bikes) {
    if (!bikes.length) return { brands: [], years: [], types: [], priceMin: 0, priceMax: 99999 };
    return {
        brands:   [...new Set(bikes.map((b) => b.brand))].sort(),
        years:    [...new Set(bikes.map((b) => b.year))].sort((a, b) => b - a),
        types:    [...new Set(bikes.map((b) => b.type))].sort(),
        priceMin: Math.min(...bikes.map((b) => b.price)),
        priceMax: Math.max(...bikes.map((b) => b.price)),
    };
}

export function applyFilters(bikes, filters, searchQuery = "") {
    return bikes.filter((bike) => {
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            if (!`${bike.brand} ${bike.model}`.toLowerCase().includes(q)) return false;
        }
        if (bike.price < filters.priceMin || bike.price > filters.priceMax) return false;
        if (filters.brands.length > 0 && !filters.brands.includes(bike.brand)) return false;
        if (filters.years.length > 0 && !filters.years.includes(bike.year)) return false;
        if (filters.types.length > 0 && !filters.types.includes(bike.type)) return false;
        return true;
    });
}

export function applySort(bikes, sort) {
    const sorted = [...bikes];
    switch (sort) {
        case "price_asc":   return sorted.sort((a, b) => a.price - b.price);
        case "price_desc":  return sorted.sort((a, b) => b.price - a.price);
        case "year_desc":   return sorted.sort((a, b) => b.year - a.year);
        case "year_asc":    return sorted.sort((a, b) => a.year - b.year);
        case "mileage_asc": return sorted.sort((a, b) => a.mileage - b.mileage);
        default:            return sorted;
    }
}

export function getBikeImage(bike) {
    const fileName = `${bike.brand.toLowerCase()}_${bike.model.toLowerCase()}`;
    console.log(fileName);
    return new URL(`../../../assets/bikes/${fileName}.jpeg`, import.meta.url).href;
}