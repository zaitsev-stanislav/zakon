import React, {useState} from "react";
import {IEnterprises, IEnterprisesProducts} from "../models";
import axios from "axios";

interface AddTovarsProps {
    state: boolean
    id: number
}

export function AddTovars(props: AddTovarsProps) {
    const [formValues, setFormValues] = useState<IEnterprisesProducts>({
        name: '',
        desc: '',
        price: 0,
        img: './images/none.jpg'
    });


    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (value.trim() !== ""){
            e.target.classList.remove("form__input_error");
            setFormValues(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }else {
            e.target.classList.add("form__input_error");
        }
    }


    // функция для добавления данных
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // получаю по Id данные определенной компании
        const getData = await axios.get<IEnterprises>(`http://localhost:3004/enterprises/${props.id}`);
        // делаю переменную, куда закидываю прошлые данные и добавляю новые
        const products = {products:[...getData.data.products, {...formValues}]};
        // обновляю инфу в БД о компании,
        const responce = await axios.patch<IEnterprises>(`http://localhost:3004/enterprises/${props.id}`, products);
        console.log(responce);
        if (responce.statusText === "OK"){
            alert("Данные успешно добавлены")
        }

    }


    const visible = props.state ? "form block" : "form block disabled";
    return (
        <>
            <form onSubmit={handleSubmit} className={visible}>
                <h2 className="form__title">Добавить товар в каталог</h2>

                <i className="form__above">Введите название товара</i>
                <input onChange={handleInputChange} className="form__input" type="text" placeholder="Название товара" name="name"/>

                <i className="form__above">Введите описание товара</i>
                <input onChange={handleInputChange} className="form__input" type="text" placeholder="Описание" name="desc"/>

                <i className="form__above">Напишите цену товара</i>
                <input onChange={handleInputChange} className="form__input" type="number" placeholder="2000" name="price"/>

                <i className="form__above">Ссылка на вашу фотографию</i>
                <input onChange={handleInputChange} className="form__input" type="text" placeholder="https://images.pexels.com/photos/5433356/pexels-photo-5433356.jpeg" name="img"/>
                {props.state
                    ? <button type="submit" className="btn form__btn">Добавить товар</button>
                    : <button type="submit" disabled className="btn form__btn">Добавить товар</button>}
            </form>
        </>
    )
}