import API from "../../../shared/api/axios.js";

export const fetchBikes = () => API.get("/catalog/bikes").then(res => res.data);

export const isInWishlist = (bikeId, userId) =>
    API.get(`/motorcycle/${bikeId}/wishlist/${userId}`).then(res => res.data);

export const addToWishlist = (bikeId, userId) =>
    API.post(`/motorcycle/${bikeId}/wishlist/${userId}`);

export const removeFromWishlist = (bikeId, userId) =>
    API.delete(`/motorcycle/${bikeId}/wishlist/${userId}`);

export const submitPurchaseInquiry = (bikeId, inquiryData) =>
    API.post(`/motorcycle/${bikeId}/purchase-inquiry`, inquiryData);

export const fetchPurchaseInquiries = () =>
    API.get("/motorcycle/purchase-inquiries").then(res => res.data);

export const fetchMotorcycleDetails = (listingId) =>
    API.get(`/motorcycle/${listingId}`).then(res => res.data);

export const deletePurchaseInquiry = (listingId, inquiryId) =>
    API.delete(`/motorcycle/${listingId}/purchase-inquiry/${inquiryId}`);

export const submitListing = (listingData) =>
    API.post("/motorcycle/listings", listingData);


export const uploadBikeImage = (file, filename) => {
    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("filename", filename);

    return API.post("/files/upload", imageFormData);
};
