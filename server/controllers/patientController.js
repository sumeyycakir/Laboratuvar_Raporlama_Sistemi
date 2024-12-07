import Patient from '../models/Patient.js';

const getPatients = async (_req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json({ success: true, patients });
  } catch (error) {
    console.error("Error fetching patients: ", error);
    return res.status(500).json({ success: false, message: 'Hastalar alınırken bir hata oluştu', error: error.message });
  }
};

const getPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById({ _id: id });
    if (!patient) {
      return res.status(404).json({ success: false, message: "Hasta bulunamadı" });
    }
    res.status(200).json({ success: true, patient });
  } catch (error) {
    console.error("Error fetching patient: ", error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
};

const addPatient = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const newPatient = new Patient({
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

    const savedPatient = await newPatient.save();
    return res.status(201).json({ success: true, patient: savedPatient });
  } catch (error) {
    console.error("Error adding patient: ", error);
    return res.status(500).json({ success: false, message: 'Hasta eklenirken bir hata oluştu', error: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      { _id: id },
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

    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: 'Hasta bulunamadı' });
    }

    return res.status(200).json({ success: true, patient: updatedPatient });
  } catch (error) {
    console.error("Error updating patient: ", error);
    return res.status(500).json({ success: false, message: 'Hasta güncellenirken bir hata oluştu', error: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Patient.findByIdAndDelete({ _id: id });

    if (!deletedPatient) {
      return res.status(404).json({ success: false, message: 'Hasta bulunamadı' });
    }

    return res.status(200).json({ success: true, message: 'Hasta başarıyla silindi' });
  } catch (error) {
    console.error("Error deleting patient: ", error);
    return res.status(500).json({ success: false, message: 'Hasta silinirken bir hata oluştu', error: error.message });
  }
};

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };
