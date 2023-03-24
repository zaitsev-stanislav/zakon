import {useEffect, useState} from "react";
import {IEnterprises} from "../models";
import axios from "axios";
import {Enterprises} from "../components/Enterprises";

export function MainPage() {
    const [enterprises, setEnterprises] = useState<IEnterprises[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // получу все данные с БД и отображу карточки
    async function fetchEnterprises() {
        const responce = await axios.get<IEnterprises[]>("http://localhost:3004/enterprises");
        setEnterprises(responce.data)
    }

    useEffect(() => {
        fetchEnterprises()
    }, []);

    // Обработчик событий для инпута
    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    // фильтрую карточки на основе введенного значения
    const filteredEnterprises = enterprises.filter((enterprise) =>
        enterprise.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="search">
                <input onChange={handleSearch} value={searchTerm} className="form__input" type="text" name="search" placeholder="Найти по названию"/>
            </div>
            <div className="wrapper">
                <div className={"enterprises"}>
                    {filteredEnterprises.map(enterprise => <Enterprises enterprises={enterprise} key={enterprise.id}/>)}
                </div>
            </div>
        </>
    );
}