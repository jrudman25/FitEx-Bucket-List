import React, { useState } from 'react';

const Questionnaire = () => {
    const [selectedAnswers, setSelectedAnswers] = useState(Array(4).fill(''));
    const questions = [
        {
            question: 'How would you rate your fitness level out of 10?',
            answerChoices: ['0-2', '3-5', '6-8', '9-10']
        },
        {
            question: 'How many days a week do you exercise?',
            answerChoices: ['0-1', '2-3', '4-5', '6-7']
        },
        {
            question: 'How often have you hiked in the past 3 months?',
            answerChoices: ['0', '1-2', '3-4', '5+']
        },
        {
            question: 'Do you have a car or other reliable transportation?',
            answerChoices: ['Yes', 'No']
        },
        {
            question: 'How far are you willing to travel from campus?',
            answerChoices: ['Only on campus', '0-10 minutes', '10-30 minutes', '30+ minutes']
        }
    ];

    const handleAnswerSelection = (event, questionIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = event.target.value;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleSurveySubmit = () => {
        console.log('Selected answers:', selectedAnswers);
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
                                            value={answer}
                                            checked={selectedAnswers[index] === answer}
                                            onChange={(event) => handleAnswerSelection(event, index)}
                                        />
                                        {answer}
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
