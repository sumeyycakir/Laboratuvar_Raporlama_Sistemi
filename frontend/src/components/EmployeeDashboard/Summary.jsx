import React from 'react';
import { FaVials, FaCalendarCheck, FaCalendarTimes, FaThumbsUp, FaFileAlt, FaUsers } from 'react-icons/fa';

const SummaryCard = ({ icon, text, number, color, hoverEffect, transitionEffect }) => {
    return (
        <div
            className={`bg-white p-6 rounded-xl shadow-lg ${color} ${hoverEffect} ${transitionEffect} text-white flex items-center justify-between`}
        >
            <div className="flex items-center">
                <div className="mr-4">{icon}</div>
                <div>
                    <h4 className="text-xl font-semibold">{text}</h4>
                    <p className="text-lg">{number}</p>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <SummaryCard 
                    icon={<FaVials size={45} />} 
                    text="Testler" 
                    number={5} 
                    color="bg-gradient-to-r from-blue-500 to-blue-700"
                    hoverEffect="hover:scale-100 hover:rotate-1 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaCalendarCheck size={45} />} 
                    text="Randevular" 
                    number={50} 
                    color="bg-gradient-to-r from-indigo-500 to-indigo-700"
                    hoverEffect="hover:scale-100 hover:rotate-1 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-500"
                    transitionEffect="transition-all duration-300 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaCalendarTimes size={45} />} 
                    text="Bekleyen Randevular" 
                    number={2} 
                    color="bg-gradient-to-r from-gray-500 to-gray-700"
                    hoverEffect="hover:scale-100 hover:rotate-1 hover:bg-gray-600 hover:shadow-2xl hover:shadow-gray-500"
                    transitionEffect="transition-all duration-200 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaThumbsUp size={45} />} 
                    text="Onaylanan Randevular" 
                    number={8} 
                    color="bg-gradient-to-r from-green-500 to-green-700"
                    hoverEffect="hover:scale-100 hover:rotate-1 hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500"
                    transitionEffect="transition-all duration-200 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaFileAlt size={45} />} 
                    text="Tamamlanan Testler" 
                    number={23} 
                    color="bg-gradient-to-r from-pink-500 to-pink-700"
                    hoverEffect="hover:scale-100 hover:rotate-1 hover:bg-pink-600 hover:shadow-2xl hover:shadow-pink-500"
                    transitionEffect="transition-all duration-200 ease-in-out"
                />
                <SummaryCard 
                    icon={<FaUsers size={45} />} 
                    text="Kayıtlı Kullanıcılar" 
                    number={10} 
                    color="bg-gradient-to-r from-cyan-500 to-cyan-700"
                    hoverEffect="hover:scale-100 hover:rotate-1 hover:bg-cyan-600 hover:shadow-2xl hover:shadow-cyan-500"
                    transitionEffect="transition-all duration-200 ease-in-out"
                />
            </div>
        </div>
    );
};

export default Dashboard;
