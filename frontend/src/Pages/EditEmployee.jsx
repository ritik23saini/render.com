import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialState = {
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        courses: [],
        image: "",
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {

        const employeeList = localStorage.getItem("employeeList")
            ? JSON.parse(localStorage.getItem("employeeList"))
            : [];

        const employee = employeeList.find((e) => e._id === id);
        if (employee) {
            console.log(employee)

            setForm(employee);
            setImagePreview(employee.image.url);
        } else {
            alert("Employee not found");
            navigate("/employeeList");
        }
    }, [id, navigate]);

    const validate = () => {
        const newErrors = {};

        if (!form.name) newErrors.name = "Name is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.mobile) newErrors.mobile = "Mobile is required";
        if (!form.designation) newErrors.designation = "Designation is required";
        if (!form.gender) newErrors.gender = "Gender is required";
        if (form.courses.length === 0) newErrors.courses = "At least one course is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (form.email && !emailRegex.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (form.mobile && !mobileRegex.test(form.mobile)) {
            newErrors.mobile = "Mobile must be 10 digits";
        }
        console.log(form)

        if (imagePreview) {
            if (!imagePreview.startsWith("data:image/jpeg") && !imagePreview.startsWith("data:image/png") && !imagePreview.startsWith("https")) {
                newErrors.image = "Only JPG or PNG images allowed";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                courses: checked
                    ? [...prev.courses, value]
                    : prev.courses.filter((c) => c !== value),
            }));
        } else if (type === "file") {

            const file = files[0];
            
            if (!file) return;
            if (file.size > 4 * 1024 * 1024) {
                setErrors((prev) => ({
                    ...prev,
                    image: "Image too large. Max 4MB allowed.",

                }));
                setImagePreview(null);
                return;

            }
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setForm((prev) => ({ ...prev, image: file }));
                setImagePreview(base64Image);
                setErrors((prev) => ({ ...prev, image: null }));
            };
            reader.readAsDataURL(file);
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("mobile", form.mobile);
        formData.append("designation", form.designation);
        formData.append("gender", form.gender);

        form.courses.forEach((course) => formData.append("courses", course));
        if (form.image) {
            formData.append("image", form.image);
        }


        try {
            console.log(form)
            setIsSubmitting(true);
            const res = await axios.post(
                ` ${import.meta.env.VITE_BASE_URL}/api/admin/editEmp/${id}`,
                formData,
                { withCredentials: true }
            );
            console.log(res)


            alert("Employee updated successfully!");
            navigate("/employeeList");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Submission failed"); 
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Edit Employee</h2>

                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <div>
                    <label>Mobile No:</label>
                    <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} />
                    {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
                </div>

                <div>
                    <label>Designation:</label>
                    <select name="designation" value={form.designation} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {errors.designation && <p style={{ color: "red" }}>{errors.designation}</p>}
                </div>

                <div>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="M"
                            onChange={handleChange}
                            checked={form.gender === "M"}
                        /> M
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            onChange={handleChange}
                            checked={form.gender === "F"}
                        /> F
                    </label>
                    {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
                </div>

                <div>
                    <label>Courses:</label>
                    {["MCA", "BCA", "BSC"].map((course) => (
                        <label key={course}>
                            <input
                                type="checkbox"
                                name="courses"
                                value={course}
                                onChange={handleChange}
                                checked={form.courses.includes(course)}
                            /> {course}
                        </label>
                    ))}
                    {errors.courses && <p style={{ color: "red" }}>{errors.courses}</p>}
                </div>

                <div>
                    <label>Upload Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleChange} />
                    {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
                    {imagePreview && (

                        <img
                            src={imagePreview}
                            alt="preview"
                            style={{ maxWidth: "150px", marginTop: "10px" }}
                        />
                    )}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </button>
            </form>
            <Link to="/employeeList">View Employee</Link>
        </>
    );
};

export default EditEmployee;
