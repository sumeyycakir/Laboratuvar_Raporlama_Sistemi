import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
    return (
        <div className={`flex items-center p-4 rounded-lg shadow-lg ${color} text-white`}>
            <div className="text-3xl mr-4">{icon}</div>
            <div>
                <h4 className="font-bold">{text}</h4>
                <p className="text-xl">{number}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
