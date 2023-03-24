import React, {useState} from "react";
import {AddEnterprise} from "../components/AddEnterprise";
import {AddTovars} from "../components/AddTovars";

export function AddEnterprisePage() {
    // для отображения второй формы (которая отвечает за наполнение товаров)
    const [step, setStep] = useState(false);
    const [id, setId] = useState(0);


    function changeForm() {
        setStep(prevState => !prevState);
    }

    function changeId(id: number) {
        setId(id);
    }

    return (
        <>
            <div className="wrapper">
                <div className="wrapper block">
                    <h1>Страница добавления компании</h1>
                    <div className="add_enterprise">
                        <AddEnterprise state={step} setState = {changeForm} setId={changeId}/>
                        <AddTovars state={step} id={id}/>
                    </div>

                </div>
            </div>
        </>
    )
}