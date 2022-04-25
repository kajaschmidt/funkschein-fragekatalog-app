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

    const [stats, setStats] = React.useState({
        questionNumber: 0,
        successfulQuestions: [],
        failedQuestions: [],
    })

    const [currentQuestion, setCurrentQuestion] = React.useState({
        id:  "",
        correctAnswer: "",
        selectedAnswer: "",
    })


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
        setStats(prevStats => {
            return {
                ...prevStats,
                questionNumber: prevStats.questionNumber-1,
            }
        })
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
        setStats(prevStats => {
            let successful = prevStats.successfulQuestions
            let failed = prevStats.failedQuestions
            if (currentQuestion.selectedAnswer === currentQuestion.correctAnswer) {
                successful.push(currentQuestion.id)
            } else {
                failed.push(currentQuestion.id)
            }
            return {
                ...prevStats,
                questionNumber: prevStats.questionNumber+1,
                successfulQuestions: successful,
                failedQuestions: failed,
            }
        })
        // TODO: NOW UPDATE CURRENT QUESTION INFO
        console.log("next question")
    }

    console.log("Total questions in QuestionSection: "+stats.totalQuestions)

    return (
        <div>
            {props.dontDisplay && (
                <div>
                    <Question
                        key={question.id}
                        item={question}
                        totalQuestions={props.questions.questions.length}
                        questionNumber={stats.questionNumber+1}
                    />
                    <div className="mcq--buttons">
                        {(stats.questionNumber > 0) && (<button
                            onClick={handlePreviousQuestion}
                        >
                            Vorherige Frage
                        </button>)}
                        {(stats.questionNumber + 1 < props.questions.questions.length) && (
                            <button onClick={handleNextQuestion}>
                                    Nächste Frage
                            </button>)}
                    </div>
                </div>)}
            <span>Successful: {stats.successfulQuestions.length}</span>
            <span>Fail: {stats.failedQuestions.length}</span>
        </div>
    )

}