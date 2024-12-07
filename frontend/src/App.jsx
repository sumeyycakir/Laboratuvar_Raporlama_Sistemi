import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import Summary from './components/EmployeeDashboard/Summary';
import Setting from "./components/EmployeeDashboard/Setting";
import PatientList from "./components/patient/PatientList";
import AddPatient from "./components/patient/AddPatient";
import EditPatient from "./components/patient/EditPatient";
import ViewPatient from "./components/patient/ViewPatient";
import ClientList from "./components/client/ClientList";
import AddClient from "./components/client/AddClient";
import EditClient from "./components/client/EditClient";
import ViewClient from "./components/client/ViewClient";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="add-patient" element={<AddPatient />} />
          <Route path="patient/:id" element={<EditPatient />} />
          <Route path="patients/:id" element={<ViewPatient />} />
        </Route>

        {/* Employee Dashboard Routes */}
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<Summary />} />
          <Route path="profile/:id" element={<View />} />
          <Route path="setting" element={<Setting />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="add-client" element={<AddClient />} />
          <Route path="client/:id" element={<EditClient />} />
          <Route path="clients/:id" element={<ViewClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
