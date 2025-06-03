import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/getAllEmp`);
        if (res.data) {
          console.log(res.data)
          setEmployees(res.data);
          localStorage.setItem("employeeList", JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    getEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();

    return (
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.mobile.toString().toLowerCase().includes(term) ||
      emp.designation.toLowerCase().includes(term) ||
      emp.gender.toLowerCase().includes(term) ||
      emp.courses.some(course => course.toLowerCase().includes(term)) ||
      new Date(emp.createdAt).toLocaleDateString().toLowerCase().includes(term)
    );
  });

  const sort = employees.sort((a, b) => (a.name.toLowerCase() - b.name.toLowerCase))
  console.log(sort)


  const navigate = useNavigate()

  const handleEdit = (id) => {
    if (id) {
      navigate(`/editEmp/${id}`)
    }

  }
  const handleDelete = async (id) => {
    console.log(id)
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/deleteEmp/${id}`);

      if (res.data) {

        const filteredEmployees = employees.filter((emp) => emp._id !== id);
        setEmployees(filteredEmployees);
        localStorage.setItem("employeeList", JSON.stringify(filteredEmployees));
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error deleting");
    }
  };

  const sortByEmail = () => {
    const sortedList = [...employees].sort((a, b) =>
      a.email.toLowerCase().localeCompare(b.email.toLowerCase())
    );
    setEmployees(sortedList);
  };

  const sortByName = () => {
    const sortedList = [...employees].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    console.log(sortedList);
    setEmployees(sortedList);
  };

  const sortbyDate = () => {

  }
  return (
    <div>
      <h2>Employee List</h2>
      <div>
        Total Count: {filteredEmployees.length} <br />
        <Link to="/createEmployee">Create Employee</Link>
      </div>

      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Search Keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}

        />
      </div>
      <div>
        <button onClick={() => sortByName()}>Sort by name (asc)</button>
        <button onClick={() => sortByEmail()}>Sort by Email (asc)</button>
        <button onClick={() => sortbyDate()}>Sort by Date (asc)</button>
      </div>

      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Pic</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No employees found.
              </td>
            </tr>
          ) : (
            filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.empId}</td>
                <td>{emp.image ?
                  <img src={emp.image.url} alt={emp.name} style={{ width: "50px", height: "50px", }} />
                  : "No Image"}
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>{emp.courses.join(", ")}</td>
                <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(emp._id)}>Edit</button>
                  <button onClick={() => handleDelete(emp._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>


    </div>
  );
};

export default EmployeeList;
