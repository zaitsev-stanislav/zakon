import React, {useState} from "react";
import {IEnterprises} from "../models";
import axios from "axios";

interface AddEnterpriseProps {
    state: boolean,
    setState: () => void,
    setId : (e:number) => void
}


export function AddEnterprise(props: AddEnterpriseProps) {
    const visible = !props.state ? "form block" : "form block disabled";

    const [formValues, setFormValues] = useState<IEnterprises>({
        companyName: '',
        desc: '',
        leaderName: '',
        years: 0,
        products: []
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

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const responce = await axios.post<IEnterprises>("http://localhost:3004/enterprises", formValues);

        // Проверяю точно ли id число
        if (responce.data.id !== undefined){
            props.setId(responce.data.id) // получаю id новой записи, чтобы потом мог в нее доабвить товары
        }
        props.setState(); // активирую следюущиую форму товара
        if (responce.status < 299){
            alert("Данные успешно добавлены. Теперь вы можете добавить ваши товары")
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className={visible}>
                <h2 className="form__title">Добавить компанию в список</h2>
                <i className="form__above">Введите название компании</i>
                <input required onChange={handleInputChange} className="form__input" type="text" placeholder="ТОО Лучший Сайт" name="companyName"/>
                <i className="form__above">Введите описание компании</i>
                <input required onChange={handleInputChange} className="form__input" type="text" placeholder="Описание" name="desc"/>
                <i className="form__above">Введите имя руководителя компании</i>
                <input required onChange={handleInputChange} className="form__input" type="text" placeholder="Владимир Владимирович Путин"
                       name="leaderName"/>
                <i className="form__above">С какого года вы начали работу?</i>
                <input required onChange={handleInputChange} className="form__input" type="number" placeholder="2000" name="years"/>
                <i className="form__above">Продукцию вы сможете указать на следующем этапе</i>
                {!props.state
                    ? <button className="btn form__btn">Отправить</button>
                    : <button disabled className="btn form__btn">Отправить</button>}
            </form>
        </>
    )
}