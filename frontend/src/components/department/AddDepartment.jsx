import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!department.dep_name || !department.description) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true); 

        try {
            const response = await axios.post(
                'http://localhost:5000/api/department/add', 
                department, 
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                setDepartment({ dep_name: '', description: '' }); 
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            console.error(error); 
            if (error.response && error.response.data) {
                alert(error.response.data.error || "An error occurred.");
            } else {
                alert("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Yeni Departman Ekle
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="dep_name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Departman Adı
                    </label>
                    <input
                        type="text"
                        name="dep_name"
                        value={department.dep_name}
                        onChange={handleChange}
                        placeholder="Departman Adı"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Açıklama
                    </label>
                    <textarea
                        name="description"
                        value={department.description}
                        onChange={handleChange}
                        placeholder="Açıklama"
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 ${loading ? 'bg-gray-400' : 'bg-teal-600 hover:bg-teal-700'} text-white font-semibold rounded-lg transition-all duration-300`}
                >
                    {loading ? 'Ekleme Yapılıyor...' : 'Departman Ekle'}
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
