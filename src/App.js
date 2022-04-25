import React, {Component, useEffect} from 'react';

import Header from "./components/Header"
import QuestionSection from "./components/QuestionSection";
import License from "./components/License";

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

    /* ---------------------- S T A T E S ---------------------- */

    // State of selected license
    const [checkedLicense, setCheckedLicense] = React.useState({
        src: false,
        lrc: false,
        ubi: false,
        disabled: false,
    })


    /* ---------------------- V A R I A B L E S ---------------------- */

    // Define licenses for which there are questions
    const licenses = ["src", "lrc", "ubi"]


    /* ---------------------- F U N C T I O N S ---------------------- */

    // State of all relevant questions
    const [allQuestions, setAllQuestions] = React.useState({
        questions: "",
    })

    // Get list of questions for the licenses that have been selected
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
        return relevantQuestions
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
    }

    // Finalize the selection of the licenses
    // TODO: Impact on questions that have to be studied
    function handleSelectLicense(event) {
        setCheckedLicense(prevData => {
            return {
                ...prevData,
                disabled: true
            }
        })

        const questionsList = getQuestions()
        setAllQuestions(prevData => {
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
    }

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
                <QuestionSection
                    key={data.id}
                    item={data.questions}
                    questions={allQuestions}
                    dontDisplay={checkedLicense.disabled}
                />
                <br />
            </main>
        </div>
    )
}

