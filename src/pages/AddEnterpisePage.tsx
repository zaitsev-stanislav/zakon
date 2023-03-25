import React, {useState} from "react";
import {AddEnterprise} from "../components/AddEnterprise";
import {AddTovars} from "../components/AddTovars";
import axios from "axios";
import {IEnterprises, IEnterprisesProducts} from "../models";


interface IState {
    step: number
    id: number
    data: IEnterprises
}

export function AddEnterprisePage() {
    // для отображения второй формы (которая отвечает за наполнение товаров)

    const [state, setState] = useState<IState>({
        step: 0,
        id: 0,
        data: {
            companyName: '',
            desc: '',
            leaderName: '',
            years: 0,
            products: []
        }
    });


    async function handleSubmitAddEnterprise(data: IEnterprises) {
        try {
            const responce = await axios.post<IEnterprises>("http://localhost:3004/enterprises", data);

            // Проверяю точно ли id число
            if (responce.data.id !== undefined){
                // получаю id новой записи и меняю этап на следующий шаг
                setState(prevState => ({...prevState, id: responce.data.id as number, step: 1}))
            }

            if (responce.status < 299){
                alert("Данные успешно добавлены. Теперь вы можете добавить ваши товары")
            }
        }catch (e) {
            console.log(e);
            alert("Произошла ошибка: " + e)
        }
    }

    const handleSubmitAddTovars = async (data: IEnterprisesProducts) => {
        try {
            // получаю по Id данные определенной компании
            const getData = await axios.get<IEnterprises>(`http://localhost:3004/enterprises/${state.id}`);
            // делаю переменную, куда закидываю прошлые данные и добавляю новые
            const products = {products:[...getData.data.products, {...data}]};
            // обновляю инфу в БД о компании,
            const responce = await axios.patch<IEnterprises>(`http://localhost:3004/enterprises/${state.id}`, products);
            console.log(responce);
            if (responce.statusText === "OK"){
                alert("Данные успешно добавлены")
            }
        }catch (e) {
            console.log(e);
            alert("Произошла ошибка: " + e)
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="wrapper block">
                    <h1>Страница добавления компании</h1>
                    <div className="add_enterprise">
                        <AddEnterprise onSubmit={handleSubmitAddEnterprise} step={state.step}/>
                        <AddTovars onSubmit={handleSubmitAddTovars} step={state.step}/>
                    </div>

                </div>
            </div>
        </>
    )
}