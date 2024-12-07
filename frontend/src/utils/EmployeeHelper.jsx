import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "60px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "10px"

    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    },
];


export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        } else {
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }
    return departments
};


export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4 justify-center items-center flex-wrap w-full">
            <button
                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full sm:w-auto"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
                Görüntüle
            </button>
            <button
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >
                Edit
            </button>
        </div>
    );
};
