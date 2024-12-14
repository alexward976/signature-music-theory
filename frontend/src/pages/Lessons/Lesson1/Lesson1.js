import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import emptyStaff from "../../../assets/images/empty-staff.png";
import trebleClefGLabeled from "../../../assets/images/treble-clef-g-labeled.png";
import trebleClefAllNotesLabeled from "../../../assets/images/treble-clef-all-notes-labeled.png";
import ledgerLinesTrebleClef from "../../../assets/images/ledger-lines-treble-clef.png";
import bassClefAllNotesLabeled from "../../../assets/images/bass-clef-all-notes-labeled.png";
import lesson1Question1 from "../../../assets/images/lesson-1-question-1.png";
import lesson1Question2 from "../../../assets/images/lesson-1-question-2.png";
import lesson1Question3 from "../../../assets/images/lesson-1-question-3.png";
import lesson1Question4 from "../../../assets/images/lesson-1-question-4.png";

const Lesson1 = () => {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);



    const answerOptions = [
        [
            { answerText: "C", isCorrect: true },
            { answerText: "D", isCorrect: false },
            { answerText: "B", isCorrect: false },
            { answerText: "G", isCorrect: false },
        ],
        [
            { answerText: "C", isCorrect: false },
            { answerText: "F", isCorrect: false },
            { answerText: "G", isCorrect: false },
            { answerText: "E", isCorrect: true },
        ],
        [
            { answerText: "D", isCorrect: false },
            { answerText: "G", isCorrect: true },
            { answerText: "F", isCorrect: false },
            { answerText: "B", isCorrect: false },
        ],
        [
            { answerText: "A", isCorrect: false },
            { answerText: "F", isCorrect: false },
            { answerText: "C", isCorrect: true },
            { answerText: "E", isCorrect: false },
        ]
    ]

    const imageOptions = [lesson1Question1, lesson1Question2, lesson1Question3, lesson1Question4];


    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            const decoded = jwtDecode(localStorage.getItem("token"));

            axios.get(`http://localhost:5000/api/auth/${decoded.user.id}`)
                .then(response => setUser(response.data.data))
                .catch(error => console.error("Error fetching user data: ", error));
        } else {
            setIsLoggedIn(false);
        }

        if(score >= 3) {
            setIsLessonComplete(true)
        }
    }, [isLoggedIn, user, score, isLessonComplete]);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < answerOptions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    }


    const onLessonComplete = () => {
        try {
            axios.put(`http://localhost:5000/api/auth/${user._id}`, {
                "isLesson1Complete": true
            });

            navigate("/lessons");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <Navigation />

            {isLoggedIn ? (
                <div className="container">
                    <h1 className="mt-4">Lesson 1: The Basics</h1>

                    <h2 className="mt-4">Introduction</h2>

                    <p>
                        What does music mean to you? Perhaps you have a favorite song, album, or artist. Maybe you have many playlists
                        full of music that you love. For many people, music is a fundamental part of their lives, and that probably includes
                        you! But what about the fundamentals of music? How do the building blocks all come together to create the sounds we
                        love? There are so many genres and kinds of music that we listen to, but they all rely on the basics. The aim of this
                        short course is to change the way you hear music and increase your understanding of its fundamentals.
                    </p>

                    <h2 className="mt-4">Staff and Clefs</h2>

                    <img className="mt-4 w-50" src={emptyStaff} alt="An empty music staff." />

                    <p>
                        This is the <strong>staff.</strong> It's where music notes live, and it makes up the <strong>sheet music</strong>
                        (written down music) for most instruments. At first glance, it doesn't look like much. These five lines and the spaces
                        between them represent notes, but how are you supposed to know which ones? That's where clefs come in.
                    </p>

                    <p>
                        <strong>Clefs</strong> are used for marking the staff, and they tell us which lines and spaces should represent which notes. There are two
                        main clefs we will focus on: the <strong>Treble Clef</strong> and the <strong>Bass Clef.</strong> There are others, but these two comprise the fundamentals of
                        music theory.
                    </p>

                    <img className="mt-4" src={trebleClefGLabeled} alt="A G note labeled on the treble clef staff." />

                    <p>
                        The <strong>Treble Clef</strong>Treble Clef (also called the G Clef) is perhaps the most used clef and is typically associated with higher pitched
                        notes. When the Treble Clef is applied to the staff, it wraps around the second line from the bottom, and this line
                        represents the note G (hence the name G Clef!).
                    </p>

                    <img className="mt-4" src={trebleClefAllNotesLabeled} alt="All notes labeled on the treble clef staff." />

                    <p>
                        From there, we know the rest of the lines and spaces. (Remember, the musical alphabet of notes consists of A, B, C, D, E,
                        F, and G. After G, it goes back to A again.)
                    </p>

                    <img className="mt-4" src={ledgerLinesTrebleClef} alt="A treble clef staff with labeled notes above and below the staff." />

                    <p>
                        But the notes aren't just confined to the staff, they can keep going above and below it as well. The lines of the staff 
                        are added to the notes themselves and are called ledger lines. Technically, ledger lines can go on and on until the point 
                        where the notes are too high or low to be heard. Take note of the C in red; we call that Middle C. It has that name because 
                        it is right in the middle of the treble clef staff and bass clef staff. 
                    </p>
                    
                    <img className="mt-4" src={bassClefAllNotesLabeled} alt="All notes labeled on the bass clef staff." />

                    <p>
                        The Bass Clef (also called the F Clef) is associated with the lower pitched notes. The clef has a big dot at the end of it, 
                        and this rests on the F note line. Just like before, we can figure out the rest of the notes from there.
                    </p>

                    <div className="container w-50 bg-info-subtle p-5 rounded">
                        <h3>Helpful Tips</h3>

                        <p>
                            You might be wondering, how am I supposed to remember all of these lines and spaces, and which notes they represent? Well, 
                            it is kind of daunting at first. But here are a couple of pneumonic devices to help you:
                        </p>

                        <ul>
                            <li>
                                For the spaces on the treble clef, just think of the word FACE. Going from bottom to top, the notes of these spaces 
                                are F, A, C, E.
                            </li>
                            <li>
                                And for the bass clef spaces, remember the phrase “All Cows Eat Grass.” This works the same way, since the notes of 
                                these spaces are A, C, E, G, going from bottom to top.
                            </li>
                        </ul>
                    </div>

                    

                    <div>
                        <h2>Lesson 1 Quiz</h2>

                        <p><em>Get 3 or more questions right to complete this lesson.</em></p>

                        {showScore ? (
                            <div className='score-section'>
                                You scored {score} out of {answerOptions.length}
                            </div>
                        ) : (
                            <>
                                <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question {currentQuestion + 1}</span>/{answerOptions.length}
                                    </div>
                                    <div className='question-text'>What note is this?</div>
                                    <img src={imageOptions[currentQuestion]} alt="a note on either the treble or bass staff" />
                                </div>
                                <div className='answer-section'>
                                    {answerOptions[currentQuestion].map((answerOption) => (
                                        <button className="btn btn-secondary px-4 me-3" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                                    ))}
                                </div>
                            </>
                        )}
                        
                    </div>
                    
                    <button type="button" className="btn btn-primary my-5" disabled={!isLessonComplete} onClick={onLessonComplete}>Complete Lesson</button>
                    
                </div>
            ) : (
                <div>
                    <p>To access lesson content, please <Link to="/login">log in.</Link></p>
                </div>
            )}
        </div>
    )
}

export default Lesson1;