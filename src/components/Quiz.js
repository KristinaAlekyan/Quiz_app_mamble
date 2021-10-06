import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './Quiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap';


class Quiz extends Component {
    
    state = {
        questions: {
            1: '1+1',
            2: '1*0',
            3: '1/1'
        },
        answers: {
            1: {
                1: '0',
                2: '1',
                3: '2'
            },
            2: {
                1: '0',
                2: '1',
                3: '2'
            },
            3: {
                1: '0',
                2: '1',
                3: '2'
            },
        },
        correctAnswers: {
            1: '3',
            2: '1',
            3: '2'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0, 
    }

    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }
   
   /* nextProgressStep = (progressStep) => {
        this.setState({
            progressStep: progressStep + 1,
        });
    }
    */


    render(){
        let { questions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        let progressStep = 100/(Object.keys(this.state.questions)).length;
        
        return(
            <div className="Content">
                {step <= Object.keys(questions).length ? 
                    (<>
                        <h1>Quiz Title-Example </h1>
                        <ProgressBar className = 'bar'now={progressStep}/>

                        <h2>Question {step}</h2>
                        <Question
                            question={questions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(questions).length}</p>
                        </div>
                    )
                }
            </div>
        );
    }
}
export default Quiz;