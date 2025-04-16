import api from '../api/config';

export const cartService = {
    async getCart() {
        const response = await api.get('/cart');
        return response.data;
    },

    async addToCart(bookId, quantity = 1) {
        const response = await api.post('/cart', { bookId, quantity });
        return response.data;
    },

    async updateCartItem(bookId, quantity) {
        const response = await api.put(`/cart/${bookId}`, { quantity });
        return response.data;
    },

    async removeFromCart(bookId) {
        const response = await api.delete(`/cart/${bookId}`);
        return response.data;
    },

    async clearCart() {
        const response = await api.delete('/cart');
        return response.data;
    },

    async checkout(checkoutData) {
        const response = await api.post('/cart/checkout', checkoutData);
        return response.data;
    },

    async getCartSummary() {
        const response = await api.get('/cart/summary');
        return response.data;
    },

    async applyCoupon(couponCode) {
        const response = await api.post('/cart/coupon', { code: couponCode });
        return response.data;
    },

    async removeCoupon() {
        const response = await api.delete('/cart/coupon');
        return response.data;
    }
}; 