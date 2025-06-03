import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Dashboard from './Pages/Dashboard';
import EmployeeList from './Pages/EmployeeList';
import ProtectedRoute from './component/ProtectedRoute';
import EmployeeForm from './Pages/EmployeeForm';
import EditEmployee from './Pages/EditEmployee';
import LoginForm from './Pages/LoginForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm/>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/employeeList",
        element: <EmployeeList />,
      },
      {
        path: "/createEmployee",
        element: <EmployeeForm />,
      },
      {
        path: "/editEmp/:id",
        element: <EditEmployee />,
      }
    ],
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
