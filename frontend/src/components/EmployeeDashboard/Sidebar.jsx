import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCogs, FaUserPlus } from "react-icons/fa";
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <div className='bg-gradient-to-b from-teal-800 to-teal-600 text-white h-screen w-64 fixed left-0 top-0 p-6'>
            {/* Başlık */}
            <div className='h-28 flex flex-col items-center justify-center mb-8'>
                <h3 className='text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg'>
                    Laboratuvar
                </h3>
                <p className='text-xs font-medium text-white mt-2 text-center tracking-wide opacity-80'>
                    Raporlama Sistemi
                </p>
            </div>

            {/* Sidebar Menüsü */}
            <div className='space-y-6'>
                {/* Dashboard Linki */}
                <NavLink
                    to="/employee-dashboard"
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                    end
                >
                    <FaTachometerAlt />
                    <span>Ana Sayfa</span>
                </NavLink>

                {/* My Profile Linki */}
                <NavLink
                    to={`/employee-dashboard/profile/${user._id}`}
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                >
                    <FaUsers />
                    <span>Profilim</span>
                </NavLink>

                {/* Hasta Kayıt Linki */}
                <NavLink
                    to="/employee-dashboard/clients"
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                >
                    <FaUserPlus />
                    <span>Hasta Ekle</span>
                </NavLink>

                {/* Settings Linki */}
                <NavLink
                    to="/employee-dashboard/setting"
                    className={({ isActive }) => `${isActive ? "bg-teal-500 border-l-4 border-white" : "bg-transparent"} flex items-center space-x-4 text-lg py-4 px-5 rounded-xl hover:bg-teal-500 hover:text-white transition-all ease-in-out duration-300`}
                    end
                >
                    <FaCogs />
                    <span>Ayarlar</span>
                </NavLink>

            </div>
        </div>
    );
};

export default Sidebar;
