import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setDepartment(response.data.department);
                } else {
                    alert(response.data.error);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    alert("Bir hata oluştu. Lütfen tekrar deneyin.");
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment(prev => ({
            ...prev,
            [name]: value !== undefined ? value : prev[name]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("Bir hata oluştu. Lütfen tekrar deneyin.");
            }
        }
    };

    return (
        <>
            {depLoading ? <div>Loading ...</div> :
                <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg border border-gray-300">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Departmanı Düzenle
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
                                onChange={handleChange}
                                value={department.dep_name}
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
                                placeholder="Açıklama"
                                onChange={handleChange}
                                value={department.description}
                                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                                rows="4"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300"
                        >
                            Departmanı Düzenle
                        </button>
                    </form>
                </div>
            }
        </>
    );
};

export default EditDepartment;
