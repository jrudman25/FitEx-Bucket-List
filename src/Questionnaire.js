import React, {useEffect, useState, forwardRef } from 'react';
import { Button, Snackbar } from '@mui/material';
import BucketListGlobal from "./BucketListGlobal";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./backend/FirebaseConfig";
import {doc, getDoc, updateDoc } from "firebase/firestore";
import { Navigate, useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const Questionnaire = () => {

    const [selectedAnswers, setSelectedAnswers] = useState(Array(4).fill(''));
    const [user, setUser] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const navigate = useNavigate();
    const questions = [
        {
            question: 'How would you rate your fitness level out of 10?',
            answerChoices: [
                { value: 0, label: '0-2' },
                { value: 1, label: '3-5' },
                { value: 2, label: '6-8' },
                { value: 3, label: '9-10' }
            ]
        },
        {
            question: 'How many days a week do you exercise?',
            answerChoices: [
                { value: 0, label: '0-1' },
                { value: 1, label: '2-3' },
                { value: 2, label: '4-5' },
                { value: 3, label: '6-7' }
            ]
        },
        {
            question: 'How often have you hiked in the past 3 months?',
            answerChoices: [
                { value: 0, label: '0' },
                { value: 1, label: '1-2' },
                { value: 2, label: '3-4' },
                { value: 3, label: '5+' }
            ]
        },
        {
            question: 'Do you have a car or transportation?',
            answerChoices: [
                { value: 1, label: 'Yes' },
                { value: 0, label: 'No' }
            ]
        },
        {
            question: 'How long are you willing to travel from campus?',
            answerChoices: [
                { value: 0, label: 'Only on campus' },
                { value: 1, label: '0-10 minutes' },
                { value: 2, label: '10-30 minutes' },
                { value: 3, label: '30+ minutes' }
            ]
        }
    ];

    useEffect(() => {
        (async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUser(auth.currentUser);
                    let userRef = doc(db, 'users', user.email);
                    const userData = await getDoc(userRef);
                    setSurveyCompleted(userData.data().surveyCompleted || false);
                }
            });
        })();

        return () => {};
    }, []);

    const Alert = forwardRef((props, ref) => {
        return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
    });

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleAnswerSelection = (event, questionIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        const answerValue = parseInt(event.target.value);
        newSelectedAnswers[questionIndex] = answerValue;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleSurveySubmit = async (event) => {
        event.preventDefault();
        if (selectedAnswers.some(answer => answer === '')) {
            showSnackbar("Please answer all of the questions!");
            return;
        }
        const totalValue = selectedAnswers.reduce((total, answerValue) => total + answerValue, 0);
        console.log('Total value:', totalValue);

        let personalBucketlist = createPersonalBucketlist(totalValue);
        console.log(personalBucketlist);

        let userRef = doc(db, 'users', user.email);
        await updateDoc(userRef, {bucketlist : personalBucketlist, surveyCompleted: true}).then(() => {
            console.log("created the personal bucketlist and put it in firebase!");
            navigate('/home');
        }).catch((error) => {
            console.log("something went wrong...");
        })

    };

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const createPersonalBucketlist = (value) => {
        let personalBucketlist = [];
        const easyHikes = BucketListGlobal.filter(hike => hike.difficulty === 'EASY');
        const moderateHikes = BucketListGlobal.filter(hike => hike.difficulty === 'MODERATE');
        const hardHikes = BucketListGlobal.filter(hike => hike.difficulty === 'HARD');

        if (value < 5) {
            let easyHikeIndices = [];
            while (easyHikeIndices.length <= 3) {
                let randNum = randomIntFromInterval(0, easyHikes.length - 1);
                if (!easyHikeIndices.includes(randNum)) {
                    easyHikeIndices.push(randNum)
                }
            }

            let moderateHikeIndices = [];
            while (moderateHikeIndices.length <= 2) {
                let randNum = randomIntFromInterval(0, moderateHikes.length - 1);
                if (!moderateHikeIndices.includes(randNum)) {
                    moderateHikeIndices.push(randNum);
                }
            }

            for (let i = 0; i < 5; i++) {
                if (i < 3) {
                    personalBucketlist.push(easyHikes[easyHikeIndices[i]]);
                }
                else {
                    personalBucketlist.push(moderateHikes[moderateHikeIndices[i - 3]]);
                }
            }
        }
        else if (value < 10 && value > 4) {
            let easyHikeIndices = [];
            easyHikeIndices.push(randomIntFromInterval(0, easyHikes.length - 1));

            let moderateHikeIndices = [];
            while (moderateHikeIndices.length <= 3) {
                let randNum = randomIntFromInterval(0, moderateHikes.length - 1);
                if (!moderateHikeIndices.includes(randNum)) {
                    moderateHikeIndices.push(randNum);
                }
            }

            let hardHikeIndices = [];
            hardHikeIndices.push(randomIntFromInterval(0, hardHikes.length - 1));

            for (let i = 0; i < 5; i++) {
                if (i === 0) {
                    personalBucketlist.push(easyHikes[easyHikeIndices[i]]);
                }
                else if (i > 0 && i < 4) {
                    personalBucketlist.push(moderateHikes[moderateHikeIndices[i - 1]]);
                }
                else {
                    personalBucketlist.push(hardHikes[hardHikeIndices[i - 4]]);
                }
            }
        }
        else {
            let moderateHikeIndices = [];
            while (moderateHikeIndices.length <= 2) {
                let randNum = randomIntFromInterval(0, moderateHikes.length - 1);
                if (!moderateHikeIndices.includes(randNum)) {
                    moderateHikeIndices.push(randNum);
                }
            }

            let hardHikeIndices = [];
            while (hardHikeIndices.length <= 3) {
                let randNum = randomIntFromInterval(0, hardHikes.length - 1);
                if (!hardHikeIndices.includes(randNum)) {
                    hardHikeIndices.push(randNum);
                }
            }

            for (let i = 0; i < 5; i++) {
                if (i < 2) {
                    personalBucketlist.push(moderateHikes[moderateHikeIndices[i]]);
                }
                else {
                    personalBucketlist.push(hardHikes[hardHikeIndices[i - 2]]);
                }
            }
        }
        return personalBucketlist;
    }

    if (!(sessionStorage.getItem('isLoggedIn') === 'true')) {
        return <Navigate to="/" />;
    }
    else if(surveyCompleted) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="survey-container">
            <h2>Survey</h2>
            <form onSubmit={handleSurveySubmit}>
                {questions.map((question, index) => (
                    <div key={index} className="survey-question">
                        <h3>{question.question}</h3>
                        <ul>
                            {question.answerChoices.map((answer, answerIndex) => (
                                <li key={answerIndex}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={answer.value}
                                            checked={selectedAnswers[index] === answer.value}
                                            onChange={(event) => handleAnswerSelection(event, index)}
                                        />
                                        {answer.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <Button type="submit" variant="contained" sx={{ marginTop: '1rem', marginBottom: '1rem' }}>Submit survey</Button>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={4500} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="warning">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Questionnaire;
