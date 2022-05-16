import React from "react";
import LicenseCheckbox from "./LicenseCheckbox";

export default function License(props) {

    return (
        <div className="licenses">
            <h4>Bitte wähle aus, für welchen Funkschein du lernen möchtest:</h4>
            <div className="licenses--selection">
                {props.licenses.map((licenseName) => (
                    <LicenseCheckbox
                        key={licenseName}
                        status={props.status}
                        license={licenseName}
                        handleChange={props.handleChangeLicense}
                    />
                ))}
            </div>
            {props.status.disabled === false && (
                <button
                    className="licenses--button"
                    onClick={props.handleSelectLicense}
                    disabled={props.status.disabled}
                >
                    Auswählen
                </button>
            )}
            {props.status.disabled && (
                <button
                    className="licenses--button"
                    onClick={props.handleReset}
                >
                    Reset
                </button>
            )}
            {(props.displayFalseQuestionsButton) && (
                <button
                    onClick={props.handleFalseQuestion}
                    className="button-false-questions">
                    Falsch beantwortete Fragen üben
                </button>)}
        </div>
    )
}