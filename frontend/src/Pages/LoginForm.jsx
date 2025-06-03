import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const UserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    if (UserInfo) {
      navigate("/dashboard");
    }
  }, [UserInfo, navigate]);

  const initialForm = {
    username:"",
    password:"",
  };

  const [form, setForm] = useState(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, form, {
        withCredentials: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setForm(initialForm);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">UserName:</label>
          <input
            id="username"
            type="text"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
            value={form.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            value={form.password}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
