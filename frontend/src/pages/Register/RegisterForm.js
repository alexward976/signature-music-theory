import React, { useState } from "react";
import axios from "axios";
import "../../index.css"
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const { name, email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/", {
                name,
                email,
                password
            });

            navigate("/login");
            
        } catch (err) {
            console.error(err.response.data);
            setMessage("User already exists");
        }
    }

    return (
        <div className="mt-5 auth-form">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
                <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                
                <button type="submit">Register</button>
            </form>
            <p className="message">{message}</p>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            
        </div>
    )
}

export default RegisterForm;