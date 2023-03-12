import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SuccessPage({ reserveSeatName, reservation, reservedMovie }) {

    const navigate = useNavigate();

    function restartReservation() {
        navigate("/");
        window.location.reload();
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong>Filme e sessão</strong>
                <p>{reservedMovie.title}</p>
                <p>{reservedMovie.date} - {reservedMovie.time}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong>Ingressos</strong>
                {reserveSeatName.map(seat => <p key={seat}>Assento {seat}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong>Comprador</strong>
                <p>Nome: {reservation.name}</p>
                <p>CPF: {reservation.cpf}</p>
            </TextContainer>

            <button data-test="go-home-btn" onClick={restartReservation}>Voltar para Home</button>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;

    button {
        margin-top: 50px;
        cursor: pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 10px;
    }
    p {
        font-weight: 400;
        font-size: 22px;
    }
`