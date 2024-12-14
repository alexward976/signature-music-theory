import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {

    const [isLoggedIn, setIsLoggedIn] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }

    const onClickRegister = () => {
        navigate("/register");
    }

    const onClickLogin = () => {
        navigate("/login");
    }
    

    return (
        <nav className="navbar navbar-expand-lg bg-primary-subtle p-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Signature Music Theory</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/lessons">Lessons</Link></li>
                    </ul>

                    {isLoggedIn ? (
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to="/account">My Account</Link></li>
                            <li className="nav-item" onClick={handleLogout}><button className="btn btn-outline-secondary me-2" type="button">Logout</button></li>
                        </ul>
                        
                    ) : (
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item"><button className="btn btn-outline-success me-2" type="button" onClick={onClickRegister}>Register</button></li>
                            <li className="nav-item"><button className="btn btn-outline-secondary me-2" type="button" onClick={onClickLogin}>Login</button></li>
                        </ul>
                    )}
                </div>
                
            </div>                
        </nav>
    )
}

export default Navigation;