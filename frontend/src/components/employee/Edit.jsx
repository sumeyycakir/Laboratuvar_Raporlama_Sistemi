import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: "",
    });
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const depResponse = await fetchDepartments();
                setDepartments(depResponse || []);

                const empResponse = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (empResponse.data.success) {
                    const emp = empResponse.data.employee;
                    setEmployee({
                        name: emp.userId.name || "",
                        maritalStatus: emp.maritalStatus || "",
                        designation: emp.designation || "",
                        salary: emp.salary || 0,
                        department: emp.department || "",
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Veri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
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
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Laborant Bilgilerini Düzenle</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* İsim */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">İsim</label>
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            placeholder="İsim Giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Departman */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Departman</label>
                        <select
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        >
                            <option value="">Departman Seçiniz</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Unvan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unvan</label>
                        <input
                            type="text"
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                            placeholder="Unvan Giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/* Maaş */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Maaş</label>
                        <input
                            type="number"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            placeholder="Maaş Giriniz"
                            className="mt-1 p-3 block w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>
                </div>

                {/* Gönder Butonu */}
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

export default Edit;
