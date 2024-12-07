import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaBirthdayCake, FaVenusMars, FaPhoneAlt, FaClipboardCheck } from 'react-icons/fa';

const ClientView = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/client/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setClient(response.data.client);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchClient();
    }, [id]);

    if (!client) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-300 p-8 rounded-2xl shadow-lg relative overflow-hidden">
            {/* Arka Plan Dalga */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-500 opacity-30 blur-3xl"></div>

            {/* Başlık */}
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 p-4 bg-white rounded-lg shadow-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Hasta Detayları
            </h2>

            {/* Kart Alanı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Resim Alanı */}
                <div className="flex justify-center">
                    {/* Burada resim olmadığı için placeholder kullanıyoruz */}
                    <div className="rounded-full w-64 h-64 bg-gray-400 flex items-center justify-center text-white text-4xl">
                        <FaUser />
                    </div>
                </div>

                {/* Bilgi Alanları */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <FaUser className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Ad:</p>
                        <p className="text-xl font-semibold text-gray-900">{client.firstName} {client.lastName}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaBirthdayCake className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Doğum Tarihi:</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {new Date(client.dateOfBirth).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaVenusMars className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Cinsiyet:</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {client.gender === 'Kadın' ? 'Kadın' : client.gender === 'Erkek' ? 'Erkek' : 'Diğer'}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPhoneAlt className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Telefon:</p>
                        <p className="text-xl font-semibold text-gray-900">{client.contactNumber}</p>
                    </div>


                    {/* Atanan Personel ve Rapor Durumu */}
                    <div className="flex items-center space-x-3">
                        <FaClipboardCheck className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Atanan Laborant:</p>
                        <p className="text-xl font-semibold text-gray-900">{client.assignedStaff || 'Belirtilmemiş'}</p>
                    </div>
                    {/* Rapor Durumu */}
                    <div className="flex items-center space-x-3">
                        <FaClipboardCheck className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Rapor Durumu:</p>
                        <p className="text-xl font-semibold text-gray-900">{client.reportStatus || 'Beklemede'}</p>
                    </div>
                    {/* Test Sonuçları */}
                    <div className="flex items-center space-x-3">
                        <FaClipboardCheck className="text-indigo-600 text-xl" />
                        <p className="text-lg font-bold text-gray-700">Sonuç:</p>
                        <ul className="text-sm font-semibold text-gray-900 space-y-2">
                            {client.testResults && client.testResults.length > 0 ? (
                                client.testResults.map((test, index) => (
                                    <li key={index}>
                                        <strong>{test.testName}:</strong> {test.result} ({new Date(test.date).toLocaleDateString()})
                                    </li>
                                ))
                            ) : (
                                <p>Test sonuçları mevcut değil</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientView;
