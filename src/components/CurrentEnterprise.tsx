import React from "react";
import {IEnterprises} from "../models";
import {log} from "util";
import {ImageError} from "./ImageError";

interface CurrentEnterpriseProps {
    enterprice: IEnterprises
}


export function CurrentEnterprise({enterprice}: CurrentEnterpriseProps) {

    // Функция для проверки, есть ли изображение в БД или нет. Если его нет, то ставим заглушку none.jpg
    return (
        <>
            <div className="current block wrapper">
                <h1 className="current__title">{enterprice.companyName}</h1>
                <p className="current__desc">{enterprice.desc}</p>
                <p className="current__desc">Компания работает с {enterprice.years} года</p>
                <p className="current__desc">Руководитель: {enterprice.leaderName}</p>


                {/* Вывод всех продуктов из карточки*/}
                <div className="mb-4"/>
                <h2 className="current__title">Продукция компании</h2>
                <div className="current__products">
                    {enterprice.products.map((elem, i) => {
                        return (
                            <div className="current__elem" key={i}>
                                <div className="-img">
                                    <img onError={ImageError} className="current__elem_img" src={elem.img} alt={elem.name}/>
                                </div>
                                <div className="-text">
                                    <p className="current__elem_text">{elem.name}</p>
                                    <p className="current__elem_desc">{elem.desc}</p>
                                    <span className="current__elem_price">Цена: {elem.price} тг</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mb-4"/>
            </div>
        </>
    )

}