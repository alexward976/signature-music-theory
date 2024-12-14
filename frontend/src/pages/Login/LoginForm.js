import React, {useState} from "react";
import axios from "axios";
import "../../index.css"
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });
            localStorage.setItem("token", res.data.token);

            navigate("/");

        } catch (err) {
            console.error(err.response.data);
            setMessage("Incorrect email or password");
        }
    }

    return (
        <div className="mt-5 auth-form">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default LoginForm;