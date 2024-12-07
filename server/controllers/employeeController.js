import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import Department from "../models/Department.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "public/uploads";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });
        await newEmployee.save();
        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error while adding employee" });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId", { password: 0 })
            .populate("department");
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error fetching employees" });
    }
};

const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee
         employee = await Employee.findById({_id: id})
            .populate("userId", { password: 0 })
            .populate("department");
        if (!employee) {
           employee = await Employee.findOne({userId: id})
           .populate("userId", { password: 0 })
           .populate("department");
        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error fetching employee" });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maritalStatus, designation, department, salary } = req.body;

        const employee = await Employee.findById({_id: id});
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        const user = await User.findById({_id: employee.userId})

        if(!user) {
            return res .status(404)
            .json({success: false, error: "user not found"})
        }


        const updatedUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})

        
        const updatedEmployee = await Employee.findByIdAndUpdate(
          {_id: id}, {
            maritalStatus,
            designation, salary, department
          }
        );

        if (!updatedEmployee || !updatedUser) {
            return res.status(404).json({ success: false, error: "Unable to update employee" });
        }

        return res.status(200).json({ success: true, message: "Employee updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Error updating employee" });
    }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee };
