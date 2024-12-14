import React from "react";
import { Link } from "react-router-dom";

const LessonCard = ({ lessonName, lessonDesc, lessonAddress, isLessonComplete, isPrevLessonComplete }) => {

    return (
        <div className="card col-sm">
            <div className="card-body">
                <h3 className="card-title">{lessonName}</h3>

                <p className="card-text">{lessonDesc}</p>

                {isLessonComplete ? (
                    <Link className="btn btn-primary" to={lessonAddress} >Redo lesson</Link>
                ) : (isPrevLessonComplete ? (
                        <Link className="btn btn-primary" to={lessonAddress} >Go to lesson</Link>
                    ) : (
                        <p className="card-text"><em>Complete the previous lessons</em></p>
                ))}
            </div>
            
        </div>
    )
}

export default LessonCard;