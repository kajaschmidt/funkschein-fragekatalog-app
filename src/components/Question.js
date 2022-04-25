import React from "react"

export default function Question(props) {

    /*
    * This class should only manage ONE QUESTION
    * and no previous states etc.
    * */

    const [currentQuestion, setCurrentQuestion] = React.useState({
            // Information about current Question
            questionId: props.item.id,
            selectedAnswer: "",
            correctAnswer: "",
            disabled: false,

            // Information about previous question
            prevQuestionId: "",
            prevSelectedAnswer: "",

            // Information about next question
            nextQuestionId: "",
            nextSelectedAnswer: "",

            // General stats
            countQuestion: 1,
            totalQuestions: 82,
        }
    )

    // Identify the correct answer of a question
    function getCorrectAnswer() {
        for (let i = 0; i < 4; i++) {
            if (props.item.answers[i].value === true) {
                return props.item.answers[i].label
            }
        }
    }

    function handleSelection(event) {
        const {value} = event.target
        setCurrentQuestion(prevData => {
            return {
                ...prevData,
                selectedAnswer: value,
                correctAnswer: getCorrectAnswer(),
                disabled: true
            }
        })
    }

    console.log(currentQuestion)

    function changeColor(answer) {
        let color = "rgba(197,194,194,0.85)"
        let weight = "normal"
        let fontColor = "black"
        if (currentQuestion.selectedAnswer !== "") {
            //fontColor = "#6c6a6a"
            if (currentQuestion.selectedAnswer === answer.label) {
                weight = "bold"
                if (answer.value === true) {
                    color = "#c9ec94"
                } else {
                    color = "#ec9494"
                }
            } else {
                if (answer.value === true) {
                    color = "#c9ec94"
            }
        }}
        return {
            backgroundColor: color,
            fontWeight: weight,
            color: fontColor
        }
    }

    console.log(currentQuestion)

    return (
        <div className="mcq">
            <div className="mcq--question">
                <h2>{props.item.question}</h2>
                <span>Frage {currentQuestion.countQuestion} von {currentQuestion.totalQuestions}</span>
            </div>
            <div className="mcq--answers">
                {props.item.answers.map((answer, index) => (
                <div className="radio" key={index} style={changeColor(answer)}>
                    <label key={index} htmlFor={index}>
                        <input
                            type="radio"
                            id={index}
                            key={answer.label}
                            value={answer.label}
                            checked={currentQuestion.selectedAnswer === answer.label}
                            disabled={currentQuestion.disabled}
                            onChange={handleSelection}
                        />
                        {answer.label}
                    </label>
                </div>
                ))}
            </div>
        </div>
    )

}