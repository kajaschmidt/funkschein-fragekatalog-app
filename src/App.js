import React, { Component } from 'react';

import Header from "./components/Header"
import QuestionSection from "./components/QuestionSection";

import data from "./data/data"



export default function App() {

    const Checkbox = props => (
        <input type="checkbox" {...props} />
    )

    const [checkedLicense, setCheckedLicense] = React.useState({
        src: "",
        lrc: "",
        ubi: "",
        disabled: "",
    })

    function handleChangeLicense(event) {
        const {name} = event.target
        setCheckedLicense(prevData => {
            return {
                ...prevData,
                [name]: !prevData[name]
            }
        })
    }

    function selectLicense(event) {
        setCheckedLicense(prevData => {
            return {
                ...prevData,
                disabled: true
            }
        })
    }

    return (
        <div>
            <Header />
            <main>
                <div className="licenses">
                    <h4>Bitte wähle aus, für welchen Funkschein du lernen möchtest:</h4>
                    <div className="licenses--selection">
                        <label>
                            <Checkbox
                                id="src"
                                name="src"
                                disabled={checkedLicense.disabled}
                                checked={checkedLicense.src === true}
                                onChange={handleChangeLicense}
                            />
                            <span>SRC</span>
                        </label>
                        <label>
                            <Checkbox
                                id="lrc"
                                name="lrc"
                                disabled={checkedLicense.disabled}
                                checked={checkedLicense.lrc === true}
                                onChange={handleChangeLicense}
                            />
                            <span>LRC</span>
                        </label>
                        <label>
                            <Checkbox
                                id="ubi"
                                name="ubi"
                                disabled={checkedLicense.disabled}
                                checked={checkedLicense.ubi === true}
                                onChange={handleChangeLicense}
                            />
                            <span>UBI</span>
                        </label>
                    </div>
                    <button
                        onClick={selectLicense}
                        disabled={checkedLicense.disabled}
                    >
                        Auswahl getroffen
                    </button>
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

