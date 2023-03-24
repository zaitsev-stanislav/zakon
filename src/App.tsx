import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {EnterpricePage} from "./pages/EnterpricePage";
import {Navigation} from "./components/Navigation";
import {AddEnterprisePage} from "./pages/AddEnterpisePage";


function App() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/current-enterprise" element={<EnterpricePage/>}/>
                <Route path="/add-enterprise" element={<AddEnterprisePage/>}/>
            </Routes>
        </>
    )
}

export default App;
