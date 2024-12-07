import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditClient = () => {
    const [client, setClient] = useState({
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
        const fetchClientData = async () => {
            setLoading(true);
            try {
                const clientResponse = await axios.get(`http://localhost:5000/api/client/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log(clientResponse);

                if (clientResponse.data.success) {
                    const clientData = clientResponse.data.client;
                    setClient({
                        firstName: clientData.firstName || "",
                        lastName: clientData.lastName || "",
                        age: clientData.age || 0,
                        gender: clientData.gender || "",
                        dateOfBirth: clientData.dateOfBirth || "",
                        contactNumber: clientData.contactNumber || "",
                        tcNumber: clientData.tcNumber || "",
                        testResults: clientData.testResults || [{ testName: "", result: "", date: "" }],
                        assignedStaff: clientData.assignedStaff || "",
                        reportStatus: clientData.reportStatus || "Beklemede",
                        file: clientData.file || "",
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error("Error:", err);
                setError("Veri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
                setLoading(false);
            }
        };

        fetchClientData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleTestResultsChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTestResults = [...client.testResults];
        updatedTestResults[index][name] = value;
        setClient({ ...client, testResults: updatedTestResults });
    };

    const handleAddTestResult = () => {
        setClient({
            ...client,
            testResults: [...client.testResults, { testName: "", result: "", date: "" }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/client/${id}`,
                client,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate("/employee-dashboard/clients");
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    if (loading) return <div className="text-center text-gray-500">Yükleniyor...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-blue-50 to-purple-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Hasta Bilgilerini Düzenle</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ad</label>
                        <input
                            type="text"
                            name="firstName"
                            value={client.firstName}
                            onChange={handleChange}
                            placeholder="Adınızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Soyad</label>
                        <input
                            type="text"
                            name="lastName"
                            value={client.lastName}
                            onChange={handleChange}
                            placeholder="Soyadınızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Yaş</label>
                        <input
                            type="number"
                            name="age"
                            value={client.age}
                            onChange={handleChange}
                            placeholder="Yaşınızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                        <select
                            name="gender"
                            value={client.gender}
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

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={client.dateOfBirth}
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
                            value={client.contactNumber}
                            onChange={handleChange}
                            placeholder="Telefon numaranızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Test Sonuçları</h3>
                        {client.testResults.map((result, index) => (
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

                    {/* TC Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">TC Kimlik Numarası</label>
                        <input
                            type="text"
                            name="tcNumber"
                            value={client.tcNumber}
                            onChange={handleChange}
                            placeholder="TC kimlik numaranızı giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rapor Durumu</label>
                        <select
                            name="reportStatus"
                            value={client.reportStatus}
                            onChange={handleChange}
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
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
                            value={client.assignedStaff}
                            onChange={handleChange}
                            placeholder="Atanan laborant ismini giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dosya</label>
                        <input
                            type="text"
                            name="file"
                            value={client.file}
                            onChange={handleChange}
                            placeholder="Dosya ismini giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                </div>

                {/* Submit Button */}
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

export default EditClient;
