import Client from '../models/Client.js';

const getClients = async (_req, res) => {
  try {
    const clients = await Client.find();
    return res.status(200).json({ success: true, clients });
  } catch (error) {
    console.error("Error fetching clients: ", error);
    return res.status(500).json({ success: false, message: "hastalar alınırken bir hata oluştu", error: error.message });
  }
};

const getClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: "hasta bulunamadı" });
    }
    return res.status(200).json({ success: true, client });
  } catch (error) {
    console.error("Error fetching client: ", error);
    return res.status(500).json({ success: false, message: "Sunucu hatası", error: error.message });
  }
};

const addClient = async (req, res) => {
  const { firstName, lastName, age, gender, dateOfBirth, contactNumber, tcNumber, testResults, assignedStaff, reportStatus, file } = req.body;

  try {
    const newClient = new Client({
      firstName,
      lastName,
      age,
      gender,
      dateOfBirth,
      contactNumber,
      tcNumber,  
      testResults,  
      assignedStaff,  
      reportStatus, 
      file, 
    });

    const savedClient = await newClient.save();
    return res.status(201).json({ success: true, client: savedClient });
  } catch (error) {
    console.error("Error adding client: ", error);
    return res.status(500).json({ success: false, message: 'hasta eklenirken bir hata oluştu', error: error.message });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, gender, dateOfBirth, contactNumber, tcNumber, testResults, assignedStaff, reportStatus, file } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id, 
      {
        firstName,
        lastName,
        age,
        gender,
        dateOfBirth,
        contactNumber,
        tcNumber, 
        testResults, 
        assignedStaff, 
        reportStatus,  
        file,
      }, 
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ success: false, message: 'Hasta bulunamadı' });
    }

    return res.status(200).json({ success: true, client: updatedClient });
  } catch (error) {
    console.error("Error updating client: ", error);
    return res.status(500).json({ success: false, message: 'Hasta güncellenirken bir hata oluştu', error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ success: false, message: 'Hasta bulunamadı' });
    }

    return res.status(200).json({ success: true, message: 'Hasta başarıyla silindi' });
  } catch (error) {
    console.error("Error deleting client: ", error);
    return res.status(500).json({ success: false, message: 'Hasta silinirken bir hata oluştu', error: error.message });
  }
};

export { addClient, getClients, getClient, updateClient, deleteClient };
