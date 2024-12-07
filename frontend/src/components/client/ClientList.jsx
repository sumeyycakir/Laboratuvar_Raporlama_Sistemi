import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, ClientButtons } from '../../utils/ClientHelper'; 
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [filteredClients, setFilteredClients] = useState([]);  

    const onClientDelete = async (id) => {
        const data = clients.filter(client => client._id !== id);
        setClients(data);
        setFilteredClients(data);
    };

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/client', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.clients.map((client) => ({  
                        _id: client._id,
                        sno: sno++,  
                        firstName: client.firstName,
                        lastName: client.lastName,
                        age: client.age,
                        gender: client.gender,
                        assignedStaff: client.assignedStaff || "Belirtilmemiş",  
                        reportStatus: client.reportStatus || "Beklemede", 
                        action: <ClientButtons Id={client._id} onClientDelete={onClientDelete} />  
                    }));

                    setClients(data);
                    setFilteredClients(data);
                }
            } catch (error) {
                alert("Bir hata oluştu. Lütfen tekrar deneyin.");
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const filterClients = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = clients.filter(client =>
            `${client.firstName} ${client.lastName}`.toLowerCase().includes(query)
        );
        setFilteredClients(filtered);
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-10 text-xl text-gray-500">
                    Yükleniyor...
                </div>
            ) : (
                <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-gray-800">Hasta Yönetim Sistemi</h3> 
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
                        <input
                            type="text"
                            placeholder="Hasta Adına Göre Ara"
                            className="px-4 py-2 w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
                            onChange={filterClients} 
                        />
                        <Link
                            to="/employee-dashboard/add-client" 
                            className="px-8 py-3 bg-teal-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Hasta Ekle
                        </Link>
                    </div>
                    <div>
                        <DataTable
                            columns={columns}  
                            data={filteredClients}  
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
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: '#333',
                                        backgroundColor: '#f1f1f1',
                                        padding: '12px',
                                    },
                                },
                                cells: {
                                    style: {
                                        fontSize: '16px',
                                        color: '#555',
                                        padding: '12px',
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

export default ClientList;
