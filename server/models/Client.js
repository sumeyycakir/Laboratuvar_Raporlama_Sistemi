import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Erkek', 'Kadın', 'Diğer'], required: true },
    dateOfBirth: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    tcNumber: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[1-9]{1}[0-9]{10}$/, 
        validate: { validator: function(v) {
            return /^[1-9]{1}[0-9]{10}$/.test(v);
        },
            message: props => `${props.value} geçerli bir TC kimlik numarası değil!`
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    testResults: [{ testName: String, result: String, date: Date }],
    assignedStaff: { type: String },
    reportStatus: { type: String, enum: ['Beklemede', 'Tamamlandı', 'Devam ediyor'], default: 'Beklemede' },
    file: { type: String } 
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
