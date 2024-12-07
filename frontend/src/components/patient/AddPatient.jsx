import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        tcNumber: '',
        dateOfBirth: '',
        reportStatus: '',
        file: '',
        testResults: [{ testName: '', result: '', date: '' }],
        assignedStaff: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTestResultsChange = (e, index) => {
        const { name, value } = e.target;
        const newTestResults = [...formData.testResults];
        newTestResults[index][name] = value;
        setFormData((prevData) => ({ ...prevData, testResults: newTestResults }));
    };

    const addTestResult = () => {
        setFormData({
            ...formData,
            testResults: [...formData.testResults, { testName: '', result: '', date: '' }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, age, gender, contactNumber, tcNumber, dateOfBirth, reportStatus, assignedStaff, testResults } = formData;

        if (!firstName || !lastName || !age || !gender || !contactNumber || !tcNumber || !dateOfBirth || !reportStatus) {
            alert("Lütfen tüm alanları doldurduğunuzdan emin olun.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/patient/add',
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/patients");
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Yeni Hasta Ekle</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">İsim</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="İsim Giriniz"
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Soyisim</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Soyisim Giriniz"
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Yaş</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Yaş Giriniz"
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Cinsiyet Seçiniz</option>
                            <option value="Erkek">Erkek</option>
                            <option value="Kadın">Kadın</option>
                            <option value="Diğer">Diğer</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefon Numarası</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="Telefon Numarası Giriniz"
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">TC Kimlik Numarası</label>
                        <input
                            type="text"
                            name="tcNumber"
                            value={formData.tcNumber}
                            onChange={handleChange}
                            placeholder="TC Kimlik Numarası Giriniz"
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rapor Durumu</label>
                        <select
                            name="reportStatus"
                            value={formData.reportStatus}
                            onChange={handleChange}
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md"
                        >
                            <option value="Beklemede">Beklemede</option>
                            <option value="Tamamlandı">Tamamlandı</option>
                            <option value="Devam ediyor">Devam ediyor</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Atanan Laborant</label>
                        <input
                            type="text"
                            name="assignedStaff"
                            value={formData.assignedStaff}
                            onChange={handleChange}
                            placeholder="Atanan Laborant Giriniz"
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dosya</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                            className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rapor Sonuçları</label>
                        {formData.testResults.map((testResult, index) => (
                            <div key={index} className="mt-2">
                                <input
                                    type="text"
                                    name="testName"
                                    value={testResult.testName}
                                    onChange={(e) => handleTestResultsChange(e, index)}
                                    placeholder="Tanı Başlığı"
                                    className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    name="result"
                                    value={testResult.result}
                                    onChange={(e) => handleTestResultsChange(e, index)}
                                    placeholder="Tanı Detayı"
                                    className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={testResult.date}
                                    onChange={(e) => handleTestResultsChange(e, index)}
                                    placeholder="Tarih"
                                    className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTestResult}
                            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                        >
                            Yeni Rapor Ekle
                        </button>
                    </div>

                </div>

                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-teal-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                        disabled={loading}
                    >
                        {loading ? "Ekleme Yapılıyor..." : "Hasta Ekle"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPatient;
