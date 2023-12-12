import styles from '../index.css';
import React, { useState } from 'react';
import { quiz } from './data.js';
import icon from './icon.png';
import stronglyAgree from './StronglyAgree.png';
import agree from './Agree.png';
import neutral from './Neutral.png';
import disagree from './Disagree.png';
import stronglyDisagree from './Strongly Disagree.png';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  //   Select and check answer
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log('true');
    } else {
      setSelectedAnswer(false);
      console.log('false');
    }
  };

  // Calculate score and increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  const previousQuestion = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
    setChecked(false);
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
                <h3>{questions[activeQuestion].question}</h3>
                <div className='answer-container'>
                    <div className='emotive-image-container'>
                            <img src={stronglyAgree} alt='Strongly Agree' className='emotive-image' />
                            <img src={agree} alt='Agree' className='emotive-image' />
                            <img src={neutral} alt='Neutral' className='emotive-image' />
                            <img src={disagree} alt='Disagree' className='emotive-image' />
                            <img src={stronglyDisagree} alt='Strongly Disagree' className='emotive-image' />
                    </div>
                    <div className='li-container'>
                        {answers.map((answer, idx) => (
                        <li
                            key={idx}
                            onClick={() => onAnswerSelected(answer, idx)}
                            className={
                            selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                            }
                        >
                            <span>{answer}</span>
                        </li>
                        ))}
                    </div>
                </div>
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
                {checked ? (
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