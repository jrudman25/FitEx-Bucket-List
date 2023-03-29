import React, { useState } from 'react';

const Questionnaire = () => {
    const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(-1));
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

    const handleAnswerSelection = (event, questionIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        const answerValue = parseInt(event.target.value);
        newSelectedAnswers[questionIndex] = answerValue;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleSurveySubmit = (event) => {
        event.preventDefault();
        const totalValue = selectedAnswers.reduce((total, answerValue) => total + answerValue, 0);
        console.log('Total value:', totalValue);
    };

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
                <button type="submit">Submit survey</button>
            </form>
        </div>

    );
};

export default Questionnaire;