import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Şifre eşleşmiyor.");
        } else {
            try {
                const response = await axios.put("http://localhost:5000/api/setting/change-password",
                    setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    navigate("/admin-dashboard/employees");
                    setError("");
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    };
    
return (


    <div className="max-w-lg mx-auto mt-16 bg-white p-8 rounded-xl shadow-xl transition-transform transform hover:scale-102">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Şifreyi Değiştir
    </h2>
    <p className="text-red-500 text-center mb-4">{error}</p>
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Eski Şifre */}
        <div className="flex flex-col">
            <label
                htmlFor="oldPassword"
                className="text-sm font-medium text-gray-700 mb-2"
            >
                Eski Şifre
            </label>
            <input
                type="password"
                name="oldPassword"
                placeholder="Eski Şifre"
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
                required
            />
        </div>

        {/* Yeni Şifre */}
        <div className="flex flex-col">
            <label
                htmlFor="newPassword"
                className="text-sm font-medium text-gray-700 mb-2"
            >
                Yeni Şifre
            </label>
            <input
                type="password"
                name="newPassword"
                placeholder="Yeni Şifre"
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
                required
            />
        </div>

        {/* Yeni Şifreyi Tekrar Girin */}
        <div className="flex flex-col">
            <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 mb-2"
            >
                Yeni Şifreyi Tekrar Girin
            </label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="Yeni Şifreyi Tekrar Girin"
                onChange={handleChange}
                className="px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300"
                required
            />
        </div>

        {/* Gönder Butonu */}
        <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            Şifreyi Değiştir
        </button>
    </form>
</div>


    )
}


export default Setting;
