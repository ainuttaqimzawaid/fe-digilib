import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../app/store/useAuthStore";
import ImageLibrary from '../assets/images/bg-hero-image.jpg';
import { toast } from "react-toastify";

export const UserLoginPage = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);
    const isAuthenticated = useAuthStore((state) => !!state.user);
    const clearError = useAuthStore((state) => state.clearError);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (user) {
            navigate('/');
        }
        clearError();
    }, [user, navigate, clearError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error for this field when user types
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await login(formData);
                if (isAuthenticated) {
                    navigate('/');
                }
            } catch (error) {
                // Error is handled by the store
                console.error('login failed:', error);
            }
        }
    };

    return (
        <section className="w-screen h-screen text-white relative bg-[url('/src/assets/bg-hero-image.jpg')] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/40">
            <div className="bg-black/20 backdrop-blur-[2px] flex items-center w-screen h-screen justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-80 md:w-[400px] bg-black/70 shadow-amber-200 rounded-[20px] p-6 shadow-lg flex flex-col gap-5 mt-20"
                >
                    <h1 className="text-2xl font-bold text-center mb-2 leading-tight">
                        Login
                    </h1>

                    {error && (
                        <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="flex items-center gap-3 rounded-full p-3 shadow border">
                        <input
                            type="text"
                            name="email"
                            placeholder="Masukkan Email Anda"
                            className="flex-1 text-base placeholder-opacity-50 outline-none"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center gap-3 rounded-full p-3 shadow border">
                        <input

                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Masukkan Password Anda"
                            className="flex-1 text-base placeholder-opacity-50 outline-none"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Sembunyikan" : "Tampilkan"}
                        >
                            {showPassword === true ? "👁️" : "🙈"}
                            {/* <FaEyeSlash /> / <FaEye /> */}
                        </span>
                    </div>
                    <div className="text-sm text-gray-400 text-end">
                        <button className="hover:underline !p-0"
                            onClick={
                                () => toast.info('😱😱😱 Oh tidaak!! hak akses anda dibatasi!!!')
                                // () => navigate('/forgot-password')
                            }>
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#fdf9e8] text-[#462d07] !rounded-full text-lg hover:bg-[#fbe488] transition"
                    >
                        Sign in
                    </button>

                    <p className="text-center text-sm">
                        Belum punya akun?
                        <button className="text-[#3f97cd] cursor-pointer hover:underline !p-1"
                            onClick={() => navigate('/register')}>
                            Sign up
                        </button>
                    </p>
                </form>
            </div >
        </section >
    );
};
