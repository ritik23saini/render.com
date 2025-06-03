import Employee from "../model/employeemodel.js";
import { cloudinary, uploadtocloud } from "../utils/cloudinary.js";


export const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;

  try {
    if (!name || !email || !mobile || !designation || !gender || !courses) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const imageUrl = await uploadtocloud(req.file);

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      image: imageUrl,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee Created" });
  } catch (error) {
    console.log("Error in createEmployee:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


export const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.log("Error in getAllEmployee:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const editEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { name, email, mobile, designation, gender, courses } = req.body;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    let updatedImage = employee.image;

    if (req.file) {
      if (employee.image?.public_id) {

        await cloudinary.uploader.destroy(employee.image.public_id);
      }

      const { url, public_id } = await uploadtocloud(req.file);
      updatedImage = { url, public_id };
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        name: name || employee.name,
        email: email || employee.email,
        mobile: mobile || employee.mobile,
        designation: designation || employee.designation,
        gender: gender || employee.gender,
        courses: courses || employee.courses,
        image: updatedImage,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Employee updated", updatedEmployee });
  } catch (error) {
    console.error("Update Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


export const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.image?.public_id) {
      await cloudinary.uploader.destroy(employee.image.public_id);
    }

    await Employee.findByIdAndDelete(employeeId);

    return res.status(200).json({ message: "Employee deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

