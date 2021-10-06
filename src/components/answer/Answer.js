import React from 'react';

const Answer = (props) => {
    let answers = Object.keys(props.answer)
        .map((q, i) => (
            <li
            onClick={() => props.checkAnswer(q)}
            key={q}>
                {props.answer[q]}
            </li>
        ));

        return (
            <>
                <ul >
                    {answers}
                </ul>
            </>
        );
}

export default Answer;