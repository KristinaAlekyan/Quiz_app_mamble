import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './Quiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap';
import Data from '../Quiz.json';


class Quiz extends Component {
    constructor(prop){
        super(prop)
        this.state = {
            data: JSON.parse(JSON.stringify(Data)), 
            correctAnswer: 0,
            clickedAnswer: 0,
            step: 1,
            score: 0, 
        }
    }

    checkAnswer = answer => {  
        const {correctAnswers} = this.state.data; 
        const { step, score } = this.state;
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
   
    render(){
        const { questions, answers} = this.state.data;
        const { correctAnswer, clickedAnswer, step, score } = this.state;
        
        return(
            <div className="Content">
                {step <= Object.keys(questions).length ? 
                    (<>
                        <h1>Quiz Title-Example </h1>  
                        <ProgressBar className = 'bar' now={0}/>

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