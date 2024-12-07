import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const onDepartmentDelete = async (id) => {
        const data = departments.filter(dep => dep._id !== id);
        setDepartments(data);
        setFilteredDepartments(data);
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.departments.map((dep) => ({
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
                    }));

                    setDepartments(data);
                    setFilteredDepartments(data);
                }
            } catch (error) {
                alert("Bir hata oluştu. Lütfen tekrar deneyin.");
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = departments.filter(dep =>
            dep.dep_name.toLowerCase().includes(query)
        );
        setFilteredDepartments(filtered);
    };

    return (
        <>
            {depLoading ? (
                <div className="flex justify-center items-center py-10 text-xl text-gray-500">
                    Yükleniyor...
                </div>
            ) : (
                <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-gray-800">Departmanları Yönet</h3>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
                        <input
                            type="text"
                            placeholder="Bölüm Adına Göre Ara"
                            className="px-4 py-2 w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                            onChange={filterDepartments}
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="px-8 py-3 bg-teal-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"

                        >
                            Yeni Departman Ekle
                        </Link>
                    </div>
                    <div>
                        <DataTable
                            columns={columns}
                            data={filteredDepartments}
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[5, 10, 15]}
                            customStyles={{
                                rows: {
                                    style: {
                                        minHeight: '45px',
                                        backgroundColor: '#fafafa',
                                        borderBottom: '1px solid #e5e5e5', 
                                    },
                                },
                                headCells: {
                                    style: {
                                        fontSize: '18px',  // Büyütülmüş font
                                        fontWeight: '600',
                                        color: '#333',
                                        backgroundColor: '#f1f1f1',
                                        padding: '12px', // Genişletilmiş padding
                                    },
                                },
                                cells: {
                                    style: {
                                        fontSize: '16px', // Büyütülmüş font
                                        color: '#555',
                                        padding: '12px', // Genişletilmiş padding
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentList;
