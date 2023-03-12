import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function App() {

    const [reserveSeatId, setReserveSeatId] = useState([]);
    const [reserveSeatName, setReserveSeatName] = useState([]);
    const [reservation, setReservation] = useState({ ids: "", name: "", cpf: "" });
    const [reservedMovie, setReservedMovie] = useState({ title: "", date: "", time: "" });

    function reserveSeat(clientName, clientCPF, seats) {

        setReservation({
            ids: reserveSeatId,
            name: clientName,
            cpf: clientCPF
        });

        setReservedMovie({
            title: seats.movie.title,
            date: seats.day.date,
            time: seats.name
        });

        const reservationToSend = {
            ids: reserveSeatId,
            name: clientName,
            cpf: clientCPF
        };

        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const promise = axios.post(url, reservationToSend);

        promise.then(response => console.log(response));
        promise.catch(error => alert(error.response.data));

    }

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/sessoes/:idFilme"} element={<SessionsPage />} />
                <Route path={"/assentos/:idSessao"} element={<SeatsPage
                    reserveSeat={reserveSeat}
                    reserveSeatId={reserveSeatId}
                    setReserveSeatId={setReserveSeatId}
                    reserveSeatName={reserveSeatName}
                    setReserveSeatName={setReserveSeatName} />} />
                <Route path={"/sucesso"} element={<SuccessPage
                    reserveSeatName={reserveSeatName}
                    reservation={reservation}
                    reservedMovie={reservedMovie} />} />
            </Routes>
        </BrowserRouter>
    );
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`;
