import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import wholeNote from "../../../assets/images/whole-note.png";
import halfNote from "../../../assets/images/half-note.png";
import quarterNote from "../../../assets/images/quarter-note.png";
import eighthNote from "../../../assets/images/eighth-note.png";
import sixteenthNote from "../../../assets/images/sixteenth-note.png";
import allNoteLengths from "../../../assets/images/all-note-lengths.png";
import measure from "../../../assets/images/measure.png";
import timeSignatures from "../../../assets/images/time-signatures.png";



const Lesson2 = () => {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const [isPrevLessonComplete, setIsPrevLessonComplete] = useState();
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const answerOptions = [
        [
            { answerText: "Quarter", isCorrect: false },
            { answerText: "Half", isCorrect: false },
            { answerText: "Eighth", isCorrect: false },
            { answerText: "Whole", isCorrect: true },
            { answerText: "Sixteenth", isCorrect: false }
        ],
        [
            { answerText: "Whole", isCorrect: false },
            { answerText: "Sixteenth", isCorrect: false },
            { answerText: "Quarter", isCorrect: true },
            { answerText: "Half", isCorrect: false },
            { answerText: "Eighth", isCorrect: false }
        ],
        [
            { answerText: "Quarter", isCorrect: false },
            { answerText: "Half", isCorrect: false },
            { answerText: "Eighth", isCorrect: false },
            { answerText: "Whole", isCorrect: false },
            { answerText: "Sixteenth", isCorrect: true }
        ],
        [
            { answerText: "Whole", isCorrect: false },
            { answerText: "Sixteenth", isCorrect: false },
            { answerText: "Quarter", isCorrect: false },
            { answerText: "Half", isCorrect: true },
            { answerText: "Eighth", isCorrect: false }
        ], 
        [
            { answerText: "Quarter", isCorrect: false },
            { answerText: "Half", isCorrect: false },
            { answerText: "Eighth", isCorrect: true },
            { answerText: "Whole", isCorrect: false },
            { answerText: "Sixteenth", isCorrect: false }
        ]
    ]

    const imageOptions = [wholeNote, quarterNote, sixteenthNote, halfNote, eighthNote];

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
            const decoded = jwtDecode(localStorage.getItem("token"));

            axios.get(`http://localhost:5000/api/auth/${decoded.user.id}`)
                .then(response => setUser(response.data.data))
                .catch(error => console.error("Error fetching user data: ", error));

            setIsPrevLessonComplete(user.isLesson1Complete);
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
                "isLesson2Complete": true
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
                <div>
                {isPrevLessonComplete ? (
                    <div className="container">
                        <h1 className="mt-5">Lesson 2: Rhythm and Time Signatures</h1>

                        <h2 className="mt-5">Introduction</h2>

                        <p>
                            You've already learned about pitch, one very important attribute of music notes. Next, we'll learn about another: duration. Note duration 
                            or length is what creates rhythm in music. From that pulsing in the bass that drives a great rock song to the long held-out notes of an 
                            opera piece, rhythm makes music interesting.
                        </p>

                        <h2 className="mt-5">Note Length</h2>

                        <p>
                            Just like the staff is a symbol that represents a note's pitch, there are symbols used to show how long a note is. Let's start with the 
                            whole note.
                        </p>

                        <img className="mt-5" src={wholeNote} alt="A whole note." />

                        <p>
                            This is the whole note, and it's usually considered the longest note in music. All note lengths are derived from this note.
                        </p>

                        <img className="mt-5" src={halfNote} alt="A half note." />

                        <p>
                            This is the half note, and it is, you guessed it, half the length of a whole note. It looks similar to a whole note with a stem.
                        </p>

                        <img className="mt-5" src={quarterNote} alt="A quarter note." />

                        <p>
                            This is a quarter note: half the length of a half note, and of course, a quarter of a whole note. It looks like a half note, but filled in.
                        </p>

                        <img className="mt-5" src={eighthNote} alt="An eighth note." />

                        <p>
                            This is the eighth note, and the pattern holds true: it's one-eighth of a whole note. It looks like a quarter note with one flag added.
                        </p>

                        <img className="mt-5" src={sixteenthNote} alt="A sixteenth note." />

                        <p>
                            Last one: this is the sixteenth note. It looks like an eighth note with an added flag. Another flag would make a thirty-second note, 
                            and so on, but these note lengths are rarely used in everyday music.
                        </p>

                        <h2>Measures and Time Signatures</h2>

                        <img className="mt-5" src={allNoteLengths} alt="A musical staff with one whole note, two half notes, four quarter notes, eight eighth notes, and sixteen sixteenth notes." />

                        <p>
                            Here we can see each kind of note length and how many of each are equivalent to a whole note. Notice that eighth and sixteenth notes are 
                            grouped together with either one or two bars respectively. There are some other new additions to the staff you might have noticed. First, 
                            there are now a few vertical lines separating it into sections, and second, there is what seems to be a fraction by the treble clef.
                        </p>

                        <img className="mt-5" src={measure} alt="Two blank measures of music." />

                        <p>
                            Let's start with those vertical bars. These indicate the end of a measure, which contains one or more beats. But how many 
                            beats are in a measure? That's where that fraction from earlier comes in.
                        </p>

                        <img className="mt-5" src={timeSignatures} alt="Two measures of music: one with a four-four time signature, and the other with a three-four time signature." />

                        <p>
                            Time signatures tell us exactly how many beats are in a measure. For example, a 4/4 (read “four-four”) time signature tells 
                            us that there are 4 quarter note beats in the measure. The top number is how many beats, and the bottom number is what kind 
                            of beat or note length (2 is half, 4 is quarter, and so on). You'll find that most music is written in 4/4 time, which is 
                            why it's given the name “common time.” Next time you listen to a song, try to notice the pattern of 4 beats, most easily 
                            heard in the drumbeat. Another slightly less common time signature is 3/4, which is what the waltz uses. Again, this means 
                            that there are 3 quarter note beats in each measure.
                        </p>

                        <img className="mt-5" src={allNoteLengths} alt="A musical staff with one whole note, two half notes, four quarter notes, eight eighth notes, and sixteen sixteenth notes." />

                        <p>
                            Let's look back at these measures, now that we know what's going on. Since one whole note is the same length as four quarter 
                            notes, its duration is exactly one measure. The same goes for half notes, and so on. As you can see, musicians need to be 
                            excellent at counting! Although they're just counting to four then starting over again.
                        </p>

                        <div className="mt-5">
                            <h2>Lesson 2 Quiz</h2>

                            <p><em>Get 4 or more questions right to complete this lesson.</em></p>

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
                                        <img src={imageOptions[currentQuestion]} alt="either a whole, half, quarter, eighth, or sixteenth note" />
                                    </div>
                                    <div className='answer-section'>
                                        {answerOptions[currentQuestion].map((answerOption) => (
                                            <button type="button" className="btn btn-secondary px-4 me-3" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                                        ))}
                                    </div>
                                </>
                            )}
                        
                        </div>

                        <button type="button" className="btn btn-primary my-5" disabled={!isLessonComplete} onClick={onLessonComplete}>Complete Lesson</button>
                        
                    </div>
                ) : (
                    <div>
                        <p>Please complete <Link to="/lessons/lesson-1">Lesson 1</Link> first.</p>
                    </div>

                )

                }
                

                </div>
            ) : (
                <div>
                    <p>To access lesson content, please <Link to="/login">log in.</Link></p>
                </div>
                
            )}
        </div>
    )
}

export default Lesson2;