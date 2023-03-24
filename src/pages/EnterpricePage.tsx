import {CurrentEnterprise} from "../components/CurrentEnterprise";
import {Link, useLocation} from 'react-router-dom'
import React from "react";


export function EnterpricePage() {
    const {state} = useLocation();
    return (
        <>
           <div className={"wrapper"}>
               <Link to="/" className="back">Go back</Link>
               {state ? <CurrentEnterprise enterprice={state}/> : <div>Не выбрана конкретаная компания</div>}
           </div>
        </>
    )
}