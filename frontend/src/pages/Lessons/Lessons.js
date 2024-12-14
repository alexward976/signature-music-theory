import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { Link } from "react-router-dom";
import LessonCard from "./LessonCard";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Lessons = () => {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState();

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
    }, [user, isLoggedIn])

    return (
        <div className="container">
            <Navigation />
        
            {isLoggedIn ? (
                <div className="container mt-4">
                    <h2>Lessons</h2>
                    <div className="row mt-5">
                        <LessonCard 
                            lessonName="Lesson 1: The Basics"
                            lessonDesc="Learn about the staff, clefs, and note names"
                            lessonAddress={"/lessons/lesson-1"}
                            isLessonComplete={user.isLesson1Complete}
                            isPrevLessonComplete={true}
                        />
                        <LessonCard 
                            lessonName="Lesson 2: Rhythm and Time Signatures"
                            lessonDesc="Learn to read note length, measures, and time signatures"
                            lessonAddress="/lessons/lesson-2"
                            isLessonComplete={user.isLesson2Complete}
                            isPrevLessonComplete={user.isLesson1Complete}
                        />
                    </div>
                    
                </div>
            ) : (
                <div>
                    <p>To access lessons and save your progress, please <Link to="/login">log in.</Link></p>
                </div>
            )}
        </div>
        
    )
}

export default Lessons;