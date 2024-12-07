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
        selector: (row) => <ClientButtons Id={row._id} />,
    },
];


export const ClientButtons = ({ Id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap gap-2 justify-center items-center">
            {/* Düzenle Butonu */}
            <button
                className="px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full sm:w-auto"
                onClick={() => navigate(`/employee-dashboard/client/${Id}`)}
            >
                Düzenle
            </button>

            {/* Görüntüle Butonu */}
            <button
                className="px-3 py-1 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full sm:w-auto"
                onClick={() => navigate(`/employee-dashboard/clients/${Id}`)}
            >
                Görüntüle
            </button>
        </div>
    );
}
