import React, {Component, useEffect} from 'react';

import Header from "./components/Header"
import QuestionSection from "./components/QuestionSection";
import License from "./components/License";

import data from "./data/data"



export default function App() {

    // Popup when you try to refresh the page
    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    // Define licenses for which there are questions
    const licenses = ["src", "lrc", "ubi"]

    // State of selected license
    const [checkedLicense, setCheckedLicense] = React.useState({
        src: "",
        lrc: "",
        ubi: "",
        disabled: false,
    })

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
    }

    // Handle reset of license selection
    function handleReset(event) {
        if (window.confirm("Fragenauswahl resetten?")) {
            setCheckedLicense(prevData => {
                return {
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
                <div className="licenses">
                    <h4>Bitte wähle aus, für welchen Funkschein du lernen möchtest:</h4>
                    <div className="licenses--selection">
                        {licenses.map((licenseName) => (
                            <License
                                status={checkedLicense}
                                license={licenseName}
                                handleChange={handleChangeLicense}
                            />
                        ))}
                    </div>
                    {checkedLicense.disabled === false && (
                        <button
                            className="licenses--button"
                            onClick={handleSelectLicense}
                            disabled={checkedLicense.disabled}
                        >
                            Auswählen
                        </button>
                    )}
                    {checkedLicense.disabled && (
                        <button
                            className="licenses--button"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    )}
                </div>
                <br />

                <QuestionSection
                    key={data.id}
                    item={data.questions}
                />
            </main>
        </div>
    )
}

