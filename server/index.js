import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import patientRouter from './routes/patient.js'
import clientRouter from './routes/client.js'
import settingRouter from './routes/setting.js'
import connectToDatabase from './db/db.js'

connectToDatabase();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/setting', settingRouter);
app.use('/api/patient', patientRouter);
app.use('/api/client', clientRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});
