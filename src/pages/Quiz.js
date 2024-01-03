import styles from '../index.css';
import { User } from '../model/Model.js';
import React, { useState, useEffect, useRef } from 'react';
import { quiz } from './data.js';
import icon from './images/icon.png';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showEncouragement, setShowEncouragement] = useState(false);
    const timerId = useRef(null);

    const [user, setUser] = useState(new User());
    const { questions } = quiz;
    const { question, answers } = questions[activeQuestion];

  
    // Show encouragement message for 3 seconds
    useEffect(() => {
        if (showEncouragement) {
            //Creating a timeout
            timerId.current = setTimeout(() => {
                setShowEncouragement(false);
            }, 2000);
        } 
        return () => {
            //Clearing a timeout
            clearTimeout(timerId.current);
        };
    }, [showEncouragement]);
    
    //   Select and check answer
    const onAnswerSelected = (idx, answerIdx) => {
        setSelectedAnswerIndex(answerIdx);
        setUser((prevUser) => {
            prevUser.addAnswer(idx, answerIdx);
            return prevUser;
        });
    };

    // Calculate score and increment to next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(user.getAnswer(activeQuestion + 1));
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
            setUser((prevUser) => {
                prevUser.nextQuestion();
                return prevUser;
            });
        } else {
            setActiveQuestion(0);
            setShowResult(true);
        }
    };

    const previousQuestion = () => {
        setSelectedAnswerIndex(user.getAnswer(activeQuestion - 1));
        if (activeQuestion !== 0) {
            setActiveQuestion((prev) => prev - 1);
            setUser((prevUser) => {
                prevUser.previousQuestion();
                return prevUser;
            });
        }
    };

    const navigate = useNavigate();
        const handleHomeButtonClick = () => {
            navigate('/intro');
        };
        const handleResultsButtonClick = () => {
            navigate('/results');
        };

    const handlePreviousButtonClick = () => {
        previousQuestion();
        updateStage2EndAngle();
        updateStage3EndAngle();
    }

    const handleNextButtonClick = () => {
        nextQuestion();
        updateStage2EndAngle();
        updateStage3EndAngle();
        if(user.getEncouragement(activeQuestion+1)){
            setShowEncouragement(true);
        }
        else{
            setShowEncouragement(false);
        }
    }

    // Angles for Stage 2 Progress Circle
    const [stage2EndAngle, setstage2EndAngle] = useState(0);
    const updateStage2EndAngle = () => {
        // 12 questions, so 30deg per question
        if(activeQuestion >= 18){
            setstage2EndAngle( (activeQuestion - 17)*30);
        }
    };

    // Angles for Stage 3 Progress Circle
    const [stage3EndAngle, setstage3EndAngle] = useState(0);
    const updateStage3EndAngle = () => {
        // 12 questions, so 30deg per question
        if(activeQuestion >= 30){
            setstage3EndAngle( (activeQuestion - 29)*30);
        }
    };

    return (
        <body>
            <div className='container'>
                <div className='top-bar-container'>
                    <img src={icon} alt='icon' className='icon' />
                    <homebutton onClick={handleHomeButtonClick}>X</homebutton>
                </div>
            <div>
                {!showResult ? (
                <div className='quiz-container'>
                    { showEncouragement ? (
                        <div className='encouragement-container'>
                            <div id='burst-8'>
                            </div>
                            <div className='encouragement-message'>
                                {user.getEncouragement(activeQuestion)}
                            </div>
                        </div>
                        ) : null
                    }
                    <h3>{questions[activeQuestion].question}</h3>
                    {answers.map((answer, idx) => (
                        <li
                            key={idx}
                            onClick={() => onAnswerSelected(activeQuestion, idx)}
                            className={
                            selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                            }
                        >
                            <span>{answer}</span>
                        </li>
                    ))}
                    <div className='circle-container'>
                        {/* Stage 1 */}
                        <div className='circle-label-container'>
                            <div className='filling-circle'>
                                <div 
                                    className='completed-circle'
                                    style={{ '--end-angle': `${(activeQuestion)*20}deg` }}
                                />    
                            </div>
                            <div className='stage-label'>Etapa 1</div>
                        </div>
                        {/* Stage 2 */}
                        <div className='circle-label-container'>
                            <div className='filling-circle'>
                                <div 
                                    className='completed-circle'
                                    style={{ '--end-angle': `${stage2EndAngle}deg` }}
                                />
                            </div>
                            <div className='stage-label'>Etapa 2</div>
                        </div>
                        {/* Stage 3 */}
                        <div className='circle-label-container'>
                            <div className='filling-circle'>
                                <div 
                                    className='completed-circle'
                                    style={{ '--end-angle': `${stage3EndAngle}deg` }}
                                />
                            </div>
                            <div className='stage-label'>Etapa 3</div>
                        </div>
                    </div>
                    {(selectedAnswerIndex > -1) ? (
                    <navbar>
                        <button 
                        onClick={handlePreviousButtonClick}
                        disabled={activeQuestion === 0}
                        className={activeQuestion === 0 ? 'btn-disabled' : ''}
                        >Anterior</button> 
                        <button onClick={handleNextButtonClick} className='button'>
                        {activeQuestion === question.length - 1 ? 'Termina' : 'Siguiente'}
                        </button>
                        
                    </navbar>
                    ) : (
                    <navbar>
                        <button 
                        onClick={handlePreviousButtonClick}
                        disabled={activeQuestion === 0}
                        className={activeQuestion === 0 ? 'btn-disabled' : ''}
                        >Anterior</button>  
                        <button onClick={handleNextButtonClick} disabled className='btn-disabled'>
                        {' '}
                        {activeQuestion === question.length - 1 ? 'Termina' : 'Siguiente'}
                        </button>
                    </navbar>
                    )}
                </div>
                ) : (
                <div className='quiz-container'>
                    <h3>Resultados</h3>
                    <p>
                    ¡Buen Trabajo!
                    </p>
                    <p>
                        Usted acaba de terminar el cuestionario. Por favor, haga clic en el botón de abajo para ver sus resultados.
                    </p>
                    <navbar>
                        <div className='container'>
                            <button onClick={handleResultsButtonClick}>Portada</button>
                        </div>
                    </navbar>
                </div>
                )}
            </div>
            </div>
        </body>
    );
}

export default Quiz;