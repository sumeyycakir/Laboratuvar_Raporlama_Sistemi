import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Departman Adı",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "İşlemler",
        selector: (row) => row.action
    },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Silmek istiyor musun?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    onDepartmentDelete(id);
                } else {
                    alert("Error deleting department.");
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
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
                Düzenle
            </button>

            {/* Sil Butonu */}
            <button
                className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 w-full sm:w-auto"
                onClick={() => handleDelete(Id)}
            >
                Sil
            </button>
        </div>
    )
}    
