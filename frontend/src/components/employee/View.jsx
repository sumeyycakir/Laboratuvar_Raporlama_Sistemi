import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaIdCard, FaBirthdayCake, FaVenusMars, FaBuilding, FaHeart } from "react-icons/fa";

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <div>Yükleniyor...</div>;
    }

    return (
        
        <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-300 p-8 rounded-2xl shadow-lg relative overflow-hidden">
    {/* Arka Plan Dalga */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-500 opacity-30 blur-3xl"></div>

    {/* Başlık */}
    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 p-4 bg-white rounded-lg shadow-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Çalışan Detayları
    </h2>

            {/* Kart Alanı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Resim Alanı */}
                <div className="flex justify-center">
                    <img
                        src={`http://localhost:5000/${employee.userId.profileImage}`}
                        alt="Çalışan"
                        className="rounded-full w-64 h-64 object-cover shadow-lg hover:scale-105 transform transition-transform duration-300"
                    />
                </div>

                {/* Bilgi Alanları */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <FaUser className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Ad:</p>
                        <p className="text-xl font-semibold text-gray-900">{employee.userId.name}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaIdCard className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Çalışan No:</p>
                        <p className="text-xl font-semibold text-gray-900">{employee.employeeId}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaBirthdayCake className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Doğum Tarihi:</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {new Date(employee.dob).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaVenusMars className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Cinsiyet:</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {employee.gender === 'female' ? 'Kadın' : 'Erkek'}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaBuilding className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Departman:</p>
                        <p className="text-xl font-semibold text-gray-900">{employee.department.dep_name}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaHeart className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Medeni Durum:</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {employee.maritalStatus === 'single' ? 'Bekar' : 'Evli'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;
