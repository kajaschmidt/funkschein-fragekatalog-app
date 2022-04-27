import React, {Component, useEffect} from 'react';

import Header from "./components/Header"
import License from "./components/License";
import Main from "./components/Main";

import data from "./data/data"

export default function App() {

    // Popup when you try to refresh the page
    /*useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);*/ // TODO: untoggle

    console.log("Run App")

    /* ---------------------- S T A T E S ---------------------- */

    // State of selected license
    const [checkedLicense, setCheckedLicense] = React.useState({
        src: false,
        lrc: false,
        ubi: false,
        disabled: false,
    })

    const [stats, setStats] = React.useState({
        questionNumber: "",
        successfulQuestions: [],
        failedQuestions: [],
        handleEvaluation: false
    })

    /* ---------------------- V A R I A B L E S ---------------------- */

    // Define licenses for which there are questions
    const licenses = ["src", "lrc", "ubi"]


    /* ---------------------- F U N C T I O N S ---------------------- */

    // State of all relevant questions
    const [allData, setAllData] = React.useState({
        questions: "",
        answeredQuestions: []
    })


    // Get list of questions for the licenses that have been selected
    // And re-shuffle them
    function getQuestions() {
        let relevantQuestions = []
        licenses.forEach((licenseName) => {
            if (checkedLicense[licenseName]) {
                let questions = data.questions.filter((q) => {
                    return q.license == licenseName.toUpperCase()
                })
                relevantQuestions = relevantQuestions.concat(questions)
            }
        })
        relevantQuestions = relevantQuestions.sort(() => Math.random() - 0.5)

        // Shuffle answers
        relevantQuestions.forEach((q) => {
            q.answers = q.answers.sort(() => Math.random() - 0.5)
            q.nCorrect = 0
            q.nFalse = 0
        })

        return relevantQuestions
    }

    function evaluateSelectedAnswer(answeredCorrectly, currentQuestionId) {
        if (answeredCorrectly === true) {
            console.log("> Correct answer")
            setStats(prevStats => {
                return {
                    ...prevStats,
                    successfulQuestions: prevStats.successfulQuestions.concat(currentQuestionId),
                    handleEvaluation: false,
                }
            })

            setAllData(prevData => {
                const updatedQuestions = prevData.questions
                updatedQuestions.forEach((q) => {
                    if (q.id === currentQuestionId) {
                        q.nCorrect = q.nCorrect + 1
                    }
                })

                return {
                    ...prevData,
                    questions: updatedQuestions
                }
            })

        } else {
            console.log("> Wrong answer")
            setStats(prevStats => {
                return {
                    ...prevStats,
                    failedQuestions: prevStats.failedQuestions.concat(currentQuestionId),
                    handleEvaluation: false,
                }
            })

            setAllData(prevData => {
                const updatedQuestions = prevData.questions
                updatedQuestions.forEach((q) => {
                    if (q.id === currentQuestionId) {
                        q.nFalse = q.nFalse + 1
                    }
                })

                return {
                    ...prevData,
                    questions: updatedQuestions
                }
            })
        }
    }

    function setHandleEvaluation(state) {
        setStats(prevStats => {
            return {
                ...prevStats,
                handleEvaluation: state
            }
        })
    }

    // TODO: Test: Successful + Fail = props.stats.successfulQuestions.length

    function changeQuestionNumber(add) {
        if (add === true) {
            setStats(prevStats => {
                return {
                    ...prevStats,
                    questionNumber: prevStats.questionNumber + 1
                }
            })
        } else {
            setStats(prevStats => {
                return {
                    ...prevStats,
                    questionNumber: prevStats.questionNumber - 1
                }
            })
        }
    }


    /* ---------------------- H A N D L E S ---------------------- */

    // Handle selection of a license
    function handleChangeLicense(event) {
        const {name} = event.target
        setCheckedLicense(prevData => {
            return {
                ...prevData,
                [name]: !prevData[name]
            }
        })

        setStats(prevStats => {
            return {
                ...prevStats,
                questionNumber: 0
            }
        })
    }

    // Finalize the selection of the licenses
    // TODO: Impact on questions that have to be studied
    function handleSelectLicense(event) {
        // Ensure that license selection is disabled
        setCheckedLicense(prevData => {
            return {
                ...prevData,
                disabled: true
            }
        })

        // Update list of relevant questions
        const questionsList = getQuestions()
        setAllData(prevData => {
            return {
                ...prevData,
                questions: questionsList,
            }
        })
    }


    // Handle reset of license selection
    function handleReset(event) {
        if (window.confirm("Fragenauswahl resetten?")) {
            setCheckedLicense(prevData => {
                return {
                    ...prevData,
                    src: "",
                    lrc: "",
                    ubi: "",
                    disabled: false,
                }
            })
        }
        // Set questionNumber to 0 (triggers useEffect() in Main.js)
        setStats(prevStats => {
            return {
                ...prevStats,
                questionNumber: "",
                successfulQuestions: [],
                failedQuestions: [],
                handleEvaluation: false
            }
        })
    }

    console.log(allData)
    console.log("Stats")
    console.log(stats)

    return (
        <div>
            <Header />
            <main>
                <License
                    status={checkedLicense}
                    licenses={licenses}
                    handleChangeLicense={handleChangeLicense}
                    handleSelectLicense={handleSelectLicense}
                    handleReset={handleReset}
                />
                <br />
                {checkedLicense.disabled && (
                    <div>
                        <Main
                            key="1"
                            data={allData}
                            stats={stats}
                            evaluateSelectedAnswer={evaluateSelectedAnswer}
                            setHandleEvaluation={setHandleEvaluation}
                            changeQuestionNumber={changeQuestionNumber}
                        />
                    </div>)}
                <br />
            </main>
        </div>
    )
}


