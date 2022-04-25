import React from "react"

export default function Question(props) {

    /*
    * This class should only manage ONE QUESTION
    * and no previous states etc.
    * */

    const [currentQuestionOld, setCurrentQuestionOld] = React.useState({
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
        setCurrentQuestionOld(prevData => {
            return {
                ...prevData,
                selectedAnswer: value,
                correctAnswer: getCorrectAnswer(),
                disabled: true
            }
        })
    }

    //console.log(currentQuestion)
    console.log("Total questions in Question: "+props.totalQuestions)

    function changeColor(answer) {
        let color = "rgba(197,194,194,0.85)"
        let weight = "normal"
        let fontColor = "black"

        const red = "linear-gradient(60deg, #ef3e53 1%, rgb(246, 78, 78) 100%)"
        const green = "linear-gradient(60deg, #74c215 1%, rgb(183, 225, 98) 100%)"
        if (currentQuestionOld.selectedAnswer !== "") {
            if (currentQuestionOld.selectedAnswer === answer.label) {
                color = answer.value === true ? green : red
            } else if (answer.value === true) {
                color = "#83ce11"
            }
        }
        return {
            background: color,
            fontWeight: weight,
            color: fontColor
        }
    }

    return (
        <div className="mcq">
            <div className="mcq--question">
                <h2>{props.item.question}</h2>
                <span>Frage {props.questionNumber} von {props.totalQuestions}</span>
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
                            checked={currentQuestionOld.selectedAnswer === answer.label}
                            disabled={currentQuestionOld.disabled}
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