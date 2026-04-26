export const SORT_OPTIONS = [
    { value: "price_asc",   label: "Increasing Price" },
    { value: "price_desc",  label: "Decreasing Price" },
    { value: "year_desc",   label: "Year(new->old)" },
    { value: "year_asc",    label: "Year(old->new)" },
    { value: "mileage_asc", label: "Mileage" },
];

export const DEFAULT_FILTERS = {
    priceMin: 0,
    priceMax: 30000,
    brands: [],
    years: [],
    types: [],
};