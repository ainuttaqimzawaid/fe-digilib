import { useState, useEffect } from 'react';
import { cartService } from '../services/cart/cartService';

export const useCart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await cartService.getCart();
            setCart(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (bookId, quantity = 1) => {
        try {
            setLoading(true);
            const data = await cartService.addToCart(bookId, quantity);
            setCart(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to add item to cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (bookId, quantity) => {
        try {
            setLoading(true);
            const data = await cartService.updateCartItem(bookId, quantity);
            setCart(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to update cart item');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (bookId) => {
        try {
            setLoading(true);
            const data = await cartService.removeFromCart(bookId);
            setCart(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to remove item from cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await cartService.clearCart();
            setCart(null);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to clear cart');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const checkout = async (checkoutData) => {
        try {
            setLoading(true);
            const data = await cartService.checkout(checkoutData);
            setCart(null);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Checkout failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const applyCoupon = async (couponCode) => {
        try {
            setLoading(true);
            const data = await cartService.applyCoupon(couponCode);
            setCart(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to apply coupon');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeCoupon = async () => {
        try {
            setLoading(true);
            const data = await cartService.removeCoupon();
            setCart(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to remove coupon');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        checkout,
        applyCoupon,
        removeCoupon,
        refreshCart: fetchCart
    };
}; 