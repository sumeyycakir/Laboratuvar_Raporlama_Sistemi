import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPatient = () => {
    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        dateOfBirth: "",
        contactNumber: "",
        tcNumber: "",
        testResults: [{ testName: "", result: "", date: "" }],
        assignedStaff: "",
        reportStatus: "Beklemede",
        file: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchPatientData = async () => {
            setLoading(true);
            try {
                const patientResponse = await axios.get(`http://localhost:5000/api/patient/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log(patientResponse);

                if (patientResponse.data.success) {
                    const patientData = patientResponse.data.patient;
                    setPatient({
                        firstName: patientData.firstName || "",
                        lastName: patientData.lastName || "",
                        age: patientData.age || 0,
                        gender: patientData.gender || "",
                        dateOfBirth: patientData.dateOfBirth || "",
                        contactNumber: patientData.contactNumber || "",
                        tcNumber: patientData.tcNumber || "",
                        testResults: patientData.testResults || [{ testName: "", result: "", date: "" }],
                        assignedStaff: patientData.assignedStaff || "",
                        reportStatus: patientData.reportStatus || "Beklemede",
                        file: patientData.file || "",
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error("Hata:", err);
                setError("Veri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTestResultsChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTestResults = [...patient.testResults];
        updatedTestResults[index][name] = value;
        setPatient({ ...patient, testResults: updatedTestResults });
    };

    const handleAddTestResult = () => {
        setPatient({
            ...patient,
            testResults: [...patient.testResults, { testName: "", result: "", date: "" }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/patient/${id}`,
                patient,
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
            console.error(error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-blue-50 to-purple-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Hasta Bilgilerini Düzenle</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ad</label>
                        <input
                            type="text"
                            name="firstName"
                            value={patient.firstName}
                            onChange={handleChange}
                            placeholder="Adınızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Soyad</label>
                        <input
                            type="text"
                            name="lastName"
                            value={patient.lastName}
                            onChange={handleChange}
                            placeholder="Soyadınızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Yaş</label>
                        <input
                            type="number"
                            name="age"
                            value={patient.age}
                            onChange={handleChange}
                            placeholder="Yaşınızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                        <select
                            name="gender"
                            value={patient.gender}
                            onChange={handleChange}
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
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
                            value={patient.dateOfBirth}
                            onChange={handleChange}
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefon Numarası</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={patient.contactNumber}
                            onChange={handleChange}
                            placeholder="Telefon numaranızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Test Sonuçları</h3>
                        {patient.testResults.map((result, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Test Adı</label>
                                    <input
                                        type="text"
                                        name="testName"
                                        value={result.testName}
                                        onChange={(e) => handleTestResultsChange(index, e)}
                                        className="mt-2 p-3 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sonuç</label>
                                    <input
                                        type="text"
                                        name="result"
                                        value={result.result}
                                        onChange={(e) => handleTestResultsChange(index, e)}
                                        className="mt-2 p-3 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tarih</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={result.date}
                                        onChange={(e) => handleTestResultsChange(index, e)}
                                        className="mt-2 p-3 block w-full border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddTestResult}
                            className="mt-4 text-blue-600"
                        >
                            Yeni Rapor Ekle
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">TC Kimlik Numarası</label>
                        <input
                            type="text"
                            name="tcNumber"
                            value={patient.tcNumber}
                            onChange={handleChange}
                            placeholder="TC kimlik numaranızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Atanan Laborant</label>
                    <input
                        type="text"
                        name="assignedStaff"
                        value={patient.assignedStaff}
                        onChange={handleChange}
                        placeholder="Atanan personel adını giriniz"
                        className="mt-1 p-3 block w-full max-w-md border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:border-blue-500"
                        required
                    />
                </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rapor Durumu</label>
                        <select
                            name="reportStatus"
                            value={patient.reportStatus}
                            onChange={handleChange}
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        >
                            <option value="Pending">Beklemede</option>
                            <option value="Completed">Tamamlandı</option>
                            <option value="Reviewed">İncelendi</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:bg-indigo-600"
                    >
                        Kaydet
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPatient;
