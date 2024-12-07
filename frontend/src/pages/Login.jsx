import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Sunucu hatası");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-500 via-blue-400 to-white p-8 space-y-8">

            <h2 className="font-sevillana text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-teal-100 shadow-lg mb-6">
                Laboratuvar Raporlama Sistemi
            </h2>

            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
                <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">Giriş Yap</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-lg text-gray-700">E-posta</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                            placeholder="E-posta adresinizi girin"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg text-gray-700">Şifre</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                            placeholder="Şifrenizi girin"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300">
                        Giriş Yap
                    </button>

                    {/* Beni Hatırla ve Şifremi Unuttum kısmı */}
                    <div className="mt-6 flex items-center justify-between text-sm text-gray-700">
                        <div className="flex items-center space-x-3">
                            {/* Beni Hatırla */}
                            <input 
                                type="checkbox" 
                                className="form-checkbox h-5 w-5 text-teal-500 focus:ring-teal-500 transition-all duration-300" 
                            />
                            <span className="text-sm text-gray-600">Beni hatırla</span>
                        </div>
                        {/* Şifremi Unuttum */}
                        <a href="#" className="text-teal-500 hover:text-teal-700 focus:text-teal-800 transition-all duration-300">Şifremi unuttum?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
