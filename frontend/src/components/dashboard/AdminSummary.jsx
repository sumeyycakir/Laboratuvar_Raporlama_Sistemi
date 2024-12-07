import React from 'react';
import SummaryCard from './SummaryCard';
import { FaVials, FaCalendarCheck, FaCalendarTimes, FaThumbsUp, FaFileAlt, FaUsers } from 'react-icons/fa';

const AdminSummary = () => {
    return (
        <div className='p-8'>
            {/* Laboratuvar Yönetim Paneli Başlığı */}
            <h3 className='text-3xl font-bold text-gray-800 mb-10 tracking-tight'>
                Laboratuvar Yönetim Paneli
            </h3>

            {/* Kartlar */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
                <SummaryCard 
                    icon={<FaVials size={45} className="transform transition-all duration-300 hover:rotate-12 hover:scale-110" />} 
                    text="Testler" 
                    number={5} 
                    color="bg-gradient-to-r from-blue-500 to-blue-700"
                    hoverEffect="hover:scale-110 hover:shadow-2xl hover:shadow-blue-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaCalendarCheck size={45} className="transform transition-all duration-300 hover:rotate-12 hover:scale-110" />} 
                    text="Randevular" 
                    number={50} 
                    color="bg-gradient-to-r from-indigo-500 to-indigo-700"
                    hoverEffect="hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaCalendarTimes size={45} className="transform transition-all duration-300 hover:rotate-12 hover:scale-110" />} 
                    text="Bekleyen Randevular" 
                    number={2} 
                    color="bg-gradient-to-r from-gray-500 to-gray-700"
                    hoverEffect="hover:scale-110 hover:shadow-2xl hover:shadow-gray-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaThumbsUp size={45} className="transform transition-all duration-300 hover:rotate-12 hover:scale-110" />} 
                    text="Onaylanan Randevular" 
                    number={8} 
                    color="bg-gradient-to-r from-green-500 to-green-700"
                    hoverEffect="hover:scale-110 hover:shadow-2xl hover:shadow-green-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaFileAlt size={45} className="transform transition-all duration-300 hover:rotate-12 hover:scale-110" />} 
                    text="Tamamlanan Testler" 
                    number={23} 
                    color="bg-gradient-to-r from-pink-500 to-pink-700"
                    hoverEffect="hover:scale-110 hover:shadow-2xl hover:shadow-pink-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaUsers size={45} className="transform transition-all duration-300 hover:rotate-12 hover:scale-110" />} 
                    text="Kayıtlı Kullanıcılar" 
                    number={10} 
                    color="bg-gradient-to-r from-cyan-500 to-cyan-700"
                    hoverEffect="hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
            </div>
        </div>
    );
};

export default AdminSummary;
