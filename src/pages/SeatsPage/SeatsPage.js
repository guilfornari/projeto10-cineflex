import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SeatsPage({ reserveSeat, reserveSeatId, reserveSeatName, setReserveSeatId, setReserveSeatName }) {

    const { idSessao } = useParams();
    const [seats, setSeats] = useState(undefined);
    const [clientName, setClientName] = useState("");
    const [clientCPF, setClientCPF] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const urlSeats = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
        const promise = axios.get(urlSeats);

        promise.then((response) => {
            setSeats(response.data);
        });
        promise.catch((error) => console.log(error.data));
    }, []);

    function submitForm(event) {

        event.preventDefault();
        reserveSeat(clientName, clientCPF, seats);
        navigate("/sucesso");
    }

    if (seats === undefined) {
        return (
            <>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
            </>);
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.seats.map((seat) => <Seat
                    key={seat.id}
                    seat={seat}
                    reserveSeatId={reserveSeatId}
                    reserveSeatName={reserveSeatName}
                    setReserveSeatId={setReserveSeatId}
                    setReserveSeatName={setReserveSeatName} />)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status={"selected"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={"available"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={"unavailable"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={submitForm}>
                Nome do Comprador:
                <input
                    data-test="client-name"
                    required
                    placeholder="Digite seu nome..."
                    value={clientName}
                    onChange={e => setClientName(e.target.value)} />

                CPF do Comprador:
                <input
                    data-test="client-cpf"
                    type="number"
                    required
                    placeholder="Digite seu CPF..."
                    value={clientCPF}
                    onChange={e => setClientCPF(e.target.value)} />

                <button
                    data-test="book-seat-btn"
                    type="submit" >
                    Reservar Assento(s)
                </button>

            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={seats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
}

function Seat({ seat, reserveSeatId, reserveSeatName, setReserveSeatId, setReserveSeatName }) {

    const statusBd = ["#808F9D", "#F7C52B", "#0E7D71"];
    const statusBg = ["#C3CFD9", "#FBE192", "#1AAE9E"];

    const [seatStatus, setSeatStatus] = useState(seat.isAvailable);


    function select(id, name) {
        if (seatStatus === false) {
            return alert("Esse assento não está disponível");
        }
        if (seatStatus === "selected") {
            setSeatStatus(true);
            removeSeat(id, reserveSeatId, setReserveSeatId);
            removeSeat(name, reserveSeatName, setReserveSeatName);
        } else {
            setSeatStatus("selected");
            addSeat(id, reserveSeatId, setReserveSeatId);
            addSeat(name, reserveSeatName, setReserveSeatName);
        }
    }

    function addSeat(reserve, seatList, func) {
        seatList.push(reserve);
        console.log(seatList);
        func([...seatList]);
    }

    function removeSeat(reserve, seatList, func) {
        const changeReserveSeat = seatList.filter(seat => seat !== reserve);
        func([...changeReserveSeat]);
    }


    return (
        <SeatItem
            onClick={() => select(seat.id, seat.name)}
            seatStatus={seatStatus}
            statusBd={statusBd}
            statusBg={statusBg}
            data-test="seat">
            {seat.name}
        </SeatItem>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
        cursor: pointer;
    }
    input {
        width: calc(100vw - 60px);
    }
    a {
        text-decoration: none;
    }
`;
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;
const CaptionCircle = styled.div`

    border: 1px solid ${props => {
        switch (props.status) {
            case "selected":
                return "#0E7D71"
            case "unavailable":
                return "#F7C52B"
            default:
                return "#808F9D"
        }
    }
    };
    background-color: ${props => {
        switch (props.status) {
            case "selected":
                return "#1AAE9E"
            case "unavailable":
                return "#FBE192"
            default:
                return "#C3CFD9"
        }
    }
    };
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;
const SeatItem = styled.div`
    border: 1px solid ${props => {
        switch (props.seatStatus) {
            case false:
                return props.statusBd[1];
            case "selected":
                return props.statusBd[2];
            default:
                return props.statusBd[0];
        }
    }
    };
    background-color: ${props => {
        switch (props.seatStatus) {
            case false:
                return props.statusBg[1];
            case "selected":
                return props.statusBg[2];
            default:
                return props.statusBg[0];
        }
    }
    };
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: pointer;
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;