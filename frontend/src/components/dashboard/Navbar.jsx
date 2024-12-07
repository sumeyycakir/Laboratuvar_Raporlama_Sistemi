import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { FaBell, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState({ title: '', content: '' });
  const [notes, setNotes] = useState([]);

  // Bildirim açma/kapama
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Modal açma/kapama
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Not ekleme işlemi
  const addNote = () => {
    if (note.title && note.content) {
      setNotes([...notes, note]);
      setNote({ title: '', content: '' }); 
      toggleModal(); // Modal'ı kapat
    }
  };

  return (
    <div className="flex items-center justify-between h-16 bg-teal-800 px-6 text-white shadow-lg border-b-4 border-teal-600">
      
      {/* Kullanıcı adı */}
      <p className="text-xl font-bold tracking-wider text-white">Hoşgeldin, {user.name}</p>

      {/* Sağ taraf: Bildirim, Not Ekleme ve Çıkış Butonları */}
      <div className="flex items-center space-x-6">
        {/* Bildirim ikonu */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-110"
          >
            <FaBell size={24} />
          </button>

          {/* Bildirim Pop-Up */}
          {isNotificationOpen && (
            <div className="absolute top-12 right-0 bg-white p-4 shadow-lg rounded-lg w-64 text-teal-800">
              <p className="text-center text-sm text-gray-500">Bildirim Yok</p>
            </div>
          )}
        </div>

        {/* Not Ekleme Butonu */}
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-110"
        >
          <FaPlus size={24} />
        </button>

        {/* Çıkış butonu */}
        <button
          onClick={logout}
          className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-110"
        >
          Çıkış
        </button>
      </div>

      {/* Not Ekleme Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-black">
            <h3 className="text-2xl font-semibold text-teal-800 mb-4">Yeni Not Ekle</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Başlık"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="w-full p-2 border border-teal-300 rounded-lg mb-2 text-black"
              />
              <textarea
                placeholder="Not İçeriği"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                className="w-full p-2 border border-teal-300 rounded-lg text-black"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Kapat
              </button>
              <button
                onClick={addNote}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
