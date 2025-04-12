import { create } from 'zustand';
import { cartService } from '../services/cart/cartService';

const useCartStore = create((set) => ({
    cart: null,
    loading: false,
    error: null,

    // Fetch cart
    fetchCart: async () => {
        try {
            set({ loading: true, error: null });
            const data = await cartService.getCart();
            set({ cart: data, loading: false });
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch cart',
                loading: false
            });
        }
    },

    // Add to cart
    addToCart: async (bookId, quantity = 1) => {
        try {
            set({ loading: true, error: null });
            const data = await cartService.addToCart(bookId, quantity);
            set({ cart: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to add item to cart',
                loading: false
            });
            throw error;
        }
    },

    // Update cart item
    updateCartItem: async (bookId, quantity) => {
        try {
            set({ loading: true, error: null });
            const data = await cartService.updateCartItem(bookId, quantity);
            set({ cart: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to update cart item',
                loading: false
            });
            throw error;
        }
    },

    // Remove from cart
    removeFromCart: async (bookId) => {
        try {
            set({ loading: true, error: null });
            const data = await cartService.removeFromCart(bookId);
            set({ cart: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to remove item from cart',
                loading: false
            });
            throw error;
        }
    },

    // Clear cart
    clearCart: async () => {
        try {
            set({ loading: true, error: null });
            await cartService.clearCart();
            set({ cart: null, loading: false });
        } catch (error) {
            set({
                error: error.message || 'Failed to clear cart',
                loading: false
            });
            throw error;
        }
    },

    // Checkout
    checkout: async (checkoutData) => {
        try {
            set({ loading: true, error: null });
            const data = await cartService.checkout(checkoutData);
            set({ cart: null, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Checkout failed',
                loading: false
            });
            throw error;
        }
    },

    // Apply coupon
    applyCoupon: async (couponCode) => {
        try {
            set({ loading: true, error: null });
            const data = await cartService.applyCoupon(couponCode);
            set({ cart: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to apply coupon',
                loading: false
            });
            throw error;
        }
    },

    // Remove coupon
    removeCoupon: async () => {
        try {
            set({ loading: true, error: null });
            const data = await cartService.removeCoupon();
            set({ cart: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to remove coupon',
                loading: false
            });
            throw error;
        }
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useCartStore; 