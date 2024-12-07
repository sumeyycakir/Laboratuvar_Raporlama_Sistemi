import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployee, setFilteredEmployees] = useState([]);

    // Tablo sütunları tanımı
    const columns = [
        { name: 'S.No', selector: row => row.sno, sortable: true },
        { name: 'İsim', selector: row => row.name, sortable: true },
        { name: 'Departman', selector: row => row.dep_name, sortable: true },
        { name: 'Doğum Tarihi', selector: row => row.dob, sortable: true },
        {
            name: 'Profil Resmi',
            cell: row => (
                <img
                    src={row.profileImage || 'https://via.placeholder.com/40'}
                    alt="Profil"
                    className="w-10 h-10 rounded-full"
                />
            ),
        },
        { name: 'İşlemler', cell: row => row.action },
    ];

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: `http://localhost:5000/${emp.userId.profileImage}`,
                        action: (<EmployeeButtons Id={emp._id} />),
                    }));

                    setEmployees(data);
                    setFilteredEmployees(data)
                }
            } catch (error) {
                alert(error.response?.data?.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setFilteredEmployees(records);
    };

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">Laborantları Yönet</h3>
            </div>
            <div className="flex justify-between items-center my-4">
                <input
                    type="text"
                    placeholder="Adına göre ara"
                    className="px-4 py-0.5 border"
                    onChange={handleFilter}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-8 py-3 bg-teal-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"

                >
                    Yeni Çalışan Ekle
                </Link>
            </div>
            <div className="mt-6">
                {empLoading ? (
                    <p>Çalışanlar yükleniyor...</p>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredEmployee}
                        pagination
                        customStyles={{
                            rows: {
                                style: {
                                    fontSize: '1rem',
                                },
                                hoverStyle: {
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold', 
                                },
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default List;
