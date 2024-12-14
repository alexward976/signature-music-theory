import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProgressBar from "./ProgressBar";

const Account = () => {
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [user, setUser] = useState({});
    const [lessonProgress, setLessonProgress] = useState();
    
    const navigate = useNavigate();

    

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setIsLoggedIn(true);
            const decoded = jwtDecode(localStorage.getItem("token"));

            axios.get(`http://localhost:5000/api/auth/${decoded.user.id}`)
                .then(response => setUser(response.data.data))
                .catch(error => console.error("Error fetching user data: ", error));
        } else {
            setIsLoggedIn(false);
        }

        if(!user.isLesson1Complete) {
            setLessonProgress(0);
        } else if(user.isLesson1Complete) {
            setLessonProgress(50);
            if(user.isLesson2Complete) {
                setLessonProgress(100);
            }
        }
    }, [isLoggedIn, user, lessonProgress])

    const onReset = async () => {
        const confirmBox = window.confirm("Do you really want to reset your account progress? This cannot be undone.");

        if (confirmBox) {
            try {
            
                await axios.put(`http://localhost:5000/api/auth/${user._id}`, {
                    "isLesson1Complete": false,
                    "isLesson2Complete": false
                })            
    
                setMessage("Your account has been reset.");
            } catch (err) {
                console.error(err.response.data);
                setMessage("There was an error resetting your account, please try again.")
            }
        }        
    }

    const onDelete = async () => {
        const confirmBox = window.confirm("Do you really want to delete your account? This cannot be undone.");

        if(confirmBox) {
            try {
            
                await axios.delete(`http://localhost:5000/api/auth/${user._id}`);        
    
                localStorage.removeItem("token");
                navigate("/");
    
            } catch (err) {
                console.error(err.response.data);
                setMessage("There was an error deleting your account, please try again.")
            }
        }
    }

    return (
        <div className="container">
            <Navigation />
            {isLoggedIn ? (
                <div className="container">
                    <div>
                        <p>{message}</p>
                    </div>
                    <h1>My Account</h1>
                    <div className="mt-5 p-4 border rounded">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                    <div className="bg-info-subtle text-dark mt-5 p-4 rounded">
                        <h2>Lesson Progress</h2>
                        <ProgressBar bgcolor={"#3bb143"} progress={lessonProgress} height={30} />
                    </div>
                    <div className="mt-5 p-4 border rounded">
                        <h2>Reset or delete your account</h2>
                        <button className="d-block mt-4 btn btn-warning" onClick={onReset}>Reset my progress</button>
                        <button className="d-block mt-4 btn btn-danger" onClick={onDelete}>Delete my account</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>To access your account, please <Link to="/login">log in.</Link></p>
                </div>
            )}
        </div>
    )
}

export default Account;