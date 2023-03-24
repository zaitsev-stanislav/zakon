import React from "react";
import {IEnterprises} from "../models";
import {Link} from "react-router-dom";

interface EnterprisesProps {
    enterprises: IEnterprises
}


export function Enterprises({enterprises}: EnterprisesProps) {

    return (
        <Link to={"/current-enterprise"} state={enterprises} className={"enterprises__element"}>
            <p className={"enterprises__name"}>{enterprises.companyName}</p>
            <p className={"enterprises__desc"}>{enterprises.desc}</p>
            <div className={"enterprises__info"}>
                <span>На рынке с: {enterprises.years} года</span>
                <span>Руководитель: {enterprises.leaderName}</span>
            </div>
        </Link>


    )
}