import React from "react"
import Question from "./Question"

export default function QuestionSection(props) {

    /*
    This class should select a question and forward
    all necessary information to the question section,
    as well as the prev / next question buttons
    * */

    const question = props.item[55]
    question.answers = question.answers.sort(() => Math.random() - 0.5)



    function handlePreviousQuestion(event) {
        /*setCurrentQuestion(prevData => {
            return {
                ...prevData,
                selectedAnswer: currentQuestion.prevSelectedAnswer,
                //correctAnswer: currentQuestion,
                disabled: true,
                nextQuestionId: currentQuestion.questionId,
                nextSelectedAnswer: currentQuestion.selectedAnswer
            }
        })*/
        console.log("prev question")
    }

    function handleNextQuestion(event) {
        /*setCurrentQuestion(prevData => {
            return {
                ...prevData,
                selectedAnswer: "",
                correctAnswer: "",
                disabled: false,
                prevQuestionId: currentQuestion.questionId
            }
        })*/
        console.log("next question")
    }

    return (
        <div>
            <Question
                key={question.id}
                item={question}
            />
            <div className="mcq--buttons">
                <button
                    onClick={handlePreviousQuestion}
                >
                    Vorherige Frage
                </button>
                <button
                    onClick={handleNextQuestion}
                >
                    Nächste Frage
                </button>
            </div>
        </div>
    )

}