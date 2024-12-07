import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBuilding, FaUsers, FaUserMd } from 'react-icons/fa';

const AdminSidebar = () => {
    return (
        <div className='bg-gradient-to-b from-teal-800 to-teal-600 text-white h-screen w-64 fixed left-0 top-0 p-6'>
            {/* Başlık ve Alt Başlık */}
            <div className='h-28 flex flex-col items-center justify-center mb-8'>
                <h3 className='text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg'>
                    Laboratuvar
                </h3>
                <p className='text-xs font-medium text-white mt-2 text-center tracking-wide opacity-80'>
                    Raporlama Sistemi
                </p>
            </div>

            {/* Menü Linkleri */}
            <div className='space-y-4'>
                <NavLink
                    to="/admin-dashboard"
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                    end
                >
                    <FaTachometerAlt className="text-2xl" />
                    <span>Kontrol Paneli</span>
                </NavLink>

                <NavLink
                    to="/admin-dashboard/employees"
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                >
                    <FaUsers className="text-2xl" />
                    <span>Laborantlar</span>
                </NavLink>

                <NavLink
                    to="/admin-dashboard/departments"
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                >
                    <FaBuilding className="text-2xl" />
                    <span>Departmanlar</span>
                </NavLink>
                <NavLink
                    to="/admin-dashboard/patients"
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                >
                    <FaUserMd className="text-2xl" />
                    <span>Hasta Giriş</span>
                </NavLink>

            </div>
        </div>
    );
};

export default AdminSidebar;
