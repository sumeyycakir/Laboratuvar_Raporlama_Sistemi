import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (_row, index) => index + 1,
    },
    {
        name: "Hasta Adı",
        selector: (row) => `${row.firstName} ${row.lastName}`,
        sortable: true,
    },
    {
        name: "Yaş",
        selector: (row) => row.age,
    },
    {
        name: "Cinsiyet",
        selector: (row) => row.gender,
    },
    {
        name: "Rapor Durumu",
        selector: (row) => row.reportStatus, 
    },
    {
        name: "İşlemler",
        selector: (row) => <PatientButtons Id={row._id} onPatientDelete={onPatientDelete} />,
    },
];

const onPatientDelete = (id) => {
    console.log(`Patient with ID: ${id} deleted`);
};

export const PatientButtons = ({ Id, onPatientDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bu hastayı silmek istediğinizden emin misiniz?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/patient/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    onPatientDelete(id);
                } else {
                    alert("Hasta silinirken bir hata oluştu.");
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error);
                } else {
                    alert("Beklenmedik bir hata oluştu.");
                }
            }
        }
    };

    return (
        <div className="flex flex-wrap gap-2 justify-center items-center">
            {/* Düzenle Butonu */}
            <button
                className="px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full sm:w-auto"
                onClick={() => navigate(`/admin-dashboard/patient/${Id}`)}
            >
                Düzenle
            </button>

            {/* Görüntüle Butonu */}
            <button
                className="px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full sm:w-auto"
                onClick={() => navigate(`/admin-dashboard/patients/${Id}`)}
            >
                Görüntüle
            </button>

            {/* Sil Butonu */}
            <button
                className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 w-full sm:w-auto"
                onClick={() => handleDelete(Id)}
            >
                Sil
            </button>
        </div>
    );
};
