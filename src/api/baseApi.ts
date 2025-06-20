export const API_BASE = 'http://localhost:5000';
// export const API_BASE = process.env.REACT_APP_Backend_Api || 'http://localhost:800';

const endpoints = {
    // Admin Auth
    adminRegister: `${API_BASE}/api/auth/admin/register`,
    adminLogout: `${API_BASE}/api/auth/admin/logout`,
    getAllUsers: `${API_BASE}/api/auth/admin/all`,

    // Address
    addAddress: (userId: string) => `${API_BASE}/api/address/${userId}`,

    // Category
    addCategory: `${API_BASE}/api/category`,
    getAllCategories: `${API_BASE}/api/category/`,

    // Product
    AllProducts:`${API_BASE}/api/product/admin/see`,
    addProduct: (categoryId: string) =>
        `${API_BASE}/api/product/${categoryId}/create`,
    deleteProductFromCategoryAndProduct: (
        productId: string,
        categoryId: string
    ) => `${API_BASE}/api/product/${productId}/${categoryId}`,
    updateStock: (productId: string) =>
        `${API_BASE}/api/product/${productId}/updateStock`,
    updateFeatured: (productId: string) =>
        `${API_BASE}/api/product/${productId}/updateFeatured`,

    // Order
    getAllOrders: `${API_BASE}/api/order/admin/all`,
    updateOrderStatus: (orderId: string) =>
        `${API_BASE}/api/order/admin/${orderId}`,


    //slider 
    addSlider:`${API_BASE}/api/slider/add`,
    deleteSlider:(sliderId:string)=>`${API_BASE}/api/slider/${sliderId}/delete`,
    getSlider:`${API_BASE}/api/slider/see`,
};
export default endpoints;
