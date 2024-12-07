import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataObj.append(key, formData[key]);
      }

    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
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

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Yeni Laborant Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* İsim */}
          <div>
            <label className="block text-sm font-medium text-gray-700">İsim</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="İsim Giriniz"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="E-posta Giriniz"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Çalışan Kimlik Numarası */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Çalışan ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Çalışan ID Giriniz"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Doğum Tarihi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Cinsiyet */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Cinsiyet Seçiniz</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </div>

          {/* Medeni Durum */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Medeni Durum</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Medeni Durum Seçiniz</option>
              <option value="single">Bekar</option>
              <option value="married">Evli</option>
            </select>
          </div>

          {/* Departman */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Departman</label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={handleChange}
              placeholder="Unvan Giriniz"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Maaş */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Maaş</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Maaş Giriniz"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Rol Seçiniz</option>
              <option value="admin">Admin</option>
              <option value="employee">Laborant</option>
            </select>
          </div>

          {/* Resim Yükle */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Resim Yükle</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              placeholder="Upload Image"
              accept="image/*"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Şifre Giriniz"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Gönder Butonu */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-teal-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"

          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}
export default Add;
