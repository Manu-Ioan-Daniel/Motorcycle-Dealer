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
export const submitListing = (listingData, dealerId) => {
    return API.post("/motorcycle/listings", listingData).then(async (res) => {
        console.log("Motorcycle listing created. Response type:", typeof res.data, "Response:", res.data);

        const createdListingId = res.data?.id;
        console.log("Created listing ID:", createdListingId, "Dealer ID:", dealerId);

        if (dealerId && createdListingId) {
            const payload = {
                motorcycleListingId: createdListingId,
                dealerId: dealerId,
            };
            console.log("Posting to /dealer-listings with payload:", payload);

            try {
                const dealerRes = await API.post("/dealer-listings", payload);
                console.log("Dealer listing created:", dealerRes.data);
            } catch (err) {
                console.error("Failed to create dealer-listing record:", err.response?.data || err.message);
            }
        } else {
            console.warn("Skipping dealer-listings: dealerId or createdListingId missing", { dealerId, createdListingId });
        }

        return res.data;
    });
};

export const fetchPurchaseInquiries = () =>
    API.get("/motorcycle/purchase-inquiries").then(res => res.data);

export const fetchMotorcycleDetails = (listingId) =>
    API.get(`/motorcycle/${listingId}`).then(res => res.data);

export const deletePurchaseInquiry = (listingId, inquiryId) =>
    API.delete(`/motorcycle/${listingId}/purchase-inquiry/${inquiryId}`);

export const fetchDealerListings = (dealerId) =>
    API.get(`/dealer-listings/${dealerId}`).then(res => res.data);

export const updateListing = (listingId, listingData) => {
    return API.put(`/motorcycle/listings/${listingId}`, listingData).then(res => res.data);
};

export const uploadBikeImage = (file, filename, listingId) => {
    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("filename", filename);
    if (listingId) imageFormData.append("listingId", listingId);

    return API.post("/files/upload", imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => res.data);
};

export const fetchTestRides = () =>
    API.get("/test-ride").then(res => res.data);

export const submitTestRide = (data) =>
    API.post("/test-ride", data).then(res => res.data);


