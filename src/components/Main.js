import React, {useEffect} from "react"
import Question from "./Question"

export default function Main(props) {

    /*
    This class should select a question and forward
    all necessary information to the question section,
    as well as the prev / next question buttons
    * */

    console.log("Run Main")

    // function pickQuestion() {
    let question = props.data.questions[props.stats.questionNumber] // TODO: randomize selection of question

    const [currentQuestion, setCurrentQuestion] = React.useState({
        id: question.id,
        question: question.question,
        answers: question.answers,
        correctAnswer: getCorrectAnswer(),
        selectedAnswer: "",
        previousId: "",
        disabled: false,
    })

    useEffect(() => {
        console.log("USE EFFECT")

        question = props.data.questions[props.stats.questionNumber]

        setCurrentQuestion(prevState => {
            return {
                ...prevState,
                id: question.id,
                question: question.question,
                answers: question.answers,
                correctAnswer: getCorrectAnswer(),
                disabled: false,
            }
        })

    }, [props.stats.questionNumber])


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
        props.changeQuestionNumber(false)
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
        //handlePreviousQuestion()
        // TODO: Option 1
        // TODO: update state of previous question
        // TODO: update state of current question with new question
        // TODO: update state of next question

        // TODO: Option 2
        // TODO: Remove id from "questions" and add id to "answeredQuestions"
        // TODO: and build a function that initiates currentQuestion based on the id

        props.changeQuestionNumber(true)
        console.log("next question")
    }

    // Identify the correct answer of a question
    // COPIED TO ADJUST
    function getCorrectAnswer() {
        for (let i = 0; i < 4; i++) {
            if (question.answers[i].value === true) {
                return question.answers[i].label
            }
        }
    }

    // COPIED TO ADJUST
    function handleSelection(event) {
        const {value} = event.target
        //const correctAnswerValue = getCorrectAnswer()
        console.log("HandleSelection")
        setCurrentQuestion(prevData => {
            return {
                ...prevData,
                selectedAnswer: value, // TODO: this does not seem to work properly!
                //correctAnswer: correctAnswerValue, // TODO: maybe set correctAnswer at initCurrentQuestion!
                disabled: true,
            }
        })
        props.setHandleEvaluation(true)
    }



    useEffect(() => {
        //if (currentQuestion.handleEvaluation === true) {
        if (props.stats.handleEvaluation === true) {
            const answeredCorrectly = currentQuestion.selectedAnswer === currentQuestion.correctAnswer
            props.evaluateSelectedAnswer(answeredCorrectly, currentQuestion.id)
        }
    }, [props.stats.handleEvaluation])

    return (
        <div>
            <Question
                key={currentQuestion.id}
                currentQuestion={currentQuestion}
                totalQuestions={props.data.questions.length}
                questionNumber={props.stats.questionNumber+1}
                handleSelection={handleSelection}
            />
            <div className="mcq--buttons">
                {(props.stats.questionNumber > 0) && (
                    <button onClick={handlePreviousQuestion} className="button-left">
                        Vorherige Frage
                    </button>)}
                {(props.stats.questionNumber + 1 < props.data.questions.length) && (
                    <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestion.disabled === false}
                        className="button-right">
                        Nächste Frage
                    </button>)}
            </div>
            <p>Successful: {props.stats.successfulQuestions.length}</p>
            <p>Fail: {props.stats.failedQuestions.length}</p>
        </div>
    )

}